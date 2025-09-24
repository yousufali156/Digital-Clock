import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';

const WorldClock: React.FC = () => {
    const [worldTime, setWorldTime] = useState({ tokyo: '', london: '', newYork: '' });

    const getTimeForZone = (timeZone: string) => new Date().toLocaleTimeString('en-US', { timeZone, hour: '2-digit', minute: '2-digit', hour12: true });

    useEffect(() => {
        const updateClocks = () => {
            setWorldTime({
                tokyo: getTimeForZone('Asia/Tokyo'),
                london: getTimeForZone('Europe/London'),
                newYork: getTimeForZone('America/New_York'),
            });
        };
        updateClocks();
        const timerId = setInterval(updateClocks, 60000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <GlassCard className="p-6 h-full">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">World Clock</h2>
            <div className="space-y-3">
                <div className="flex justify-between items-baseline"><span className="text-lg text-white/90">Tokyo</span><span className="text-2xl font-mono font-bold text-amber-300">{worldTime.tokyo}</span></div>
                <div className="flex justify-between items-baseline"><span className="text-lg text-white/90">London</span><span className="text-2xl font-mono font-bold text-amber-300">{worldTime.london}</span></div>
                <div className="flex justify-between items-baseline"><span className="text-lg text-white/90">New York</span><span className="text-2xl font-mono font-bold text-amber-300">{worldTime.newYork}</span></div>
            </div>
        </GlassCard>
    );
};

export default WorldClock;
