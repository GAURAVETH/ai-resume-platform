import Analysis from "../models/Analysis.js";
import Resume from "../models/Resume.js";

import {
    analyzeResumeAI
} from "../services/openaiService.js";

let isProcessing = false;

export const analyzeResume =
    async (req, res) => {

        try {

            if (isProcessing) {

                return res.status(429).json({
                    message:
                        "Please wait. Analysis already running."
                });
            }

            isProcessing = true;

            const {
                resumeId,
                jobDescription
            } = req.body;

            const existingAnalysis =
                await Analysis.findOne({
                    resume: resumeId
                });

            // RETURN SAVED RESULT
            if (existingAnalysis) {

                isProcessing = false;

                return res.json(
                    existingAnalysis
                );
            }

            const resume =
                await Resume.findById(
                    resumeId
                );

            if (!resume) {

                isProcessing = false;

                return res.status(404).json({
                    message:
                        "Resume Not Found"
                });
            }

            // SINGLE AI REQUEST
            const aiResult =
                await analyzeResumeAI(
                    resume.extractedText,
                    jobDescription
                );

            const cleaned =
                aiResult
                    .replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();

            const parsed =
                JSON.parse(cleaned);

            const analysis =
                await Analysis.create({

                    resume: resume._id,

                    ...parsed
                });

            isProcessing = false;

            res.json(analysis);

        } catch (error) {

            isProcessing = false;

            console.log(error);

            res.status(500).json({
                message:
                    "Analysis Failed"
            });
        }
    };