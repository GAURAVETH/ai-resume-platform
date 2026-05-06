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

        const prompt = `
You are an ATS resume analyzer.

Analyze the resume against the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY valid JSON:

{
  "overallScore": 0,
  "skillsScore": 0,
  "experienceScore": 0,
  "educationScore": 0,
  "matchedSkills": [],
  "missingSkills": [],
  "executiveSummary": "",
  "feedbackItems": []
}
`;

        const response =
            await client.chat.completions.create({

                model:
                    "llama-3.3-70b-versatile",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.3
            });

        return response
            .choices[0]
            .message
            .content;
    };

export {
    analyzeResumeAI
};