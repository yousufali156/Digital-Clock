import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

const MortgageCalculator: React.FC = () => {
    // State for user inputs: loan amount, interest rate, and loan term in years.
    const [amount, setAmount] = useState('2500000');
    const [rate, setRate] = useState('8');
    const [term, setTerm] = useState('20');

    // Creates a formatter object to display numbers as local currency (defaulting to BDT).
    const currencyFormatter = useMemo(() => 
        new Intl.NumberFormat(navigator.language, { 
            style: 'currency', 
            currency: 'BDT', 
            minimumFractionDigits: 2 
        }), 
    []);

    // useMemo calculates the monthly payment only when the inputs change.
    const result = useMemo(() => {
        const principal = parseFloat(amount);
        const monthlyInterestRate = parseFloat(rate) / 100 / 12;
        const numberOfPayments = parseFloat(term) * 12;

        // Validate inputs before calculation.
        if(isNaN(principal) || isNaN(monthlyInterestRate) || isNaN(numberOfPayments) || principal <= 0 || monthlyInterestRate < 0 || numberOfPayments <= 0) {
            return null;
        }

        // Standard formula to calculate monthly mortgage payment.
        const monthlyPayment = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        
        // Return the formatted currency string.
        return currencyFormatter.format(monthlyPayment);

    }, [amount, rate, term, currencyFormatter]);
    
    return (
         <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Mortgage Calculator</h3>
            <div className="space-y-4">
                <InputField label="Loan Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                <InputField label="Annual Interest Rate (%)" value={rate} onChange={e => setRate(e.target.value)} />
                <InputField label="Loan Term (Years)" value={term} onChange={e => setTerm(e.target.value)} />
            </div>
            {result && <ResultDisplay label="Your Monthly Payment" value={result} />}
        </div>
    );
};

export default MortgageCalculator;

