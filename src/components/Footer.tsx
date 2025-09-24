import React from 'react';
import { Globe, Github, Linkedin, Mail } from './Icons';

const Footer: React.FC = () => (
    <footer className="w-full mt-auto py-6">
        <div className="max-w-7xl mx-auto text-center text-cyan-400/60">
            <p className="mb-2 text-sm">Developed with ❤️ by Md. Yousuf Ali</p>
            <div className="flex justify-center items-center gap-6">
                <a href="https://yousufali-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" aria-label="Portfolio"><Globe size={20} /></a>
                <a href="https://github.com/Yousuf-Ali" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" aria-label="GitHub"><Github size={20} /></a>
                <a href="https://www.linkedin.com/in/md-yousuf-ali-dev/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
                <a href="mailto:mdyousufali.dev@gmail.com" className="hover:text-amber-400 transition-colors" aria-label="Email"><Mail size={20} /></a>
            </div>
        </div>
    </footer>
);

export default Footer;
