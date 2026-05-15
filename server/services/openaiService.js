import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

// Lock + queue system to prevent overload
let isProcessing = false;
let queue = [];

// Helper to process next request in queue
const processNext = async () => {
    if (queue.length === 0) {
        isProcessing = false;
        return;
    }

    const { resumeText, jobDescription, resolve, reject } = queue.shift();

    try {
        const result = await runAnalysis(resumeText, jobDescription);
        resolve(result);
    } catch (error) {
        reject(error);
    } finally {
        // Add a small delay to avoid hammering the API
        setTimeout(() => processNext(), 1000);
    }
};

// Core analysis function
const runAnalysis = async (resumeText, jobDescription) => {
    if (!resumeText || !jobDescription) {
        throw new Error("Resume or Job Description missing");
    }

    const prompt = `
You are a world-class ATS Resume Analyzer, Senior Technical Recruiter, Hiring Manager, and Career Coach.

Analyze the candidate resume against the provided job description.

IMPORTANT RULES:
- Return ONLY valid JSON
- No markdown
- No explanation outside JSON
- Do NOT generate fake information
- Do NOT hallucinate experience
- Do NOT invent technologies not present
- Only analyze based on provided resume and job description
- If data is unavailable, return realistic empty values
- Every field MUST exist in response
- Scores must be realistic
- Use recruiter-grade analysis
- Provide actionable improvement advice in:
  - "recommendedImprovements": resume changes needed
  - "careerRecommendations": long-term career advice
  - "resumeOptimizationTips": ATS/formatting improvements
  - "skillsToImproveHiringChance": missing skills to learn
  - "recommendedCertifications": certifications that increase selection chance

Resume:
${resumeText}

Job Description:
${jobDescription}

Return EXACT JSON structure:

{
  "overallScore": 0,
  "atsScore": 0,
  "skillsScore": 0,
  "experienceScore": 0,
  "projectScore": 0,
  "educationScore": 0,
  "communicationScore": 0,
  "interviewProbability": 0,
  "seniorityLevel": "",
  "industryFit": "",
  "roleMatch": "",
  "hiringRecommendation": "",
  "executiveSummary": "",
  "matchedSkills": [],
  "missingSkills": [],
  "matchedKeywords": [],
  "missingKeywords": [],
  "strengths": [],
  "weaknesses": [],
  "leadershipIndicators": [],
  "projectAnalysis": [],
  "achievementImpact": [],
  "hiringRisks": [],
  "recommendedImprovements": [],
  "careerRecommendations": [],
  "resumeOptimizationTips": [],
  "skillsToImproveHiringChance": [],
  "recommendedCertifications": [],
  "projectSuggestions": [],
  "feedbackItems": [
    {
      "type": "",
      "message": ""
    }
  ]
}
`;

    let attempts = 0;
    while (attempts < 2) {
        try {
            const response = await client.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                temperature: 0.2,
                max_tokens: 4000,
                response_format: { type: "json_object" },
                messages: [
                    {
                        role: "system",
                        content: "You are an ATS AI recruiter that ONLY returns valid JSON.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            });

            const content = response?.choices?.[0]?.message?.content;
            if (!content) throw new Error("Empty AI response");

            return JSON.parse(content);
        } catch (error) {
            attempts++;
            if (attempts >= 2) throw new Error(error.message || "AI analysis failed");
        }
    }
};

// Public function with queue handling
const analyzeResumeAI = (resumeText, jobDescription) => {
    return new Promise((resolve, reject) => {
        queue.push({ resumeText, jobDescription, resolve, reject });

        if (!isProcessing) {
            isProcessing = true;
            processNext();
        }
    });
};

export { analyzeResumeAI };
