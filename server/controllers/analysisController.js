import Analysis from "../models/Analysis.js";
import Resume from "../models/Resume.js";
import { analyzeResumeAI } from "../services/openaiService.js";

let isProcessing = false;

export const analyzeResume = async (req, res) => {
    try {
        if (isProcessing) {
            return res.status(429).json({
                success: false,
                message: "Please wait. Analysis already running.",
            });
        }

        isProcessing = true;

        const { resumeId, jobDescription } = req.body;

        if (!resumeId || !jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Resume ID and Job Description are required",
            });
        }

        // Check if analysis already exists for this resume
        const existingAnalysis = await Analysis.findOne({ resume: resumeId });
        if (existingAnalysis) {
            return res.status(200).json({
                success: true,
                analysis: existingAnalysis,
            });
        }

        // Find resume
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume Not Found",
            });
        }

        // Run AI analysis
        const aiResult = await analyzeResumeAI(resume.extractedText, jobDescription);

        // Save analysis
        const analysis = await Analysis.create({
            resume: resume._id,
            ...aiResult,
        });

        return res.status(200).json({
            success: true,
            analysis,
        });
    } catch (error) {
        console.error("ANALYSIS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Analysis Failed",
        });
    } finally {
        // Always release lock
        isProcessing = false;
    }
};
