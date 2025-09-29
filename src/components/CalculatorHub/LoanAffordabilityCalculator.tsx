import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

const LoanAffordabilityCalculator: React.FC = () => {
    // State for user inputs: income, debts, interest rate, and loan term.
    const [income, setIncome] = useState('80000');
    const [debt, setDebt] = useState('15000');
    const [rate, setRate] = useState('9');
    const [term, setTerm] = useState('15');
    
    // Creates a formatter object to display numbers as local currency.
    const currencyFormatter = useMemo(() => new Intl.NumberFormat(navigator.language, { 
        style: 'currency', 
        currency: 'BDT', // Defaulting to BDT, can be made more dynamic
        maximumFractionDigits: 0 
    }), []);
    
    // useMemo calculates the result only when the inputs change.
    const result = useMemo(() => {
        const i = parseFloat(income);
        const d = parseFloat(debt);
        const monthlyRate = parseFloat(rate) / 100 / 12;
        const numberOfMonths = parseFloat(term) * 12;

        if(isNaN(i) || isNaN(d) || isNaN(monthlyRate) || isNaN(numberOfMonths)) return null;

        // A common rule is that your total debt (including the new loan) shouldn't exceed 36% of your income.
        const maxMonthlyPayment = (i * 0.36) - d; 
        
        if(maxMonthlyPayment <= 0) {
            return "Based on your income and debts, a new loan is likely not affordable.";
        }
        
        // This formula calculates the maximum loan principal based on the affordable monthly payment.
        const maxLoan = maxMonthlyPayment * ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)));
        
        return currencyFormatter.format(maxLoan);

    }, [income, debt, rate, term, currencyFormatter]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Loan Affordability Calculator</h3>
             <div className="space-y-4">
                <InputField label="Gross Monthly Income" value={income} onChange={e => setIncome(e.target.value)} />
                <InputField label="Total Monthly Debts (other loans)" value={debt} onChange={e => setDebt(e.target.value)} />
                <InputField label="Annual Interest Rate (%)" value={rate} onChange={e => setRate(e.target.value)} />
                <InputField label="Loan Term (Years)" value={term} onChange={e => setTerm(e.target.value)} />
            </div>
            {result && <ResultDisplay label="You can afford a loan of approx." value={result} />}
        </div>
    );
};

export default LoanAffordabilityCalculator;

