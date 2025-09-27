import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

// A helper function to find the Greatest Common Divisor (GCD) to simplify fractions.
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

const FractionCalculator: React.FC = () => {
    // State for the numerators and denominators of the two fractions.
    const [n1, setN1] = useState('1');
    const [d1, setD1] = useState('2');
    const [n2, setN2] = useState('3');
    const [d2, setD2] = useState('4');
    // State for the selected mathematical operation.
    const [op, setOp] = useState('+');

    // useMemo calculates the result only when the inputs or operation change.
    const result = useMemo(() => {
        const num1 = parseInt(n1);
        const den1 = parseInt(d1);
        const num2 = parseInt(n2);
        const den2 = parseInt(d2);

        // Validate the inputs to ensure they are numbers and denominators are not zero.
        if(isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2) || den1 === 0 || den2 === 0) {
            return "Invalid Input";
        }
        
        let resN, resD;

        // Perform calculation based on the selected operator.
        switch(op) {
            case '+':
                resN = num1 * den2 + num2 * den1;
                resD = den1 * den2;
                break;
            case '-':
                resN = num1 * den2 - num2 * den1;
                resD = den1 * den2;
                break;
            case '*':
                resN = num1 * num2;
                resD = den1 * den2;
                break;
            case '/':
                if (num2 === 0) return "Cannot divide by zero";
                resN = num1 * den2;
                resD = den1 * num2;
                break;
            default:
                return "Invalid Operation";
        }
        
        // Simplify the resulting fraction by dividing by the GCD.
        const commonDivisor = gcd(Math.abs(resN), Math.abs(resD));
        return `${resN / commonDivisor} / ${resD / commonDivisor}`;

    }, [n1, d1, n2, d2, op]);

    // A small component to render the fraction input fields.
    const FractionInput = ({ n, d, onNChange, onDChange }) => (
        <div className="flex flex-col items-center">
            <input type="number" value={n} onChange={onNChange} className="w-20 bg-black/30 text-center text-xl text-white rounded-md p-2"/>
            <hr className="w-24 my-1 border-cyan-400" />
            <input type="number" value={d} onChange={onDChange} className="w-20 bg-black/30 text-center text-xl text-white rounded-md p-2"/>
        </div>
    );

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Fraction Calculator</h3>
            <div className="flex items-center justify-center gap-4">
                <FractionInput n={n1} d={d1} onNChange={e => setN1(e.target.value)} onDChange={e => setD1(e.target.value)} />
                
                <select value={op} onChange={e => setOp(e.target.value)} className="bg-black/30 p-2 rounded-md text-xl">
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>
                
                <FractionInput n={n2} d={d2} onNChange={e => setN2(e.target.value)} onDChange={e => setD2(e.target.value)} />
            </div>
            {result && <ResultDisplay label="Result" value={result} />}
        </div>
    );
};

export default FractionCalculator;

