import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

const PercentageCalculator: React.FC = () => {
    const [value, setValue] = useState('150');
    const [percent, setPercent] = useState('25');

    const result = useMemo(() => {
        const v = parseFloat(value);
        const p = parseFloat(percent);
        if (isNaN(v) || isNaN(p)) return null;
        return (v * p / 100).toFixed(2);
    }, [value, percent]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Percentage Calculator</h3>
            <div className="flex items-end gap-2">
                <InputField label="Percentage (%)" value={percent} onChange={e => setPercent(e.target.value)} />
                <span className="pb-2">of</span>
                <InputField label="Value" value={value} onChange={e => setValue(e.target.value)} />
            </div>
            {result && <ResultDisplay label="Result is" value={result} />}
        </div>
    );
};

export default PercentageCalculator;
