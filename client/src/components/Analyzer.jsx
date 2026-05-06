import React, { useState } from "react";

import {
    FileText,
    Sparkles,
    Upload
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import API from "../api/api";

const Analyzer = () => {

    const [activeTab, setActiveTab] =
        useState("upload");

    const [resume, setResume] =
        useState(null);

    const [resumeText, setResumeText] =
        useState("");

    const [jobDescription, setJobDescription] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const navigate = useNavigate();

    const handleAnalyze = async () => {

        try {

            if (
                activeTab === "upload" &&
                !resume
            ) {
                alert("Please upload resume");
                return;
            }

            if (
                activeTab === "paste" &&
                !resumeText
            ) {
                alert("Please paste resume text");
                return;
            }

            if (!jobDescription) {
                alert("Please enter job description");
                return;
            }

            setLoading(true);

            let resumeId = "";

            // UPLOAD FILE
            if (activeTab === "upload") {

                const formData = new FormData();

                formData.append(
                    "resume",
                    resume
                );

                const uploadResponse =
                    await API.post(
                        "/resume/upload",
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        }
                    );

                resumeId =
                    uploadResponse.data.resume._id;
            }

            // ANALYSIS API
            const analysisResponse =
                await API.post(
                    "/analysis",
                    {
                        resumeId,
                        resumeText,
                        jobDescription
                    }
                );

            localStorage.setItem(
                "analysisResult",
                JSON.stringify(
                    analysisResponse.data
                )
            );

            setLoading(false);

            navigate("/results");

        } catch (error) {

            console.log(error);

            setLoading(false);

            alert("Analysis Failed");
        }
    };

    return (

        <section className="bg-[#05020a] text-white py-20 px-6 min-h-screen flex flex-col items-center justify-center">

            <div className="text-center mb-12">

                <h2 className="text-4xl font-bold mb-4">
                    Analyze your fit
                </h2>

                <p className="text-gray-400">
                    Two inputs. One score. Real, specific feedback.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">

                {/* RESUME CARD */}
                <div className="bg-[#110c1d] rounded-3xl p-8 border border-white/5 shadow-2xl">

                    <div className="flex justify-between items-center mb-6">

                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-purple-400" />

                            <span className="font-bold text-lg">
                                Your resume
                            </span>
                        </div>

                        <div className="bg-black/40 p-1 rounded-xl flex gap-1">

                            <button
                                onClick={() => setActiveTab("upload")}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === "upload"
                                    ? "bg-[#1e1630] text-white shadow-lg"
                                    : "text-gray-500"
                                    }`}
                            >
                                Upload
                            </button>

                            <button
                                onClick={() => setActiveTab("paste")}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === "paste"
                                    ? "bg-[#1e1630] text-white shadow-lg"
                                    : "text-gray-500"
                                    }`}
                            >
                                Paste text
                            </button>
                        </div>
                    </div>

                    {
                        activeTab === "upload" && (

                            <label className="border-2 border-dashed border-white/10 rounded-2xl h-64 flex flex-col items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer group">

                                <div className="p-4 bg-purple-500/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="w-6 h-6 text-purple-400" />
                                </div>

                                <p className="font-bold mb-1">
                                    Drop your resume here
                                </p>

                                <p className="text-gray-500 text-sm">
                                    PDF or DOCX, up to 2 MB
                                </p>

                                {
                                    resume && (
                                        <p className="mt-4 text-green-400 text-sm">
                                            {resume.name}
                                        </p>
                                    )
                                }

                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    hidden
                                    onChange={(e) =>
                                        setResume(
                                            e.target.files[0]
                                        )
                                    }
                                />
                            </label>
                        )
                    }

                    {
                        activeTab === "paste" && (

                            <textarea
                                placeholder="Paste your full resume here..."
                                value={resumeText}
                                onChange={(e) =>
                                    setResumeText(
                                        e.target.value
                                    )
                                }
                                className="w-full h-64 bg-black/20 border border-white/10 rounded-2xl p-6 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none placeholder:text-gray-600"
                            />
                        )
                    }
                </div>

                {/* JOB DESCRIPTION */}
                <div className="bg-[#110c1d] rounded-3xl p-8 border border-white/5 shadow-2xl">

                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5 text-purple-400" />

                        <span className="font-bold text-lg">
                            Job description
                        </span>
                    </div>

                    <textarea
                        placeholder="Paste the full job posting here..."
                        value={jobDescription}
                        onChange={(e) =>
                            setJobDescription(
                                e.target.value
                            )
                        }
                        className="w-full h-64 bg-black/20 border border-white/10 rounded-2xl p-6 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none placeholder:text-gray-600"
                    />
                </div>
            </div>

            <div className="mt-12 text-center">

                <button
                    className="px-12 py-4 rounded-2xl bg-gradient-to-r from-purple-400 to-fuchsia-300 text-[#110c1d] font-bold text-lg shadow-[0_0_40px_rgba(192,132,252,0.3)] hover:shadow-[0_0_60px_rgba(192,132,252,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 cursor-pointer"
                    onClick={handleAnalyze}
                    disabled={loading}
                >
                    {
                        loading
                            ? "Analyzing..."
                            : "Analyze my fit"
                    }
                </button>

                <div className="mt-8 text-gray-600 text-[10px] leading-relaxed max-w-xs mx-auto">
                    We don't require an account.
                    Your text is stored only to render the result page.
                    <br />
                    Don't paste private information.
                </div>
            </div>
        </section>
    );
};

export default Analyzer;