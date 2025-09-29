import React, { useState, useMemo } from 'react';

const BMICalculator: React.FC = () => {
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

    const bmiResult = useMemo(() => {
        const h = parseFloat(height);
        const w = parseFloat(weight);

        if (!h || !w || h <= 0 || w <= 0) return null;

        let bmi;
        if (unit === 'metric') {
            bmi = w / ((h / 100) ** 2);
        } else {
            bmi = (w / (h ** 2)) * 703;
        }

        let category = '';
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi >= 18.5 && bmi <= 24.9) category = 'Normal weight';
        else if (bmi >= 25 && bmi <= 29.9) category = 'Overweight';
        else category = 'Obesity';

        return {
            value: bmi.toFixed(1),
            category: category
        };
    }, [height, weight, unit]);
    
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="flex justify-center mb-4">
                <button onClick={() => setUnit('metric')} className={`px-4 py-2 rounded-l-lg ${unit === 'metric' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Metric</button>
                <button onClick={() => setUnit('imperial')} className={`px-4 py-2 rounded-r-lg ${unit === 'imperial' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Imperial</button>
            </div>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-cyan-300">Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}
                        className="w-full mt-1 bg-black/30 p-2 rounded-md border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-cyan-300">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
                        className="w-full mt-1 bg-black/30 p-2 rounded-md border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>
            </div>

            {bmiResult && (
                <div className="mt-6 text-center bg-black/30 p-4 rounded-lg">
                    <p className="text-lg">Your BMI is</p>
                    <p className="text-5xl font-bold text-amber-400 my-2">{bmiResult.value}</p>
                    <p className="font-semibold text-cyan-300">{bmiResult.category}</p>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;
