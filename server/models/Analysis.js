import mongoose from "mongoose";

const analysisSchema =
    new mongoose.Schema({

        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume"
        },

        overallScore: Number,

        skillsScore: Number,

        experienceScore: Number,

        educationScore: Number,

        matchedSkills: [String],

        missingSkills: [String],

        executiveSummary: String,

        feedbackItems: Array

    }, {
        timestamps: true
    });

export default mongoose.model(
    "Analysis",
    analysisSchema
);