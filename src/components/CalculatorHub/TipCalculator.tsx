import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

const TipCalculator: React.FC = () => {
    const [bill, setBill] = useState('1250');
    const [tip, setTip] = useState('10');
    const [people, setPeople] = useState('4');

    const result = useMemo(() => {
        const b = parseFloat(bill);
        const t = parseFloat(tip);
        const p = parseInt(people);
        if (isNaN(b) || isNaN(t) || isNaN(p) || p <= 0) return null;

        const tipAmount = b * (t / 100);
        const totalAmount = b + tipAmount;
        const perPerson = totalAmount / p;

        return {
            total: totalAmount.toFixed(2),
            perPerson: perPerson.toFixed(2),
            tipAmount: tipAmount.toFixed(2)
        };
    }, [bill, tip, people]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Tip Calculator</h3>
            <div className="space-y-4">
                <InputField label="Total Bill" value={bill} onChange={e => setBill(e.target.value)} />
                <InputField label="Tip Percentage (%)" value={tip} onChange={e => setTip(e.target.value)} />
                <InputField label="Number of People" value={people} onChange={e => setPeople(e.target.value)} />
            </div>
            {result && <ResultDisplay label="Each Person Pays" value={`${result.perPerson} (Total: ${result.total})`} />}
        </div>
    );
};

export default TipCalculator;
