import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

const CaloriesCalculator: React.FC = () => {
    // State for user inputs: height, weight, age, gender, and activity level.
    const [height, setHeight] = useState('170');
    const [weight, setWeight] = useState('65');
    const [age, setAge] = useState('25');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [activity, setActivity] = useState(1.55);

    // useMemo calculates the result only when the inputs change.
    const result = useMemo(() => { 
        const h = parseFloat(height); 
        const w = parseFloat(weight); 
        const a = parseFloat(age); 
        
        if(!h || !w || !a) return null; 
        
        // Revised Harris-Benedict Equation to calculate Basal Metabolic Rate (BMR).
        const bmr = gender === 'male' 
            ? (10 * w + 6.25 * h - 5 * a + 5) 
            : (10 * w + 6.25 * h - 5 * a - 161); 
        
        // Calculate Total Daily Energy Expenditure (TDEE) by multiplying BMR by activity level.
        const tdee = bmr * activity; 
        
        return { bmr: bmr.toFixed(0), tdee: tdee.toFixed(0) }; 
    }, [height, weight, age, gender, activity]);

    return(
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Daily Calorie Needs</h3>
            <div className="space-y-4">
                <InputField label="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} />
                <InputField label="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
                <InputField label="Age" value={age} onChange={e => setAge(e.target.value)} />
                <div> 
                    <label className="text-sm text-cyan-300">Gender</label> 
                    <select value={gender} onChange={e => setGender(e.target.value as any)} className="w-full mt-1 bg-black/30 p-2 rounded-md border border-cyan-500/30"> 
                        <option value="male">Male</option> 
                        <option value="female">Female</option> 
                    </select> 
                </div>
                <div> 
                    <label className="text-sm text-cyan-300">Activity Level</label> 
                    <select value={activity} onChange={e => setActivity(parseFloat(e.target.value))} className="w-full mt-1 bg-black/30 p-2 rounded-md border border-cyan-500/30"> 
                        <option value={1.2}>Sedentary (little or no exercise)</option> 
                        <option value={1.375}>Lightly Active (1-3 days/week)</option> 
                        <option value={1.55}>Moderately Active (3-5 days/week)</option> 
                        <option value={1.725}>Very Active (6-7 days a week)</option>
                        <option value={1.9}>Extra Active (very hard exercise & physical job)</option>
                    </select> 
                </div>
            </div>
            {result && <ResultDisplay label="Daily Calories (TDEE)" value={result.tdee} subValue={`Basal Metabolic Rate (BMR): ${result.bmr}`} />}
        </div>
    );
};

export default CaloriesCalculator;

