import React from 'react';

// This is a reusable input field component for our calculators.
export const InputField = ({ label, value, onChange, unit, type = "number", placeholder = "" }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, unit?: string, type?: string, placeholder?: string }) => (
    <div>
        <label className="text-sm text-cyan-300">{label}</label>
        <div className="flex items-center">
            <input 
                type={type} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder}
                className="w-full mt-1 bg-black/30 p-2 rounded-md border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400" 
            />
            {unit && <span className="ml-2 text-cyan-300">{unit}</span>}
        </div>
    </div>
);

// This is a reusable component to display the result of a calculation.
export const ResultDisplay = ({ label, value, subValue = "" }: { label: string, value: string, subValue?: string }) => (
    <div className="mt-6 text-center bg-black/30 p-4 rounded-lg">
        <p className="text-lg">{label}</p>
        <p className="text-4xl font-bold text-amber-400 my-2 break-words">{value}</p>
        {subValue && <p className="text-sm text-cyan-300">{subValue}</p>}
    </div>
);

