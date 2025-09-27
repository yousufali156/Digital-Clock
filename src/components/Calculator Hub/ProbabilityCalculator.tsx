import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

const ProbabilityCalculator: React.FC = () => {
    // State for user inputs: total items (n) and items to choose (r).
    const [n, setN] = useState('10');
    const [r, setR] = useState('3');
    // State to switch between permutation and combination mode.
    const [mode, setMode] = useState<'permutation' | 'combination'>('permutation');

    // useMemo calculates the result only when the inputs or mode change.
    const result = useMemo(() => {
        const numN = parseInt(n);
        const numR = parseInt(r);

        // Validate inputs to ensure they are valid numbers for calculation.
        if(isNaN(numN) || isNaN(numR) || numN < numR || numN < 0 || numR < 0) {
            return "Invalid input (n ≥ r ≥ 0)";
        }

        // Helper function to calculate factorial.
        const factorial = (num: number): number => {
            if (num < 0) return -1; // Factorial for negative numbers is not defined.
            if (num === 0) return 1;
            let result = 1;
            for (let i = 2; i <= num; i++) {
                result *= i;
            }
            return result;
        };
        
        // Calculate based on the selected mode.
        if(mode === 'permutation') {
            // Formula for Permutation: nPr = n! / (n-r)!
            const permutation = factorial(numN) / factorial(numN - numR);
            return permutation.toLocaleString(); // Format with commas for readability.
        } else { // Combination
            // Formula for Combination: nCr = n! / (r! * (n-r)!)
            const combination = factorial(numN) / (factorial(numR) * factorial(numN - numR));
            return combination.toLocaleString();
        }

    }, [n, r, mode]);

    return (
         <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Probability Calculator</h3>
            <div className="flex justify-center gap-2 mb-4">
                <button 
                    onClick={() => setMode('permutation')} 
                    className={`px-3 py-1 text-sm rounded-full ${mode === 'permutation' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}
                >
                    Permutation (nPr)
                </button>
                <button 
                    onClick={() => setMode('combination')} 
                    className={`px-3 py-1 text-sm rounded-full ${mode === 'combination' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}
                >
                    Combination (nCr)
                </button>
            </div>
             <div className="space-y-4">
                <InputField label="Total number of items (n)" value={n} onChange={e => setN(e.target.value)} />
                <InputField label="Number of items to choose (r)" value={r} onChange={e => setR(e.target.value)} />
            </div>
            {result && <ResultDisplay label="Result" value={result} />}
        </div>
    );
};

export default ProbabilityCalculator;

