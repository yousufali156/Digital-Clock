import React, { useState, useMemo } from 'react';
import GlassCard from './GlassCard';

// --- Sub-Component: General Calculator ---
const GeneralCalculator: React.FC = () => {
    const [input, setInput] = useState('');
    const handleClick = (value: string) => { if (input === "Error") { setInput(value); } else { setInput((prev) => prev + value); } };
    const calculate = () => { try { setInput(String(eval(input.replace(/%/g, '/100')))); } catch { setInput("Error"); } };
    const clear = () => setInput("");
    const backspace = () => setInput(prev => prev.slice(0, -1));
    const buttons = ["C", "DEL", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "00", "0", ".", "="];
    
    return (
        <div className="bg-[#102a43] p-4 rounded-2xl shadow-lg max-w-xs mx-auto">
            <div className="bg-black/50 text-amber-300 text-right p-4 rounded-md mb-4 font-mono text-3xl break-all h-20 flex items-end justify-end">{input || "0"}</div>
            <div className="grid grid-cols-4 gap-2">
                {buttons.map((btn) => (
                    <button key={btn}
                        onClick={() => {
                            if (btn === 'C') clear();
                            else if (btn === 'DEL') backspace();
                            else if (btn === '=') calculate();
                            else handleClick(btn);
                        }}
                        className={`p-4 rounded-lg text-white font-bold text-xl transition-colors ${
                            btn === '=' ? 'bg-amber-500 hover:bg-amber-600' : 
                            ['C', 'DEL'].includes(btn) ? 'bg-red-600 hover:bg-red-700' :
                            ['/', '*', '-', '+', '%'].includes(btn) ? 'bg-[#275080] hover:bg-[#1e3a5f] text-cyan-300' :
                            'bg-[#1e3a5f] hover:bg-[#275080]'
                        }`}>
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- Sub-Component: Scientific Calculator ---
const ScientificCalculator: React.FC = () => {
    const [input, setInput] = useState('');
    const handleClick = (value: string) => { setInput(prev => prev + value); };
    const calculate = () => { try { let exp = input.replace(/sin\(/g, 'Math.sin(Math.PI/180*').replace(/cos\(/g, 'Math.cos(Math.PI/180*').replace(/tan\(/g, 'Math.tan(Math.PI/180*').replace(/log\(/g, 'Math.log10(').replace(/ln\(/g, 'Math.log(').replace(/√/g, 'Math.sqrt').replace(/π/g, 'Math.PI').replace(/e/g, 'Math.E').replace(/\^/g, '**'); setInput(eval(exp).toString()); } catch { setInput("Error"); } };
    const clear = () => setInput("");
    const backspace = () => setInput(prev => prev.slice(0, -1));
    const sciButtons = [ 'sin(', 'cos(', 'tan(', 'log(', 'ln(', '√(', ')', '^', 'π', 'e' ];
    const numButtons = ["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"];
    return (
        <div className="bg-[#102a43] p-4 rounded-2xl shadow-lg max-w-sm mx-auto">
            <div className="bg-black/50 text-amber-300 text-right p-4 rounded-md mb-4 font-mono text-2xl break-all h-16 flex items-end justify-end">{input || "0"}</div>
            <div className="grid grid-cols-5 gap-2"> {sciButtons.map((btn) => <button key={btn} onClick={() => handleClick(btn)} className="p-3 rounded-lg text-white font-bold text-md bg-[#275080] hover:bg-[#1e3a5f] transition-colors">{btn}</button>)} </div>
            <div className="grid grid-cols-4 gap-2 mt-2"> {numButtons.map((btn) => <button key={btn} onClick={() => (btn === "=" ? calculate() : handleClick(btn))} className={`p-3 rounded-lg text-white font-bold text-xl transition-colors ${btn === '=' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#1e3a5f] hover:bg-[#275080]'}`}>{btn}</button>)} </div>
            <div className="grid grid-cols-2 gap-2 mt-2"> <button onClick={clear} className="bg-red-600 hover:bg-red-700 p-2 rounded-lg text-white font-bold text-lg">Clear</button> <button onClick={backspace} className="bg-[#1e3a5f] hover:bg-[#275080] p-2 rounded-lg text-white font-bold text-lg">DEL</button> </div>
        </div>
    );
};

// --- Sub-Component: BMI Calculator ---
const BMICalculator: React.FC = () => {
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
    const bmiResult = useMemo(() => { const h = parseFloat(height); const w = parseFloat(weight); if (!h || !w || h <= 0 || w <= 0) return null; let bmi; if (unit === 'metric') { bmi = w / ((h / 100) ** 2); } else { bmi = (w / (h ** 2)) * 703; } let category = ''; if (bmi < 18.5) category = 'Underweight'; else if (bmi <= 24.9) category = 'Normal weight'; else if (bmi <= 29.9) category = 'Overweight'; else category = 'Obesity'; return { value: bmi.toFixed(1), category }; }, [height, weight, unit]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="flex justify-center mb-4"> <button onClick={() => setUnit('metric')} className={`px-4 py-2 rounded-l-lg ${unit === 'metric' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Metric</button> <button onClick={() => setUnit('imperial')} className={`px-4 py-2 rounded-r-lg ${unit === 'imperial' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Imperial</button> </div>
            <div className="space-y-4"> <div> <label className="block text-sm font-medium text-cyan-300">Height ({unit === 'metric' ? 'cm' : 'inches'})</label> <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400" /> </div> <div> <label className="block text-sm font-medium text-cyan-300">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label> <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400" /> </div> </div>
            {bmiResult && ( <div className="mt-6 text-center bg-black/30 p-4 rounded-lg"> <p className="text-lg">Your BMI is</p> <p className="text-5xl font-bold text-amber-400 my-2">{bmiResult.value}</p> <p className="font-semibold text-cyan-300">{bmiResult.category}</p> </div> )}
        </div>
    );
};

// --- Sub-Component: Unit Converter ---
const UnitConverter: React.FC = () => {
    const CONVERSIONS = { length: { 'm': 1, 'cm': 0.01, 'km': 1000, 'in': 0.0254, 'ft': 0.3048, 'mi': 1609.34 }, weight: { 'kg': 1, 'g': 0.001, 'lb': 0.453592, 'oz': 0.0283495 }, temperature: { C: { F: (c: number) => c * 9/5 + 32, K: (c: number) => c + 273.15 }, F: { C: (f: number) => (f - 32) * 5/9, K: (f: number) => (f - 32) * 5/9 + 273.15 }, K: { C: (k: number) => k - 273.15, F: (k: number) => (k - 273.15) * 9/5 + 32 } } };
    const [category, setCategory] = useState<'length' | 'weight' | 'temperature'>('length');
    const [fromUnit, setFromUnit] = useState('m');
    const [toUnit, setToUnit] = useState('ft');
    const [inputValue, setInputValue] = useState('1');
    const units = Object.keys(CONVERSIONS[category]);
    const result = useMemo(() => { const value = parseFloat(inputValue); if (isNaN(value)) return ''; if (fromUnit === toUnit) return value.toString(); if (category === 'temperature') { return CONVERSIONS.temperature[fromUnit][toUnit](value).toFixed(2); } else { const baseValue = value * CONVERSIONS[category][fromUnit]; const finalValue = baseValue / CONVERSIONS[category][toUnit]; return finalValue.toFixed(4); } }, [inputValue, fromUnit, toUnit, category]);
    const handleCategoryChange = (cat: 'length' | 'weight' | 'temperature') => { setCategory(cat); if (cat === 'length') { setFromUnit('m'); setToUnit('ft'); } if (cat === 'weight') { setFromUnit('kg'); setToUnit('lb'); } if (cat === 'temperature') { setFromUnit('C'); setToUnit('F'); } };
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-md mx-auto text-white">
            <div className="flex justify-center gap-2 mb-4"> <button onClick={() => handleCategoryChange('length')} className={`px-3 py-1 text-sm rounded-full ${category === 'length' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Length</button> <button onClick={() => handleCategoryChange('weight')} className={`px-3 py-1 text-sm rounded-full ${category === 'weight' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Weight</button> <button onClick={() => handleCategoryChange('temperature')} className={`px-3 py-1 text-sm rounded-full ${category === 'temperature' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Temperature</button> </div>
            <div className="flex items-center gap-4">
                <div className="w-1/2"> <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} className="w-full bg-black/30 p-2 rounded-md border border-cyan-500/30" /> <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="w-full mt-2 bg-[#1e3a5f] p-2 rounded-md"> {units.map(u => <option key={u} value={u}>{u}</option>)} </select> </div>
                <div className="w-1/2"> <input type="text" value={result} readOnly className="w-full bg-black/50 p-2 rounded-md border border-cyan-500/50 text-amber-300" /> <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="w-full mt-2 bg-[#1e3a5f] p-2 rounded-md"> {units.map(u => <option key={u} value={u}>{u}</option>)} </select> </div>
            </div>
        </div>
    );
};

// --- Sub-Component: Financial Calculator ---
const FinancialCalculator: React.FC = () => {
    const [mode, setMode] = useState<'emi' | 'simple' | 'compound'>('emi');
    // Common state for all modes
    const [principal, setPrincipal] = useState('100000');
    const [rate, setRate] = useState('8.5');
    const [tenure, setTenure] = useState('10');

    const currencyFormatter = useMemo(() => new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'BDT', minimumFractionDigits: 2 }), []);

    const result = useMemo(() => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(tenure);
        if (isNaN(p) || isNaN(r) || isNaN(t)) return null;

        if (mode === 'emi') {
            const monthlyRate = r / 12;
            const numberOfMonths = t * 12;
            if (monthlyRate === 0) return (p / numberOfMonths);
            const emi = (p * monthlyRate * (1 + monthlyRate) ** numberOfMonths) / ((1 + monthlyRate) ** numberOfMonths - 1);
            return { label: 'Monthly EMI', value: currencyFormatter.format(emi) };
        } else if (mode === 'simple') {
            const interest = p * r * t;
            return { label: 'Total Interest', value: currencyFormatter.format(interest) };
        } else if (mode === 'compound') {
            const amount = p * (1 + r) ** t;
            return { label: 'Total Amount', value: currencyFormatter.format(amount) };
        }
        return null;
    }, [principal, rate, tenure, mode, currencyFormatter]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="flex justify-center gap-2 mb-4 border-b border-cyan-500/20 pb-4">
                <button onClick={() => setMode('emi')} className={`px-3 py-1 text-sm rounded-full ${mode === 'emi' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>EMI</button>
                <button onClick={() => setMode('simple')} className={`px-3 py-1 text-sm rounded-full ${mode === 'simple' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Simple Interest</button>
                <button onClick={() => setMode('compound')} className={`px-3 py-1 text-sm rounded-full ${mode === 'compound' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Compound</button>
            </div>
            <div className="space-y-4">
                <div> <label className="text-sm">Principal Amount</label> <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md" /> </div>
                <div> <label className="text-sm">Annual Interest Rate (%)</label> <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md" /> </div>
                <div> <label className="text-sm">Time Period (Years)</label> <input type="number" value={tenure} onChange={e => setTenure(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md" /> </div>
            </div>
            {result && ( <div className="mt-6 text-center bg-black/30 p-4 rounded-lg"> <p className="text-lg">{result.label}</p> <p className="text-4xl font-bold text-amber-400 my-2">{result.value}</p> </div> )}
        </div>
    );
};

// --- Sub-Component: Date Calculator ---
const DateCalculator: React.FC = () => {
    const [mode, setMode] = useState<'between' | 'age'>('between');
    const today = new Date().toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);
    const [birthDate, setBirthDate] = useState('2000-01-01');

    const result = useMemo(() => {
        if (mode === 'between') {
            const start = new Date(fromDate); const end = new Date(toDate); if (isNaN(start.getTime()) || isNaN(end.getTime())) return null; const diffTime = Math.abs(end.getTime() - start.getTime()); const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); return { label: 'Difference', value: `${diffDays} days`};
        } else { // age calculator
            const birth = new Date(birthDate); const now = new Date(); if(isNaN(birth.getTime())) return null; let years = now.getFullYear() - birth.getFullYear(); let months = now.getMonth() - birth.getMonth(); let days = now.getDate() - birth.getDate(); if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); } if (months < 0) { years--; months += 12; } return { label: 'Your Age Is', value: `${years}y ${months}m ${days}d` };
        }
    }, [fromDate, toDate, birthDate, mode]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="flex justify-center gap-2 mb-4 border-b border-cyan-500/20 pb-4">
                <button onClick={() => setMode('between')} className={`px-3 py-1 text-sm rounded-full ${mode === 'between' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Days Between</button>
                <button onClick={() => setMode('age')} className={`px-3 py-1 text-sm rounded-full ${mode === 'age' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Age Calculator</button>
            </div>
            {mode === 'between' ? (
                <div className="space-y-4"> <div> <label className="text-sm">From Date</label> <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md" /> </div> <div> <label className="text-sm">To Date</label> <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md" /> </div> </div>
            ) : (
                <div> <label className="text-sm">Your Date of Birth</label> <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md" /> </div>
            )}
            {result && ( <div className="mt-6 text-center bg-black/30 p-4 rounded-lg"> <p className="text-lg">{result.label}</p> <p className="text-4xl font-bold text-amber-400 my-2">{result.value}</p> </div> )}
        </div>
    );
};

// --- Sub-Component: Equation Solver ---
const EquationSolver: React.FC = () => {
    const [a, setA] = useState('1');
    const [b, setB] = useState('5');
    const [c, setC] = useState('6');
    const roots = useMemo(() => { const numA = parseFloat(a); const numB = parseFloat(b); const numC = parseFloat(c); if (isNaN(numA) || isNaN(numB) || isNaN(numC) || numA === 0) return null; const discriminant = numB * numB - 4 * numA * numC; if (discriminant > 0) { const x1 = (-numB + Math.sqrt(discriminant)) / (2 * numA); const x2 = (-numB - Math.sqrt(discriminant)) / (2 * numA); return `x₁ = ${x1.toFixed(3)}, x₂ = ${x2.toFixed(3)}`; } else if (discriminant === 0) { const x = -numB / (2 * numA); return `x = ${x.toFixed(3)}`; } else { return "No real roots"; } }, [a, b, c]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Quadratic Solver (ax² + bx + c = 0)</h3>
            <div className="flex items-center justify-center gap-2"> <input type="number" value={a} onChange={e => setA(e.target.value)} className="w-16 bg-black/30 p-2 rounded-md" /><span>x² +</span> <input type="number" value={b} onChange={e => setB(e.target.value)} className="w-16 bg-black/30 p-2 rounded-md" /><span>x +</span> <input type="number" value={c} onChange={e => setC(e.target.value)} className="w-16 bg-black/30 p-2 rounded-md" /><span>= 0</span> </div>
            {roots && ( <div className="mt-6 text-center bg-black/30 p-4 rounded-lg"> <p className="text-lg">Roots</p> <p className="text-3xl font-bold text-amber-400 my-2">{roots}</p> </div> )}
        </div>
    );
};

// --- Sub-Component: Matrix Calculator ---
type Matrix = [[number, number], [number, number]];
const MatrixCalculator: React.FC = () => {
    const [matrixA, setMatrixA] = useState<Matrix>([[1, 2], [3, 4]]);
    const [matrixB, setMatrixB] = useState<Matrix>([[5, 6], [7, 8]]);
    const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply'>('add');
    const handleMatrixChange = (matrix: 'A' | 'B', row: number, col: number, value: string) => { const newMatrix: Matrix = matrix === 'A' ? [...matrixA] : [...matrixB]; newMatrix[row][col] = parseFloat(value) || 0; if (matrix === 'A') { setMatrixA(newMatrix); } else { setMatrixB(newMatrix); } };
    const resultMatrix = useMemo<Matrix>(() => { const res: Matrix = [[0, 0], [0, 0]]; for (let i = 0; i < 2; i++) { for (let j = 0; j < 2; j++) { if (operation === 'add') { res[i][j] = matrixA[i][j] + matrixB[i][j]; } else if (operation === 'subtract') { res[i][j] = matrixA[i][j] - matrixB[i][j]; } else if (operation === 'multiply') { res[i][j] = matrixA[i][0] * matrixB[0][j] + matrixA[i][1] * matrixB[1][j]; } } } return res; }, [matrixA, matrixB, operation]);
    const MatrixInput = ({ matrix, matrixName, onChange }: { matrix: Matrix, matrixName: 'A' | 'B', onChange: Function }) => ( <div className="flex flex-col items-center"> <p className="text-lg font-bold mb-2 text-cyan-300">Matrix {matrixName}</p> <div className="grid grid-cols-2 gap-2 p-2 bg-black/30 rounded-md"> {matrix.map((row, i) => row.map((cell, j) => ( <input key={`${matrixName}-${i}-${j}`} type="number" value={cell} onChange={(e) => onChange(matrixName, i, j, e.target.value)} className="w-16 h-16 bg-[#1e3a5f] text-center text-xl text-white rounded-md" /> )))} </div> </div> );
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-lg mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">2x2 Matrix Calculator</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <MatrixInput matrix={matrixA} matrixName="A" onChange={handleMatrixChange} />
                <div className="flex md:flex-col gap-2"> <button onClick={() => setOperation('add')} className={`p-2 rounded-full ${operation === 'add' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>+</button> <button onClick={() => setOperation('subtract')} className={`p-2 rounded-full ${operation === 'subtract' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>-</button> <button onClick={() => setOperation('multiply')} className={`p-2 rounded-full ${operation === 'multiply' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>×</button> </div>
                <MatrixInput matrix={matrixB} matrixName="B" onChange={handleMatrixChange} />
            </div>
            <div className="mt-6 text-center"> <p className="text-lg font-bold text-amber-400">Result</p> <div className="p-4 bg-black/50 rounded-lg inline-block mt-2"> <div className="grid grid-cols-2 gap-2"> {resultMatrix.map((row, i) => row.map((cell, j) => ( <div key={`res-${i}-${j}`} className="w-16 h-16 flex items-center justify-center text-xl font-bold bg-[#102a43] rounded-md">{cell}</div> )))} </div> </div> </div>
        </div>
    );
};

// --- Sub-Component: Programmer Calculator ---
const ProgrammerCalculator: React.FC = () => {
    const [number, setNumber] = useState('10');
    const result = useMemo(() => {
        const dec = parseInt(number, 10);
        if (isNaN(dec)) return { dec: 'Invalid', bin: 'Invalid', hex: 'Invalid', oct: 'Invalid' };
        return {
            dec: dec.toString(10),
            bin: dec.toString(2),
            hex: dec.toString(16).toUpperCase(),
            oct: dec.toString(8),
        };
    }, [number]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-md mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Programmer Calculator</h3>
            <div>
                <label className="text-sm">Decimal Input</label>
                <input type="number" value={number} onChange={e => setNumber(e.target.value)}
                    className="w-full mt-1 bg-black/30 p-3 rounded-md font-mono text-lg"
                />
            </div>
            <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center bg-black/20 p-2 rounded-md"> <span className="font-bold">Binary</span> <span className="font-mono text-amber-300 break-all">{result.bin}</span> </div>
                <div className="flex justify-between items-center bg-black/20 p-2 rounded-md"> <span className="font-bold">Hexadecimal</span> <span className="font-mono text-amber-300">{result.hex}</span> </div>
                <div className="flex justify-between items-center bg-black/20 p-2 rounded-md"> <span className="font-bold">Octal</span> <span className="font-mono text-amber-300">{result.oct}</span> </div>
            </div>
        </div>
    );
};

// --- Main Calculator Hub Component ---
const CALCULATOR_TABS: Record<string, { label: string; component: JSX.Element }> = {
    general: { label: 'General', component: <GeneralCalculator /> },
    scientific: { label: 'Scientific', component: <ScientificCalculator /> },
    programmer: { label: 'Programmer', component: <ProgrammerCalculator /> },
    bmi: { label: 'BMI', component: <BMICalculator /> },
    unit: { label: 'Converter', component: <UnitConverter /> },
    finance: { label: 'Finance', component: <FinancialCalculator /> },
    date: { label: 'Date', component: <DateCalculator /> },
    equation: { label: 'Equation', component: <EquationSolver /> },
    matrix: { label: 'Matrix', component: <MatrixCalculator /> },
};

const Calculator: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

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

    return (
        <GlassCard className="p-4 md:p-6 w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-cyan-300">🧮 Calculator Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-3xl text-red-500 hover:text-red-400">&times;</button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                {Object.entries(CALCULATOR_TABS).map(([key, { label }]) => (
                    <button key={key} onClick={() => setActiveTab(key)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${activeTab === key ? 'bg-cyan-500 text-white' : 'bg-[#1e3a5f] hover:bg-cyan-500/50'}`}>
                        {label}
                    </button>
                ))}
            </div>
            <div className="mt-4"> {CALCULATOR_TABS[activeTab].component} </div>
        </GlassCard>
    );
};

export default Calculator;

