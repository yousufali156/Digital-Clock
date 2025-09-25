import React, { useState, useMemo } from 'react';

const FinancialCalculator: React.FC = () => {
    const [principal, setPrincipal] = useState('100000');
    const [rate, setRate] = useState('8.5');
    const [tenure, setTenure] = useState('10');

    const emiResult = useMemo(() => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 12 / 100;
        const n = parseFloat(tenure) * 12;

        if (!p || !r || !n) return null;

        const emi = (p * r * (1 + r) ** n) / ((1 + r) ** n - 1);
        return emi.toFixed(2);
    }, [principal, rate, tenure]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Loan EMI Calculator</h3>
            <div className="space-y-4">
                <div>
                    <label className="text-sm">Loan Amount (Principal)</label>
                    <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)}
                           className="w-full mt-1 bg-black/30 p-2 rounded-md" />
                </div>
                <div>
                    <label className="text-sm">Annual Interest Rate (%)</label>
                    <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                           className="w-full mt-1 bg-black/30 p-2 rounded-md" />
                </div>
                <div>
                    <label className="text-sm">Loan Tenure (Years)</label>
                    <input type="number" value={tenure} onChange={e => setTenure(e.target.value)}
                           className="w-full mt-1 bg-black/30 p-2 rounded-md" />
                </div>
            </div>
             {emiResult && (
                <div className="mt-6 text-center bg-black/30 p-4 rounded-lg">
                    <p className="text-lg">Monthly EMI</p>
                    <p className="text-4xl font-bold text-amber-400 my-2">৳ {emiResult}</p>
                </div>
            )}
        </div>
    );
};

export default FinancialCalculator;
