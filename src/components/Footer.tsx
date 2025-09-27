import React from 'react';
// The 'Code' icon has been added to the import list.
import { Globe, Github, Linkedin, Mail, Code } from './Icons';

const Footer: React.FC = () => (
    <footer className="w-full mt-auto py-6">
        <div className="max-w-7xl mx-auto text-center text-cyan-400/60">
            <p className="mb-2 text-sm">Developed with ❤️ by <span className='text-green-400'>Md. Yousuf Ali</span>  </p>
            <div className="flex justify-center items-center gap-6">
                {/* The 'size' prop has been replaced with standard 'width' and 'height' to fix the error. */}
                <a href="https://yousufali-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" aria-label="Portfolio">
                    <Globe width="20" height="20" />
                </a>
                <a href="https://github.com/yousufali156" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" aria-label="GitHub">
                    <Github width="20" height="20" />
                </a>

                <a href="https://www.linkedin.com/in/yousufali156/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" aria-label="LinkedIn">
                    <Linkedin width="20" height="20" />
                </a>
                <a href="mailto:mdyousufali.dev@gmail.com" className="hover:text-amber-400 transition-colors" aria-label="Email">
                    <Mail width="20" height="20" />
                </a>
                {/* A new link for "All Repositories" has been added. */}
                <a href="https://yousuf-ali-dev.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" aria-label="All Repositories">
                    <Code width="20" height="20" />
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;

