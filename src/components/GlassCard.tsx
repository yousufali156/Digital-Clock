import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => (
    <div className={`bg-black/20 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-lg shadow-cyan-500/10 ${className}`}>
        {children}
    </div>
);

export default GlassCard;
