import React from 'react';
import { Sparkles } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        // Increase horizontal padding (px-4 or px-6) to keep it off the very edge of the screen
        <nav className="fixed top-0 left-0 w-full z-50 px-4 py-4">

            {/* Changed max-w-7xl to max-w-[98%] or max-w-full for more width */}
            <div className="max-w-[98%] mx-auto flex items-center justify-between px-8 py-3 rounded-2xl bg-[#0f0a19]/80 backdrop-blur-md border border-white/10 shadow-2xl">

                {/* Logo Section */}
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="p-2 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        Resume<span className="text-purple-400">Fit</span>
                    </h1>
                </div>

                {/* Button Section */}
                <button className="px-8 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer"
                    onClick={() => navigate('/analyze')}>
                    Analyze resume
                </button>

            </div>
        </nav>
    );
};

export default Navbar;