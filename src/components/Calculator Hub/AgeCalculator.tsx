import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

const AgeCalculator: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];
    const [birthDate, setBirthDate] = useState('2000-01-01');
    const [toDate, setToDate] = useState(today);

    const age = useMemo(() => {
        const start = new Date(birthDate);
        const end = new Date(toDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return null;

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
            days += prevMonthLastDay;
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        return `${years} years, ${months} months, ${days} days`;
    }, [birthDate, toDate]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Age Calculator</h3>
            <div className="space-y-4">
                <InputField label="Date of Birth" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
                <InputField label="Age at the Date of" type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
            </div>
            {age && <ResultDisplay label="Your Exact Age is" value={age} />}
        </div>
    );
};

export default AgeCalculator;
