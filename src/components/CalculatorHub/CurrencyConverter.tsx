import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

// Demo conversion rates.
// By defining the type as Record<string, number>, we tell TypeScript that
// any string can be used as a key to access a number value, which fixes the error.
const RATES: Record<string, number> = { 
    'USD': 1.0, 
    'BDT': 117.50, 
    'INR': 83.50, 
    'EUR': 0.92,
    'GBP': 0.79 
};

const CurrencyConverter: React.FC = () => {
    // State for the amount and the 'from' and 'to' currencies.
    const [amount, setAmount] = useState('100');
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('BDT');

    // useMemo calculates the result only when the inputs change.
    const result = useMemo(() => {
        const amt = parseFloat(amount);
        if (isNaN(amt)) return null;
        
        // The conversion formula: convert the amount to a base currency (USD) first, then to the target currency.
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
                        <label className="text-sm text-cyan-300">From</label>
                        <select value={from} onChange={e => setFrom(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md border border-cyan-500/30">
                            {Object.keys(RATES).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                        </select>
                    </div>
                    <div className="w-1/2">
                        <label className="text-sm text-cyan-300">To</label>
                        <select value={to} onChange={e => setTo(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md border border-cyan-500/30">
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

