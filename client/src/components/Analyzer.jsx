import React, { useState } from "react";

import {
    FileText,
    Sparkles,
    Upload,
    Loader2,
    ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import API from "../api/api";

const Analyzer = () => {
    const [activeTab, setActiveTab] = useState("upload");

    const [resume, setResume] = useState(null);

    const [resumeText, setResumeText] = useState("");

    const [jobDescription, setJobDescription] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    // VALIDATE FILE
    const validateFile = (file) => {
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Only PDF and DOCX files are allowed.");
            return false;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError("File size must be below 2MB.");
            return false;
        }

        return true;
    };

    // HANDLE FILE
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (validateFile(file)) {
            setResume(file);
            setError("");
        }
    };

    // ANALYZE RESUME
    const handleAnalyze = async () => {
        try {
            setError("");

            // VALIDATIONS
            if (activeTab === "upload" && !resume) {
                setError("Please upload your resume.");
                return;
            }

            if (activeTab === "paste" && !resumeText.trim()) {
                setError("Please paste your resume text.");
                return;
            }

            if (!jobDescription.trim()) {
                setError("Please enter the job description.");
                return;
            }

            setLoading(true);

            let resumeId = "";

            // UPLOAD RESUME FILE
            if (activeTab === "upload") {
                const formData = new FormData();

                formData.append("resume", resume);

                const uploadResponse = await API.post(
                    "/resume/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                if (!uploadResponse.data?.resume?._id) {
                    throw new Error("Resume upload failed");
                }

                resumeId = uploadResponse.data.resume._id;
            }

            // ANALYZE REQUEST
            const analysisResponse = await API.post("/analysis", {
                resumeId,
                resumeText,
                jobDescription,
            });

            // SAVE RESULT
            localStorage.setItem(
                "analysisResult",
                JSON.stringify(analysisResponse.data)
            );

            // REDIRECT
            navigate("/results");
        } catch (err) {
            console.log(err);

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "AI analysis failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-[#05020a] text-white min-h-screen px-6 py-20 flex flex-col items-center justify-center">
            {/* HEADER */}
            <div className="text-center mb-14 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
                    <ShieldCheck className="w-4 h-4" />

                    AI-Powered ATS Resume Intelligence
                </div>

                <h1 className="text-5xl font-black mb-6 leading-tight">
                    Analyze Your Resume
                    <br />
                    Like a Real Recruiter
                </h1>

                <p className="text-gray-400 text-lg leading-relaxed">
                    Upload your resume and compare it against any job description using
                    advanced AI analysis, ATS scoring, recruiter insights, and hiring
                    recommendations.
                </p>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
                {/* RESUME PANEL */}
                <div className="bg-[#110c1d] rounded-3xl border border-white/5 p-8 shadow-2xl">
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <FileText className="text-purple-400 w-5 h-5" />

                            <h2 className="font-bold text-xl">Resume Input</h2>
                        </div>

                        {/* TABS */}
                        <div className="bg-black/40 rounded-xl p-1 flex gap-1">
                            <button
                                onClick={() => setActiveTab("upload")}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "upload"
                                        ? "bg-[#1f1633] text-white"
                                        : "text-gray-500"
                                    }`}
                            >
                                Upload
                            </button>

                            <button
                                onClick={() => setActiveTab("paste")}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "paste"
                                        ? "bg-[#1f1633] text-white"
                                        : "text-gray-500"
                                    }`}
                            >
                                Paste
                            </button>
                        </div>
                    </div>

                    {/* UPLOAD MODE */}
                    {activeTab === "upload" && (
                        <label className="border-2 border-dashed border-white/10 rounded-3xl h-72 flex flex-col items-center justify-center bg-black/20 hover:bg-black/30 transition-all cursor-pointer group">
                            <div className="p-5 rounded-full bg-purple-500/10 mb-5 group-hover:scale-110 transition-transform">
                                <Upload className="w-7 h-7 text-purple-400" />
                            </div>

                            <p className="text-xl font-bold mb-2">Upload Resume</p>

                            <p className="text-gray-500 text-sm">
                                PDF or DOCX • Max 2MB
                            </p>

                            {resume && (
                                <div className="mt-6 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                                    {resume.name}
                                </div>
                            )}

                            <input
                                type="file"
                                hidden
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                            />
                        </label>
                    )}

                    {/* PASTE MODE */}
                    {activeTab === "paste" && (
                        <textarea
                            placeholder="Paste your complete resume here..."
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                            className="w-full h-72 bg-black/20 border border-white/10 rounded-3xl p-6 text-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/40 placeholder:text-gray-600"
                        />
                    )}
                </div>

                {/* JOB DESCRIPTION */}
                <div className="bg-[#110c1d] rounded-3xl border border-white/5 p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-8">
                        <Sparkles className="text-purple-400 w-5 h-5" />

                        <h2 className="font-bold text-xl">Job Description</h2>
                    </div>

                    <textarea
                        placeholder="Paste the complete job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="w-full h-72 bg-black/20 border border-white/10 rounded-3xl p-6 text-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/40 placeholder:text-gray-600"
                    />

                    <div className="mt-6 text-sm text-gray-500 leading-relaxed">
                        Include responsibilities, required skills, technologies,
                        qualifications, and preferred experience for the most accurate AI
                        analysis.
                    </div>
                </div>
            </div>

            {/* ERROR */}
            {error && (
                <div className="mt-8 px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 max-w-xl text-center">
                    {error}
                </div>
            )}

            {/* BUTTON */}
            <div className="mt-12 text-center">
                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="px-12 py-5 rounded-3xl bg-gradient-to-r from-purple-400 to-fuchsia-300 text-[#110c1d] font-black text-lg shadow-[0_0_50px_rgba(192,132,252,0.3)] hover:shadow-[0_0_80px_rgba(192,132,252,0.5)] transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin w-5 h-5" />
                            Performing Deep AI Analysis...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            Analyze My Resume
                        </>
                    )}
                </button>

                <p className="mt-6 text-gray-600 text-xs max-w-md mx-auto leading-relaxed">
                    Your resume is analyzed using advanced AI ATS scoring,
                    recruiter-grade evaluation, semantic skill matching, and hiring
                    intelligence algorithms.
                </p>
            </div>
        </section>
    );
};

export default Analyzer;