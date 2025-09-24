import React from 'react';
import GlassCard from './GlassCard';

const QuoteOfTheDay: React.FC = () => (
    <GlassCard className="p-6 h-full flex flex-col justify-center">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">Quote of the Day</h2>
        <blockquote className="text-md italic text-white/90">
            "The best way to predict the future is to create it."
            <cite className="block not-italic text-right mt-2 text-white/60">- Peter Drucker</cite>
        </blockquote>
    </GlassCard>
);

export default QuoteOfTheDay;
