import React, { useState, useMemo } from 'react';

// A reusable input field component for our calculators.
const InputField = ({ label, value, onChange, unit, type = "number", placeholder = "" }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, unit?: string, type?: string, placeholder?: string }) => (
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

// Define explicit types for conversion objects to satisfy TypeScript's strictness.
const LENGTH_UNITS: Record<string, number> = { 'm': 1, 'cm': 0.01, 'km': 1000, 'in': 0.0254, 'ft': 0.3048, 'mi': 1609.34 };
const WEIGHT_UNITS: Record<string, number> = { 'kg': 1, 'g': 0.001, 'lb': 0.453592, 'oz': 0.0283495 };
const TEMP_CONVERSIONS: Record<string, (val: number) => number> = {
    CtoF: (c: number) => c * 9/5 + 32, CtoK: (c: number) => c + 273.15,
    FtoC: (f: number) => (f - 32) * 5/9, FtoK: (f: number) => (f - 32) * 5/9 + 273.15,
    KtoC: (k: number) => k - 273.15, KtoF: (k: number) => (k - 273.15) * 9/5 + 32,
};

const UnitConverter: React.FC = () => {
    // State for managing the selected category, units, and input value.
    const [category, setCategory] = useState<'length' | 'weight' | 'temperature'>('length');
    const [fromUnit, setFromUnit] = useState('m');
    const [toUnit, setToUnit] = useState('ft');
    const [inputValue, setInputValue] = useState('1');

    // useMemo hook to get the list of units based on the selected category.
    const units = useMemo(() => {
        switch(category) {
            case 'length': return Object.keys(LENGTH_UNITS);
            case 'weight': return Object.keys(WEIGHT_UNITS);
            case 'temperature': return ['C', 'F', 'K'];
        }
    }, [category]);

    // useMemo hook to calculate the conversion result.
    const result = useMemo(() => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) return '';
        if (fromUnit === toUnit) return value.toString();

        switch(category) {
            case 'temperature':
                const conversionKey = `${fromUnit}to${toUnit}`;
                if (TEMP_CONVERSIONS[conversionKey]) {
                    return TEMP_CONVERSIONS[conversionKey](value).toFixed(2);
                }
                // Fallback for converting through Celsius if direct conversion is not defined
                let celsius = value;
                if (fromUnit === 'F') celsius = TEMP_CONVERSIONS.FtoC(value);
                if (fromUnit === 'K') celsius = TEMP_CONVERSIONS.KtoC(value);

                if (toUnit === 'F') return TEMP_CONVERSIONS.CtoF(celsius).toFixed(2);
                if (toUnit === 'K') return TEMP_CONVERSIONS.CtoK(celsius).toFixed(2);
                return celsius.toFixed(2);

            case 'length':
                const baseLength = value * LENGTH_UNITS[fromUnit];
                return (baseLength / LENGTH_UNITS[toUnit]).toFixed(4);
            
            case 'weight':
                const baseWeight = value * WEIGHT_UNITS[fromUnit];
                return (baseWeight / WEIGHT_UNITS[toUnit]).toFixed(4);
        }
    }, [inputValue, fromUnit, toUnit, category]);

    const handleCategoryChange = (cat: 'length' | 'weight' | 'temperature') => {
        setCategory(cat);
        // Reset units when category changes
        if (cat === 'length') { setFromUnit('m'); setToUnit('ft'); }
        if (cat === 'weight') { setFromUnit('kg'); setToUnit('lb'); }
        if (cat === 'temperature') { setFromUnit('C'); setToUnit('F'); }
    };
    
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-md mx-auto text-white">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                <button onClick={() => handleCategoryChange('length')} className={`px-3 py-1 text-sm rounded-full ${category === 'length' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Length</button>
                <button onClick={() => handleCategoryChange('weight')} className={`px-3 py-1 text-sm rounded-full ${category === 'weight' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Weight</button>
                <button onClick={() => handleCategoryChange('temperature')} className={`px-3 py-1 text-sm rounded-full ${category === 'temperature' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Temperature</button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:w-1/2">
                    <InputField label="From" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                    <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="w-full mt-2 bg-[#1e3a5f] p-2 rounded-md">
                        {units.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
                <div className="w-full md:w-1/2">
                    {/* The result input is made to look like the other inputs but is read-only */}
                    <InputField label="To" value={result || ''} onChange={() => {}} />
                    <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="w-full mt-2 bg-[#1e3a5f] p-2 rounded-md">
                        {units.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default UnitConverter;

