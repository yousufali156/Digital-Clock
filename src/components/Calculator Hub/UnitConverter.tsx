import React, { useState, useMemo } from 'react';

const CONVERSIONS = {
    length: { 'm': 1, 'cm': 0.01, 'km': 1000, 'in': 0.0254, 'ft': 0.3048, 'mi': 1609.34 },
    weight: { 'kg': 1, 'g': 0.001, 'lb': 0.453592, 'oz': 0.0283495 },
    temperature: {
        C: { F: (c: number) => c * 9/5 + 32, K: (c: number) => c + 273.15 },
        F: { C: (f: number) => (f - 32) * 5/9, K: (f: number) => (f - 32) * 5/9 + 273.15 },
        K: { C: (k: number) => k - 273.15, F: (k: number) => (k - 273.15) * 9/5 + 32 },
    },
};

const UnitConverter: React.FC = () => {
    const [category, setCategory] = useState<'length' | 'weight' | 'temperature'>('length');
    const [fromUnit, setFromUnit] = useState('m');
    const [toUnit, setToUnit] = useState('ft');
    const [inputValue, setInputValue] = useState('1');

    const units = Object.keys(CONVERSIONS[category]);

    const result = useMemo(() => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) return '';
        if (fromUnit === toUnit) return value.toString();

        if (category === 'temperature') {
            return CONVERSIONS.temperature[fromUnit][toUnit](value).toFixed(2);
        } else {
            const baseValue = value * CONVERSIONS[category][fromUnit];
            const finalValue = baseValue / CONVERSIONS[category][toUnit];
            return finalValue.toFixed(4);
        }
    }, [inputValue, fromUnit, toUnit, category]);

    const handleCategoryChange = (cat: 'length' | 'weight' | 'temperature') => {
        setCategory(cat);
        if (cat === 'length') { setFromUnit('m'); setToUnit('ft'); }
        if (cat === 'weight') { setFromUnit('kg'); setToUnit('lb'); }
        if (cat === 'temperature') { setFromUnit('C'); setToUnit('F'); }
    };
    
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-md mx-auto text-white">
            <div className="flex justify-center gap-2 mb-4">
                <button onClick={() => handleCategoryChange('length')} className={`px-3 py-1 text-sm rounded-full ${category === 'length' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Length</button>
                <button onClick={() => handleCategoryChange('weight')} className={`px-3 py-1 text-sm rounded-full ${category === 'weight' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Weight</button>
                <button onClick={() => handleCategoryChange('temperature')} className={`px-3 py-1 text-sm rounded-full ${category === 'temperature' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Temperature</button>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-1/2">
                    <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)}
                        className="w-full bg-black/30 p-2 rounded-md border border-cyan-500/30" />
                    <select value={fromUnit} onChange={e => setFromUnit(e.target.value)}
                        className="w-full mt-2 bg-[#1e3a5f] p-2 rounded-md">
                        {units.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
                <div className="w-1/2">
                    <input type="text" value={result} readOnly
                        className="w-full bg-black/50 p-2 rounded-md border border-cyan-500/50 text-amber-300" />
                    <select value={toUnit} onChange={e => setToUnit(e.target.value)}
                        className="w-full mt-2 bg-[#1e3a5f] p-2 rounded-md">
                        {units.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default UnitConverter;
