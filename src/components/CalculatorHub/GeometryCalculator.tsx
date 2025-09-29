import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

const GeometryCalculator: React.FC = () => {
    const [shape, setShape] = useState<'circle' | 'rectangle'>('circle');
    const [radius, setRadius] = useState('10');
    const [length, setLength] = useState('10');
    const [width, setWidth] = useState('15');

    const result = useMemo(() => {
        if (shape === 'circle') {
            const r = parseFloat(radius);
            if (isNaN(r)) return null;
            return {
                area: (Math.PI * r * r).toFixed(2),
                perimeter: (2 * Math.PI * r).toFixed(2),
            };
        } else { // Rectangle
            const l = parseFloat(length);
            const w = parseFloat(width);
            if(isNaN(l) || isNaN(w)) return null;
            return {
                area: (l * w).toFixed(2),
                perimeter: (2 * (l + w)).toFixed(2),
            };
        }
    }, [shape, radius, length, width]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="flex justify-center gap-2 mb-4">
                <button onClick={() => setShape('circle')} className={`px-3 py-1 text-sm rounded-full ${shape === 'circle' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Circle</button>
                <button onClick={() => setShape('rectangle')} className={`px-3 py-1 text-sm rounded-full ${shape === 'rectangle' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Rectangle</button>
            </div>
            <div className="space-y-4">
                {shape === 'circle' ? (
                    <InputField label="Radius" value={radius} onChange={e => setRadius(e.target.value)} />
                ) : (
                    <>
                        <InputField label="Length" value={length} onChange={e => setLength(e.target.value)} />
                        <InputField label="Width" value={width} onChange={e => setWidth(e.target.value)} />
                    </>
                )}
            </div>
            {result && <ResultDisplay label={`Area: ${result.area}`} value={`Perimeter: ${result.perimeter}`} />}
        </div>
    );
};

export default GeometryCalculator;
