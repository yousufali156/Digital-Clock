import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

const GSTVATCalculator: React.FC = () => {
    const [amount, setAmount] = useState('1000');
    const [rate, setRate] = useState('18');
    const [type, setType] = useState<'add' | 'remove'>('add');

    const result = useMemo(() => {
        const a = parseFloat(amount);
        const r = parseFloat(rate);
        if (isNaN(a) || isNaN(r)) return null;

        if (type === 'add') {
            const tax = a * (r / 100);
            return { total: (a + tax).toFixed(2), tax: tax.toFixed(2) };
        } else { // Remove
            const original = a / (1 + r / 100);
            const tax = a - original;
            return { total: original.toFixed(2), tax: tax.toFixed(2) };
        }
    }, [amount, rate, type]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">GST/VAT Calculator</h3>
             <div className="flex justify-center gap-2 mb-4">
                <button onClick={() => setType('add')} className={`px-3 py-1 text-sm rounded-full ${type === 'add' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Add Tax</button>
                <button onClick={() => setType('remove')} className={`px-3 py-1 text-sm rounded-full ${type === 'remove' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Remove Tax</button>
            </div>
            <div className="space-y-4">
                <InputField label="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                <InputField label="Tax Rate (%)" value={rate} onChange={e => setRate(e.target.value)} />
            </div>
            {result && <ResultDisplay label={type === 'add' ? 'Total Amount' : 'Original Amount'} value={result.total} subValue={`Tax: ${result.tax}`} />}
        </div>
    );
};

export default GSTVATCalculator;
