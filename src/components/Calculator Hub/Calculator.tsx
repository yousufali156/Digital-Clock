import React, { useState } from 'react';
import GlassCard from '../GlassCard';

// Import all individual calculator components from the same folder
import AgeCalculator from './AgeCalculator';
import BMICalculator from './BMICalculator';
import CaloriesCalculator from './CaloriesCalculator';
import CurrencyConverter from './CurrencyConverter';
import DateCalculator from './DateCalculator';
import DiscountCalculator from './DiscountCalculator';
import EquationSolver from './EquationSolver';
import FinancialCalculator from './FinancialCalculator';
import FractionCalculator from './FractionCalculator';
import GeneralCalculator from './GeneralCalculator';
import GeometryCalculator from './GeometryCalculator';
import GSTVATCalculator from './GSTVATCalculator';
import HexBinaryConverter from './HexBinaryConverter';
import LoanAffordabilityCalculator from './LoanAffordabilityCalculator';
import MatrixCalculator from './MatrixCalculator';
import MortgageCalculator from './MortgageCalculator';
import PercentageCalculator from './PercentageCalculator';
import ProbabilityCalculator from './ProbabilityCalculator';
import ScientificCalculator from './ScientificCalculator';
import SpeedDistanceTimeCalculator from './SpeedDistanceTimeCalculator';
import TimeCalculator from './TimeCalculator';
import TipCalculator from './TipCalculator';
import UnitConverter from './UnitConverter';

// A dictionary to hold all calculator tabs, their labels, and components.
const CALCULATOR_TABS: Record<string, { label: string; component: JSX.Element }> = {
    general: { label: 'General', component: <GeneralCalculator /> },
    scientific: { label: 'Scientific', component: <ScientificCalculator /> },
    age: { label: 'Age', component: <AgeCalculator /> },
    discount: { label: 'Discount', component: <DiscountCalculator /> },
    tip: { label: 'Tip', component: <TipCalculator /> },
    currency: { label: 'Currency', component: <CurrencyConverter /> },
    time: { label: 'Time', component: <TimeCalculator /> },
    percentage: { label: 'Percentage', component: <PercentageCalculator /> },
    geometry: { label: 'Geometry', component: <GeometryCalculator /> },
    gst_vat: { label: 'GST/VAT', component: <GSTVATCalculator /> },
    speed: { label: 'Speed/Distance', component: <SpeedDistanceTimeCalculator /> },
    hex_binary: { label: 'Base Converter', component: <HexBinaryConverter /> },
    calories: { label: 'Calories', component: <CaloriesCalculator /> },
    mortgage: { label: 'Mortgage', component: <MortgageCalculator /> },
    loan_affordability: { label: 'Loan Affordability', component: <LoanAffordabilityCalculator /> },
    fraction: { label: 'Fractions', component: <FractionCalculator /> },
    probability: { label: 'Probability', component: <ProbabilityCalculator /> },
    bmi: { label: 'BMI', component: <BMICalculator /> },
    unit: { label: 'Unit Converter', component: <UnitConverter /> },
    date: { label: 'Date', component: <DateCalculator /> },
    equation: { label: 'Equation', component: <EquationSolver /> },
    matrix: { label: 'Matrix', component: <MatrixCalculator /> },
};

const Calculator: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    // If the hub is closed, show a simple card to open it.
    if (!isOpen) {
        return (
             <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
                <GlassCard className="p-4 md:p-6 w-full flex flex-col items-center justify-center min-h-[120px]">
                    <h2 className="text-2xl font-bold text-cyan-300 text-center">
                        🧮 Calculator Hub
                    </h2>
                    <p className="text-sm text-white/70 mt-2">Click to open</p>
                </GlassCard>
            </div>
        );
    }

    // If the hub is open, show the full interface with tabs.
    return (
        <GlassCard className="p-4 md:p-6 w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-cyan-300">🧮 Calculator Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-3xl text-red-500 hover:text-red-400">&times;</button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                {Object.entries(CALCULATOR_TABS).map(([key, { label }]) => (
                    <button key={key} onClick={() => setActiveTab(key)}
                        className={`px-3 py-1 text-xs md:text-sm rounded-full transition-colors ${activeTab === key ? 'bg-cyan-500 text-white' : 'bg-[#1e3a5f] hover:bg-cyan-500/50'}`}>
                        {label}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                {CALCULATOR_TABS[activeTab].component}
            </div>
        </GlassCard>
    );
};

export default Calculator;

