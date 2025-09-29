import React from 'react';

// Defines the type for the component's props.
interface GlassCardProps {
    // children: The content to be displayed inside the card.
    children: React.ReactNode;
    // className: An optional string for adding extra CSS classes.
    className?: string;
}

// A reusable Functional Component that creates the glassmorphism style.
const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => (
    // The main div element that forms the card's structure.
    <div className={`
        bg-black/20 
        backdrop-blur-xl 
        border 
        border-cyan-500/20 
        rounded-2xl 
        shadow-lg 
        shadow-cyan-500/10 
        ${className}
    `}>
        {/* The content passed as children is rendered here */}
        {children}
    </div>
);

export default GlassCard;

