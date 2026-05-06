import React from 'react';
import { Sparkles, ArrowRight, FileText, Target, Lightbulb } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative min-h-screen bg-[#05020a] text-white overflow-hidden pt-32 pb-20 px-6">

            {/* Background Glow Effect */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            {/* 1. Badge */}
            <div className="flex justify-center mb-8">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">
                        AI-powered resume analysis
                    </span>
                </div>
            </div>

            {/* 2. Main Heading */}
            <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                    Will your resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-300">land the interview?</span>
                </h1>
                <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Drop in your resume and a job description. Our AI scores how well you fit and tells you exactly what to improve — in seconds.
                </p>
            </div>

            {/* 3. CTA Area */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
                <button className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer">
                    Analyze my resume
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-gray-500 text-sm font-medium">No signup. Free.</span>
            </div>

            {/* 4. "How it works" Section */}
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center text-3xl font-bold mb-16">How it works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                    <FeatureCard
                        icon={<FileText className="w-6 h-6 text-purple-400 " />}
                        step="1. Submit"
                        desc="Upload a PDF/DOCX or paste your resume, then paste the job description."
                        className="cursor-pointer"
                    />
                    <FeatureCard
                        icon={<Target className="w-6 h-6 text-purple-400" />}
                        step="2. Score"
                        desc="AI agents analyze both, compare them, and produce a suitability score with sub-scores."
                        className="cursor-pointer"
                    />
                    <FeatureCard
                        icon={<Lightbulb className="w-6 h-6 text-purple-400" />}
                        step="3. Improve"
                        desc="Get strengths, gaps, and concrete suggestions to rewrite your resume for this role."
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, step, desc }) => (
    <div className="p-8 rounded-3xl bg-[#0f0a19]/50 border border-white/5 backdrop-blur-md hover:border-white/10 transition-transform duration-300 ease-in-out hover:scale-105 transform cursor-pointer">
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{step}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default Hero;