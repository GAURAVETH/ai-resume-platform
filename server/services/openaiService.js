import OpenAI from "openai";

const client = new OpenAI({

    apiKey:
        process.env.GROQ_API_KEY,

    baseURL:
        "https://api.groq.com/openai/v1",
});

const analyzeResumeAI =
    async (
        resumeText,
        jobDescription
    ) => {

        try {

            const prompt = `

You are a world-class ATS Resume Analyzer, Senior Technical Recruiter, Hiring Manager, and Career Coach.

Your task is to deeply analyze the candidate resume against the provided job description.

You must behave like:
- ATS system
- recruiter
- engineering manager
- hiring committee
- career advisor

Analyze:

1. ATS compatibility
2. Technical skills match
3. Soft skills match
4. Experience relevance
5. Years of experience suitability
6. Project quality and complexity
7. Leadership and ownership
8. Communication and writing quality
9. Education relevance
10. Certifications relevance
11. Industry alignment
12. Missing critical technologies
13. Missing ATS keywords
14. Resume strengths
15. Resume weaknesses
16. Hiring risks
17. Achievement impact
18. Resume optimization quality
19. Interview probability
20. Final hiring recommendation

Additionally provide:
- skills candidate should improve
- certifications candidate should pursue
- projects candidate should build
- ATS optimization recommendations
- technologies missing from resume
- ways to improve hiring probability

Resume:
${resumeText}

Job Description:
${jobDescription}

IMPORTANT RULES:

- Return ONLY valid JSON.
- NEVER include markdown.
- NEVER include explanation outside JSON.
- NEVER leave important arrays empty.
- Be highly specific and recruiter-grade.
- Avoid generic feedback.
- Recommendations must be actionable.
- Scores must be realistic.
- Mention missing technologies if relevant.
- Mention quantified achievements if missing.
- Mention missing cloud/devops/tools if relevant.

Use this EXACT JSON structure:

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

            const response =
                await client.chat.completions.create({

                    model:
                        "llama-3.3-70b-versatile",

                    temperature: 0.2,

                    max_tokens: 4000,

                    response_format: {
                        type: "json_object"
                    },

                    messages: [

                        {
                            role: "system",

                            content:
                                "You are an expert ATS AI recruiter and career coach that ONLY returns valid JSON."
                        },

                        {
                            role: "user",

                            content: prompt
                        }
                    ]
                });

            const content =
                response
                    ?.choices?.[0]
                    ?.message?.content;

            if (!content) {

                throw new Error(
                    "Empty AI response"
                );
            }

            // VALIDATE JSON
            JSON.parse(content);

            return content;

        } catch (error) {

            console.log(
                "AI ANALYSIS ERROR:",
                error.message
            );

            throw new Error(
                "AI analysis failed"
            );
        }
    };

export {
    analyzeResumeAI
};