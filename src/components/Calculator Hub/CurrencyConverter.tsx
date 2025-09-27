import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

// Demo conversion rates (in a real app, this would come from an API)
const RATES = { 'USD': 1.0, 'BDT': 117.50, 'INR': 83.50, 'EUR': 0.92 };

const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState('100');
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('BDT');

    const result = useMemo(() => {
        const amt = parseFloat(amount);
        if (isNaN(amt)) return null;
        const resultValue = (amt / RATES[from]) * RATES[to];
        return resultValue.toFixed(2);
    }, [amount, from, to]);

    return (
         <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Currency Converter</h3>
            <div className="space-y-4">
                <InputField label="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="text-sm">From</label>
                        <select value={from} onChange={e => setFrom(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md">
                            {Object.keys(RATES).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                        </select>
                    </div>
                    <div className="w-1/2">
                        <label className="text-sm">To</label>
                        <select value={to} onChange={e => setTo(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md">
                            {Object.keys(RATES).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            {result && <ResultDisplay label={`Converted Amount`} value={`${result} ${to}`} />}
        </div>
    );
};

export default CurrencyConverter;
