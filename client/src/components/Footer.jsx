import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#05020a] border-t border-gray-800 py-12 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                    <div className="text-lg font-bold text-white mb-2">ResumeFit AI</div>
                    <p className="text-gray-500 text-sm">Optimizing careers with artificial intelligence.</p>
                </div>

                <div className="flex gap-8 text-sm font-medium text-gray-400">
                    <a href="https://github.com/GAURAVETH" className="hover:text-purple-400">GitHub</a>
                    <a href="https://www.linkedin.com/in/codezgaurav" className="hover:text-purple-400">LinkedIn</a>
                </div>

                <div className="text-gray-500 text-xs text-center md:text-right">
                    <p>© 2026 ResumeFit. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;