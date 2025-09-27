import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

const TimeCalculator: React.FC = () => {
    const [h1, setH1] = useState('10');
    const [m1, setM1] = useState('30');
    const [s1, setS1] = useState('0');
    const [h2, setH2] = useState('2');
    const [m2, setM2] = useState('15');
    const [s2, setS2] = useState('0');
    const [op, setOp] = useState<'add' | 'subtract'>('add');

    const result = useMemo(() => {
        const totalSec1 = parseInt(h1)*3600 + parseInt(m1)*60 + parseInt(s1);
        const totalSec2 = parseInt(h2)*3600 + parseInt(m2)*60 + parseInt(s2);
        if(isNaN(totalSec1) || isNaN(totalSec2)) return null;

        const totalResultSec = op === 'add' ? totalSec1 + totalSec2 : totalSec1 - totalSec2;
        if(totalResultSec < 0) return "Negative Time";

        const hours = Math.floor(totalResultSec / 3600);
        const minutes = Math.floor((totalResultSec % 3600) / 60);
        const seconds = totalResultSec % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    }, [h1, m1, s1, h2, m2, s2, op]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Time Calculator</h3>
            <div className="grid grid-cols-3 gap-2">
                <InputField label="H" value={h1} onChange={e => setH1(e.target.value)} />
                <InputField label="M" value={m1} onChange={e => setM1(e.target.value)} />
                <InputField label="S" value={s1} onChange={e => setS1(e.target.value)} />
            </div>
            <div className="flex justify-center my-2">
                <button onClick={() => setOp('add')} className={`px-4 py-1 text-lg rounded-l-lg ${op === 'add' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>+</button>
                <button onClick={() => setOp('subtract')} className={`px-4 py-1 text-lg rounded-r-lg ${op === 'subtract' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>-</button>
            </div>
             <div className="grid grid-cols-3 gap-2">
                <InputField label="H" value={h2} onChange={e => setH2(e.target.value)} />
                <InputField label="M" value={m2} onChange={e => setM2(e.target.value)} />
                <InputField label="S" value={s2} onChange={e => setS2(e.target.value)} />
            </div>
            {result && <ResultDisplay label="Result" value={result} />}
        </div>
    );
};

export default TimeCalculator;
