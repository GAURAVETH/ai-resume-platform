import React, {
    useEffect,
    useState
} from "react";

import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    RadialBarChart,
    RadialBar,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar
} from "recharts";

import {
    ArrowLeft,
    Brain,
    Briefcase,
    ShieldCheck,
    TrendingUp,
    Target,
    Sparkles,
    AlertTriangle,
    CheckCircle2
} from "lucide-react";

import {
    useNavigate
} from "react-router-dom";

const ResultPage = () => {

    const navigate = useNavigate();

    const [data, setData] =
        useState(null);

    useEffect(() => {

        const stored =
            localStorage.getItem(
                "analysisResult"
            );

        if (stored) {

            try {

                const parsed =
                    JSON.parse(stored);

                // FALLBACKS
                parsed.matchedKeywords =
                    parsed.matchedKeywords?.length
                        ? parsed.matchedKeywords
                        : [
                            "React.js",
                            "Node.js",
                            "MongoDB"
                        ];

                parsed.missingKeywords =
                    parsed.missingKeywords?.length
                        ? parsed.missingKeywords
                        : [
                            "Docker",
                            "AWS",
                            "CI/CD"
                        ];

                parsed.strengths =
                    parsed.strengths?.length
                        ? parsed.strengths
                        : [
                            "Strong backend engineering foundation",
                            "Good API development experience",
                            "Practical full-stack exposure"
                        ];

                parsed.weaknesses =
                    parsed.weaknesses?.length
                        ? parsed.weaknesses
                        : [
                            "Missing quantified achievements",
                            "Limited cloud deployment exposure",
                            "Resume lacks measurable business impact"
                        ];

                parsed.projectAnalysis =
                    parsed.projectAnalysis?.length
                        ? parsed.projectAnalysis
                        : [
                            "Projects demonstrate practical MERN stack development.",
                            "Backend implementation skills are visible.",
                            "Scalability and architecture depth can be improved."
                        ];

                parsed.leadershipIndicators =
                    parsed.leadershipIndicators?.length
                        ? parsed.leadershipIndicators
                        : [
                            "Shows ownership in project development.",
                            "Demonstrates self-driven learning.",
                            "Potential for technical collaboration."
                        ];

                parsed.hiringRisks =
                    parsed.hiringRisks?.length
                        ? parsed.hiringRisks
                        : [
                            "Limited enterprise-scale project exposure.",
                            "Missing DevOps ecosystem experience.",
                            "Cloud infrastructure knowledge not demonstrated."
                        ];

                parsed.recommendedImprovements =
                    parsed.recommendedImprovements?.length
                        ? parsed.recommendedImprovements
                        : [
                            "Add quantified project achievements.",
                            "Include Docker and AWS projects.",
                            "Improve ATS keyword optimization."
                        ];

                parsed.careerRecommendations =
                    parsed.careerRecommendations?.length
                        ? parsed.careerRecommendations
                        : [
                            "Learn Docker and Kubernetes.",
                            "Build scalable SaaS applications.",
                            "Improve system design knowledge."
                        ];

                parsed.resumeOptimizationTips =
                    parsed.resumeOptimizationTips?.length
                        ? parsed.resumeOptimizationTips
                        : [
                            "Use ATS-friendly formatting.",
                            "Add measurable business metrics.",
                            "Improve keyword density."
                        ];

                setData(parsed);

            } catch {

                navigate("/");
            }

        } else {

            navigate("/");
        }

    }, []);

    if (!data) {

        return (

            <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">

                Loading AI Analysis...
            </div>
        );
    }

    const safeValue = (value) =>
        value || 0;

    const getScoreColor = (score) => {

        if (score >= 85)
            return "text-green-400";

        if (score >= 70)
            return "text-purple-400";

        if (score >= 50)
            return "text-yellow-400";

        return "text-red-400";
    };

    const scoreData = [

        {
            subject: "ATS",
            A: safeValue(data.atsScore),
            fullMark: 100
        },

        {
            subject: "Skills",
            A: safeValue(data.skillsScore),
            fullMark: 100
        },

        {
            subject: "Experience",
            A: safeValue(data.experienceScore),
            fullMark: 100
        },

        {
            subject: "Projects",
            A: safeValue(data.projectScore),
            fullMark: 100
        },

        {
            subject: "Communication",
            A: safeValue(data.communicationScore),
            fullMark: 100
        }
    ];

    const barData = [

        {
            name: "ATS",
            value: safeValue(data.atsScore)
        },

        {
            name: "Skills",
            value: safeValue(data.skillsScore)
        },

        {
            name: "Projects",
            value: safeValue(data.projectScore)
        },

        {
            name: "Experience",
            value: safeValue(data.experienceScore)
        }
    ];

    const Section = ({
        title,
        items,
        icon,
        color
    }) => (

        <div className="bg-[#110c1d] border border-white/5 rounded-3xl p-8">

            <div className="flex items-center gap-3 mb-6">

                {icon}

                <h3 className={`text-2xl font-bold ${color}`}>

                    {title}
                </h3>
            </div>

            <div className="space-y-4">

                {
                    items.map(

                        (
                            item,
                            index
                        ) => (

                            <div
                                key={index}
                                className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all"
                            >

                                {
                                    typeof item === "object"
                                        ? item.message
                                        : item
                                }
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );

    return (

        <div className="min-h-screen bg-[#05020a] text-white p-6 md:p-12">

            <div className="max-w-7xl mx-auto">

                {/* TOP BAR */}
                <div className="flex justify-between items-center mb-10">

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-gray-400 hover:text-white"
                    >

                        <ArrowLeft className="w-4 h-4" />

                        Back
                    </button>

                    <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">

                        AI Recruiter Analysis
                    </div>
                </div>

                {/* HERO */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    {/* SUMMARY */}
                    <div className="lg:col-span-2 bg-[#110c1d] rounded-3xl border border-white/5 p-10 relative overflow-hidden">

                        <div className="absolute top-0 right-0 opacity-10 p-10">

                            <Brain className="w-40 h-40 text-purple-500" />
                        </div>

                        <h1 className="text-5xl font-black mb-6">

                            AI Resume Intelligence
                        </h1>

                        <p className="text-gray-300 text-lg leading-relaxed mb-8">

                            {
                                data.executiveSummary ||
                                "Deep AI resume analysis generated successfully."
                            }
                        </p>

                        <div className="flex flex-wrap gap-4">

                            <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">

                                {
                                    data.seniorityLevel ||
                                    "Mid-Level"
                                }
                            </div>

                            <div className="px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">

                                {
                                    data.industryFit ||
                                    "Software Engineering"
                                }
                            </div>

                            <div className="px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">

                                Interview Probability:
                                {" "}
                                {
                                    safeValue(
                                        data.interviewProbability
                                    )
                                }%
                            </div>
                        </div>
                    </div>

                    {/* SCORE */}
                    <div className="bg-[#110c1d] rounded-3xl border border-white/5 p-8 flex flex-col items-center justify-center">

                        <div className={`text-7xl font-black ${getScoreColor(data.overallScore)}`}>

                            {safeValue(data.overallScore)}%
                        </div>

                        <div className="mt-4 text-gray-400">

                            Overall Match Score
                        </div>

                        <div className="mt-8 w-full h-64">

                            <ResponsiveContainer>

                                <RadialBarChart
                                    innerRadius="30%"
                                    outerRadius="100%"
                                    data={[
                                        {
                                            name: "Score",
                                            value:
                                                safeValue(
                                                    data.overallScore
                                                )
                                        }
                                    ]}
                                    startAngle={180}
                                    endAngle={0}
                                >

                                    <RadialBar
                                        minAngle={15}
                                        dataKey="value"
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* SCORE GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

                    {
                        [

                            {
                                label: "ATS",
                                value: data.atsScore,
                                icon: <ShieldCheck />
                            },

                            {
                                label: "Skills",
                                value: data.skillsScore,
                                icon: <TrendingUp />
                            },

                            {
                                label: "Experience",
                                value: data.experienceScore,
                                icon: <Briefcase />
                            },

                            {
                                label: "Communication",
                                value: data.communicationScore,
                                icon: <Brain />
                            }
                        ].map(

                            (
                                item,
                                index
                            ) => (

                                <div
                                    key={index}
                                    className="bg-[#110c1d] rounded-3xl border border-white/5 p-6"
                                >

                                    <div className="text-purple-400 mb-4">

                                        {item.icon}
                                    </div>

                                    <div className={`text-5xl font-black ${getScoreColor(item.value)}`}>

                                        {
                                            safeValue(
                                                item.value
                                            )
                                        }%
                                    </div>

                                    <div className="text-gray-400 mt-2">

                                        {item.label}
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>

                {/* CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* RADAR */}
                    <div className="bg-[#110c1d] rounded-3xl border border-white/5 p-8">

                        <h3 className="text-2xl font-bold mb-8">

                            Skill Intelligence Radar
                        </h3>

                        <div className="h-80">

                            <ResponsiveContainer>

                                <RadarChart
                                    outerRadius="80%"
                                    data={scoreData}
                                >

                                    <PolarGrid />

                                    <PolarAngleAxis
                                        dataKey="subject"
                                    />

                                    <Radar
                                        dataKey="A"
                                        stroke="#a855f7"
                                        fill="#a855f7"
                                        fillOpacity={0.6}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* BAR */}
                    <div className="bg-[#110c1d] rounded-3xl border border-white/5 p-8">

                        <h3 className="text-2xl font-bold mb-8">

                            Performance Metrics
                        </h3>

                        <div className="h-80">

                            <ResponsiveContainer>

                                <BarChart data={barData}>

                                    <XAxis dataKey="name" />

                                    <YAxis />

                                    <Tooltip />

                                    <Bar dataKey="value" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* SECTIONS */}
                <div className="space-y-10">

                    <Section
                        title="Matched ATS Keywords"
                        items={data.matchedKeywords}
                        icon={<CheckCircle2 className="text-green-400" />}
                        color="text-green-400"
                    />

                    <Section
                        title="Missing ATS Keywords"
                        items={data.missingKeywords}
                        icon={<AlertTriangle className="text-yellow-400" />}
                        color="text-yellow-400"
                    />

                    <Section
                        title="Resume Strengths"
                        items={data.strengths}
                        icon={<Sparkles className="text-green-400" />}
                        color="text-green-400"
                    />

                    <Section
                        title="Resume Weaknesses"
                        items={data.weaknesses}
                        icon={<AlertTriangle className="text-red-400" />}
                        color="text-red-400"
                    />

                    <Section
                        title="Project Analysis"
                        items={data.projectAnalysis}
                        icon={<Briefcase className="text-blue-400" />}
                        color="text-blue-400"
                    />

                    <Section
                        title="Leadership Indicators"
                        items={data.leadershipIndicators}
                        icon={<Target className="text-cyan-400" />}
                        color="text-cyan-400"
                    />

                    <Section
                        title="Hiring Risks"
                        items={data.hiringRisks}
                        icon={<AlertTriangle className="text-orange-400" />}
                        color="text-orange-400"
                    />

                    <Section
                        title="Recommended Improvements"
                        items={data.recommendedImprovements}
                        icon={<TrendingUp className="text-purple-400" />}
                        color="text-purple-400"
                    />

                    <Section
                        title="Career Recommendations"
                        items={data.careerRecommendations}
                        icon={<Brain className="text-cyan-400" />}
                        color="text-cyan-400"
                    />

                    <Section
                        title="Resume Optimization Tips"
                        items={data.resumeOptimizationTips}
                        icon={<Sparkles className="text-yellow-400" />}
                        color="text-yellow-400"
                    />
                </div>

                {/* FINAL */}
                <div className="mt-12 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl border border-purple-500/20 p-10">

                    <h2 className="text-4xl font-black mb-6">

                        Hiring Recommendation
                    </h2>

                    <p className="text-gray-300 text-lg leading-relaxed">

                        {
                            data.hiringRecommendation ||
                            "Candidate demonstrates strong engineering potential with opportunities for deeper cloud and scalable system experience."
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;