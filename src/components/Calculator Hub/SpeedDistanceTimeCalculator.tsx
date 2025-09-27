import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

const SpeedDistanceTimeCalculator: React.FC = () => {
    const [solveFor, setSolveFor] = useState<'speed' | 'distance' | 'time'>('speed');
    const [speed, setSpeed] = useState('60');
    const [distance, setDistance] = useState('120');
    const [time, setTime] = useState('2');

    const result = useMemo(() => {
        const s = parseFloat(speed);
        const d = parseFloat(distance);
        const t = parseFloat(time);

        if (solveFor === 'speed' && !isNaN(d) && !isNaN(t) && t > 0) return { label: 'Speed (km/h)', value: (d/t).toFixed(2) };
        if (solveFor === 'distance' && !isNaN(s) && !isNaN(t)) return { label: 'Distance (km)', value: (s*t).toFixed(2) };
        if (solveFor === 'time' && !isNaN(s) && !isNaN(d) && s > 0) return { label: 'Time (hours)', value: (d/s).toFixed(2) };
        return null;

    }, [solveFor, speed, distance, time]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="flex justify-center gap-2 mb-4">
                <button onClick={() => setSolveFor('speed')} className={`px-3 py-1 text-sm rounded-full ${solveFor === 'speed' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Speed</button>
                <button onClick={() => setSolveFor('distance')} className={`px-3 py-1 text-sm rounded-full ${solveFor === 'distance' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Distance</button>
                <button onClick={() => setSolveFor('time')} className={`px-3 py-1 text-sm rounded-full ${solveFor === 'time' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Time</button>
            </div>
             <div className="space-y-4">
                {solveFor !== 'speed' && <InputField label="Speed (km/h)" value={speed} onChange={e => setSpeed(e.target.value)} />}
                {solveFor !== 'distance' && <InputField label="Distance (km)" value={distance} onChange={e => setDistance(e.target.value)} />}
                {solveFor !== 'time' && <InputField label="Time (hours)" value={time} onChange={e => setTime(e.target.value)} />}
            </div>
            {result && <ResultDisplay label={result.label} value={result.value} />}
        </div>
    );
};

export default SpeedDistanceTimeCalculator;
