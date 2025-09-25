import React, { useState, useMemo } from 'react';

const EquationSolver: React.FC = () => {
    const [a, setA] = useState('1');
    const [b, setB] = useState('5');
    const [c, setC] = useState('6');

    const roots = useMemo(() => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        const numC = parseFloat(c);

        if (isNaN(numA) || isNaN(numB) || isNaN(numC) || numA === 0) return null;

        const discriminant = numB * numB - 4 * numA * numC;

        if (discriminant > 0) {
            const x1 = (-numB + Math.sqrt(discriminant)) / (2 * numA);
            const x2 = (-numB - Math.sqrt(discriminant)) / (2 * numA);
            return `x₁ = ${x1.toFixed(3)}, x₂ = ${x2.toFixed(3)}`;
        } else if (discriminant === 0) {
            const x = -numB / (2 * numA);
            return `x = ${x.toFixed(3)}`;
        } else {
            return "No real roots";
        }
    }, [a, b, c]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Quadratic Solver (ax² + bx + c = 0)</h3>
            <div className="flex items-center justify-center gap-2">
                <input type="number" value={a} onChange={e => setA(e.target.value)} className="w-16 bg-black/30 p-2 rounded-md" /><span>x² +</span>
                <input type="number" value={b} onChange={e => setB(e.target.value)} className="w-16 bg-black/30 p-2 rounded-md" /><span>x +</span>
                <input type="number" value={c} onChange={e => setC(e.target.value)} className="w-16 bg-black/30 p-2 rounded-md" /><span>= 0</span>
            </div>
             {roots && (
                <div className="mt-6 text-center bg-black/30 p-4 rounded-lg">
                    <p className="text-lg">Roots</p>
                    <p className="text-3xl font-bold text-amber-400 my-2">{roots}</p>
                </div>
            )}
        </div>
    );
};

export default EquationSolver;
