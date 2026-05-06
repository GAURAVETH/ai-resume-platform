import React, { useEffect, useState } from "react";

import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar
} from "recharts";

import {
    CheckCircle2,
    AlertCircle,
    Award,
    ArrowLeft,
    Download
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const ResultPage = () => {

    const navigate = useNavigate();

    const [data, setData] = useState(null);

    useEffect(() => {

        const storedResult =
            localStorage.getItem(
                "analysisResult"
            );

        if (storedResult) {

            setData(
                JSON.parse(storedResult)
            );

        } else {

            navigate("/");
        }

    }, []);

    if (!data) {

        return (

            <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
                Loading...
            </div>
        );
    }

    const scoreData = [

        {
            subject: "Overall",
            A: data.overallScore * 10,
            fullMark: 100
        },

        {
            subject: "Skills",
            A: data.skillsScore * 10,
            fullMark: 100
        },

        {
            subject: "Experience",
            A: data.experienceScore * 10,
            fullMark: 100
        },

        {
            subject: "Education",
            A: data.educationScore * 10,
            fullMark: 100
        }
    ];

    return (

        <div className="min-h-screen bg-[#05020a] text-white p-6 md:p-12 justify-center">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-12 mt-14">

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4 " />
                        Back
                    </button>

                    {/* <button className="flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">

                        <Download className="w-4 h-4" />

                        Export Report
                    </button> */}
                </div>

                {/* TOP GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    {/* SUMMARY */}
                    <div className="lg:col-span-2 bg-[#110c1d] border border-white/5 rounded-3xl p-8 relative overflow-hidden">

                        <div className="absolute top-0 right-0 p-8 opacity-10">

                            <Award className="w-32 h-32 text-purple-500" />
                        </div>

                        <h2 className="text-2xl font-bold mb-4">
                            AI Resume Analysis
                        </h2>

                        <p className="text-gray-400 leading-relaxed relative z-10">

                            {data.executiveSummary}
                        </p>
                    </div>

                    {/* RADAR CHART */}
                    <div className="bg-[#110c1d] border border-white/5 rounded-3xl p-8 flex flex-col items-center">

                        <h3 className="text-lg font-bold mb-4">
                            Score Breakdown
                        </h3>

                        <div className="w-full h-64">

                            <ResponsiveContainer width="100%" height="100%">

                                <RadarChart
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    data={scoreData}
                                >

                                    <PolarGrid stroke="#333" />

                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{
                                            fill: "#9ca3af",
                                            fontSize: 12
                                        }}
                                    />

                                    <Radar
                                        name="Score"
                                        dataKey="A"
                                        stroke="#a855f7"
                                        fill="#a855f7"
                                        fillOpacity={0.6}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 text-4xl font-black text-purple-400">

                            {data.overallScore}/10
                        </div>
                    </div>
                </div>

                {/* SKILLS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* MATCHED */}
                    <div className="bg-green-500/5 border border-green-500/10 rounded-3xl p-8">

                        <h3 className="text-green-400 font-bold mb-6 flex items-center gap-2">

                            <CheckCircle2 className="w-5 h-5" />

                            Matched Skills
                        </h3>

                        <div className="flex flex-wrap gap-3">

                            {data.matchedSkills?.map(

                                (skill, index) => (

                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-sm text-green-300"
                                    >
                                        {skill}
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                    {/* MISSING */}
                    <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8">

                        <h3 className="text-red-400 font-bold mb-6 flex items-center gap-2">

                            <AlertCircle className="w-5 h-5" />

                            Missing Skills
                        </h3>

                        <div className="flex flex-wrap gap-3">

                            {data.missingSkills?.map(

                                (skill, index) => (

                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-sm text-red-300"
                                    >
                                        {skill}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* FEEDBACK */}
                <div className="bg-[#110c1d] border border-white/5 rounded-3xl p-8">

                    <h3 className="text-xl font-bold mb-8">
                        Personalized Roadmap
                    </h3>

                    <div className="space-y-4">

                        {data.feedbackItems?.map(

                            (item, index) => (

                                <div
                                    key={index}
                                    className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                                >

                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">

                                        {index + 1}
                                    </div>

                                    <p className="text-gray-300 group-hover:text-white transition-colors pt-1">

                                        {item}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;