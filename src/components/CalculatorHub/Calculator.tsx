import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';

// --- Reusable Helper Components for Calculators ---
// This reusable component creates a standardized input field for the calculators.
const InputField = ({ label, value, onChange, unit, type = "number", placeholder = "" }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, unit?: string, type?: string, placeholder?: string }) => (
    <div>
        <label className="text-sm text-cyan-300">{label}</label>
        <div className="flex items-center">
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full mt-1 bg-black/30 p-2 rounded-md border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            {unit && <span className="ml-2 text-cyan-300">{unit}</span>}
        </div>
    </div>
);

// This reusable component displays the result of calculations in a standard format.
const ResultDisplay = ({ label, value, subValue = "" }: { label: string, value: string, subValue?: string }) => (
    <div className="mt-6 text-center bg-black/30 p-4 rounded-lg">
        <p className="text-lg">{label}</p>
        <p className="text-4xl font-bold text-amber-400 my-2 break-words">{value}</p>
        {subValue && <p className="text-sm text-cyan-300">{subValue}</p>}
    </div>
);


// --- All 22 Individual Calculator Components ---

const GeneralCalculator: React.FC = () => {
    const [input, setInput] = useState('');
    const handleClick = (value: string) => { if (input === "Error") { setInput(value); } else { setInput((prev) => prev + value); } };
    const calculate = () => { try { setInput(String(new Function('return ' + input.replace(/%/g, '/100'))())); } catch { setInput("Error"); } };
    const clear = () => setInput("");
    const backspace = () => setInput(prev => prev.slice(0, -1));
    const buttons = ["C", "DEL", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "00", "0", ".", "="];
    return (
        <div className="bg-[#102a43] p-4 rounded-2xl shadow-lg max-w-xs mx-auto">
            <div className="bg-black/50 text-amber-300 text-right p-4 rounded-md mb-4 font-mono text-3xl break-all h-20 flex items-end justify-end">{input || "0"}</div>
            <div className="grid grid-cols-4 gap-2">
                {buttons.map((btn) => (
                    <button key={btn} onClick={() => { if (btn === 'C') clear(); else if (btn === 'DEL') backspace(); else if (btn === '=') calculate(); else handleClick(btn); }}
                        className={`p-4 rounded-lg text-white font-bold text-xl transition-colors ${btn === '=' ? 'bg-amber-500 hover:bg-amber-600' : ['C', 'DEL'].includes(btn) ? 'bg-red-600 hover:bg-red-700' : ['/', '*', '-', '+', '%'].includes(btn) ? 'bg-[#275080] hover:bg-[#1e3a5f] text-cyan-300' : 'bg-[#1e3a5f] hover:bg-[#275080]'}`}>
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
};

const ScientificCalculator: React.FC = () => {
    const [input, setInput] = useState('');
    const handleClick = (value: string) => { setInput(prev => prev + value); };
    const calculate = () => { try { let exp = input.replace(/sin\(/g, 'Math.sin(Math.PI/180*').replace(/cos\(/g, 'Math.cos(Math.PI/180*').replace(/tan\(/g, 'Math.tan(Math.PI/180*').replace(/log\(/g, 'Math.log10(').replace(/ln\(/g, 'Math.log(').replace(/√/g, 'Math.sqrt').replace(/π/g, 'Math.PI').replace(/e/g, 'Math.E').replace(/\^/g, '**'); setInput(new Function('return ' + exp)().toString()); } catch { setInput("Error"); } };
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

const AgeCalculator: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];
    const [birthDate, setBirthDate] = useState('2000-01-01');
    const [toDate, setToDate] = useState(today);
    const age = useMemo(() => { const start = new Date(birthDate); const end = new Date(toDate); if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return null; let years = end.getFullYear() - start.getFullYear(); let months = end.getMonth() - start.getMonth(); let days = end.getDate() - start.getDate(); if (days < 0) { months--; days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); } if (months < 0) { years--; months += 12; } return `${years} years, ${months} months, ${days} days`; }, [birthDate, toDate]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="space-y-4"> <InputField label="Date of Birth" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} /> <InputField label="Age at the Date of" type="date" value={toDate} onChange={e => setToDate(e.target.value)} /> </div>
            {age && <ResultDisplay label="Your Exact Age is" value={age} />}
        </div>
    );
};

const DiscountCalculator: React.FC = () => {
    const [price, setPrice] = useState('1000');
    const [discount, setDiscount] = useState('15');
    const [tax, setTax] = useState('5');
    const result = useMemo(() => { const p = parseFloat(price); const d = parseFloat(discount); const t = parseFloat(tax); if (isNaN(p) || isNaN(d) || isNaN(t)) return null; const saved = p * (d / 100); const priceAfterDiscount = p - saved; const taxAmount = priceAfterDiscount * (t / 100); const finalPrice = priceAfterDiscount + taxAmount; return { finalPrice: finalPrice.toFixed(2), saved: saved.toFixed(2) }; }, [price, discount, tax]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="space-y-4"> <InputField label="Original Price" value={price} onChange={e => setPrice(e.target.value)} /> <InputField label="Discount (%)" value={discount} onChange={e => setDiscount(e.target.value)} /> <InputField label="Tax (%)" value={tax} onChange={e => setTax(e.target.value)} /> </div>
            {result && <ResultDisplay label="Final Price" value={result.finalPrice} subValue={`You saved ${result.saved}`} />}
        </div>
    );
};

const TipCalculator: React.FC = () => {
    const [bill, setBill] = useState('1250');
    const [tip, setTip] = useState('10');
    const [people, setPeople] = useState('4');
    const result = useMemo(() => { const b = parseFloat(bill); const t = parseFloat(tip); const p = parseInt(people); if (isNaN(b) || isNaN(t) || isNaN(p) || p <= 0) return null; const tipAmount = b * (t / 100); const totalAmount = b + tipAmount; const perPerson = totalAmount / p; return { total: totalAmount.toFixed(2), perPerson: perPerson.toFixed(2) }; }, [bill, tip, people]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="space-y-4"> <InputField label="Total Bill" value={bill} onChange={e => setBill(e.target.value)} /> <InputField label="Tip Percentage (%)" value={tip} onChange={e => setTip(e.target.value)} /> <InputField label="Number of People" value={people} onChange={e => setPeople(e.target.value)} /> </div>
            {result && <ResultDisplay label="Each Person Pays" value={result.perPerson} subValue={`Total Bill: ${result.total}`} />}
        </div>
    );
};

const CurrencyConverter: React.FC = () => {
    const RATES: Record<string, number> = { 'USD': 1.0, 'BDT': 117.50, 'INR': 83.50, 'EUR': 0.92, 'GBP': 0.79 };
    const [amount, setAmount] = useState('100');
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('BDT');
    const result = useMemo(() => { const amt = parseFloat(amount); if (isNaN(amt)) return null; const resultValue = (amt / RATES[from]) * RATES[to]; return resultValue.toFixed(2); }, [amount, from, to]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="space-y-4"> <InputField label="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                <div className="flex gap-4">
                    <div className="w-1/2"> <label className="text-sm">From</label> <select value={from} onChange={e => setFrom(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md"> {Object.keys(RATES).map(curr => <option key={curr} value={curr}>{curr}</option>)} </select> </div>
                    <div className="w-1/2"> <label className="text-sm">To</label> <select value={to} onChange={e => setTo(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md"> {Object.keys(RATES).map(curr => <option key={curr} value={curr}>{curr}</option>)} </select> </div>
                </div>
            </div>
            {result && <ResultDisplay label={`Converted Amount`} value={`${result} ${to}`} />}
        </div>
    );
};

const TimeCalculator: React.FC = () => {
    const [h1, setH1] = useState('10'); const [m1, setM1] = useState('30'); const [s1, setS1] = useState('0'); const [h2, setH2] = useState('2'); const [m2, setM2] = useState('15'); const [s2, setS2] = useState('0'); const [op, setOp] = useState<'add' | 'subtract'>('add');
    const result = useMemo(() => { const totalSec1 = parseInt(h1)*3600 + parseInt(m1)*60 + parseInt(s1); const totalSec2 = parseInt(h2)*3600 + parseInt(m2)*60 + parseInt(s2); if(isNaN(totalSec1) || isNaN(totalSec2)) return null; const totalResultSec = op === 'add' ? totalSec1 + totalSec2 : totalSec1 - totalSec2; if(totalResultSec < 0) return "Negative Time"; const hours = Math.floor(totalResultSec / 3600); const minutes = Math.floor((totalResultSec % 3600) / 60); const seconds = totalResultSec % 60; return `${hours}h ${minutes}m ${seconds}s`; }, [h1, m1, s1, h2, m2, s2, op]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="grid grid-cols-3 gap-2"> <InputField label="H" value={h1} onChange={e => setH1(e.target.value)} /> <InputField label="M" value={m1} onChange={e => setM1(e.target.value)} /> <InputField label="S" value={s1} onChange={e => setS1(e.target.value)} /> </div>
            <div className="flex justify-center my-2"> <button onClick={() => setOp('add')} className={`px-4 py-1 text-lg rounded-l-lg ${op === 'add' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>+</button> <button onClick={() => setOp('subtract')} className={`px-4 py-1 text-lg rounded-r-lg ${op === 'subtract' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>-</button> </div>
            <div className="grid grid-cols-3 gap-2"> <InputField label="H" value={h2} onChange={e => setH2(e.target.value)} /> <InputField label="M" value={m2} onChange={e => setM2(e.target.value)} /> <InputField label="S" value={s2} onChange={e => setS2(e.target.value)} /> </div>
            {result && <ResultDisplay label="Result" value={result} />}
        </div>
    );
};

const PercentageCalculator: React.FC = () => {
    const [value, setValue] = useState('150'); const [percent, setPercent] = useState('25');
    const result = useMemo(() => { const v = parseFloat(value); const p = parseFloat(percent); if (isNaN(v) || isNaN(p)) return null; return (v * p / 100).toFixed(2); }, [value, percent]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="flex items-end gap-2"> <InputField label="Percentage (%)" value={percent} onChange={e => setPercent(e.target.value)} /> <span className="pb-2">of</span> <InputField label="Value" value={value} onChange={e => setValue(e.target.value)} /> </div>
            {result && <ResultDisplay label="Result is" value={result} />}
        </div>
    );
};

const GeometryCalculator: React.FC = () => {
    const [shape, setShape] = useState<'circle' | 'rectangle'>('circle'); const [radius, setRadius] = useState('10'); const [length, setLength] = useState('10'); const [width, setWidth] = useState('15');
    const result = useMemo(() => { if (shape === 'circle') { const r = parseFloat(radius); if (isNaN(r)) return null; return { area: (Math.PI * r * r).toFixed(2), perimeter: (2 * Math.PI * r).toFixed(2) }; } else { const l = parseFloat(length); const w = parseFloat(width); if(isNaN(l) || isNaN(w)) return null; return { area: (l * w).toFixed(2), perimeter: (2 * (l + w)).toFixed(2) }; } }, [shape, radius, length, width]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="flex justify-center gap-2 mb-4"> <button onClick={() => setShape('circle')} className={`px-3 py-1 text-sm rounded-full ${shape === 'circle' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Circle</button> <button onClick={() => setShape('rectangle')} className={`px-3 py-1 text-sm rounded-full ${shape === 'rectangle' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Rectangle</button> </div>
            <div className="space-y-4"> {shape === 'circle' ? ( <InputField label="Radius" value={radius} onChange={e => setRadius(e.target.value)} /> ) : ( <> <InputField label="Length" value={length} onChange={e => setLength(e.target.value)} /> <InputField label="Width" value={width} onChange={e => setWidth(e.target.value)} /> </> )} </div>
            {result && <ResultDisplay label={`Area: ${result.area}`} value={`Perimeter: ${result.perimeter}`} />}
        </div>
    );
};

const GSTVATCalculator: React.FC = () => {
    const [amount, setAmount] = useState('1000'); const [rate, setRate] = useState('18'); const [type, setType] = useState<'add' | 'remove'>('add');
    const result = useMemo(() => { const a = parseFloat(amount); const r = parseFloat(rate); if (isNaN(a) || isNaN(r)) return null; if (type === 'add') { const tax = a * (r / 100); return { total: (a + tax).toFixed(2), tax: tax.toFixed(2) }; } else { const original = a / (1 + r / 100); const tax = a - original; return { total: original.toFixed(2), tax: tax.toFixed(2) }; } }, [amount, rate, type]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="flex justify-center gap-2 mb-4"> <button onClick={() => setType('add')} className={`px-3 py-1 text-sm rounded-full ${type === 'add' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Add Tax</button> <button onClick={() => setType('remove')} className={`px-3 py-1 text-sm rounded-full ${type === 'remove' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Remove Tax</button> </div>
            <div className="space-y-4"> <InputField label="Amount" value={amount} onChange={e => setAmount(e.target.value)} /> <InputField label="Tax Rate (%)" value={rate} onChange={e => setRate(e.target.value)} /> </div>
            {result && <ResultDisplay label={type === 'add' ? 'Total Amount' : 'Original Amount'} value={result.total} subValue={`Tax: ${result.tax}`} />}
        </div>
    );
};

const SpeedDistanceTimeCalculator: React.FC = () => {
    const [solveFor, setSolveFor] = useState<'speed' | 'distance' | 'time'>('speed'); const [speed, setSpeed] = useState('60'); const [distance, setDistance] = useState('120'); const [time, setTime] = useState('2');
    const result = useMemo(() => { const s = parseFloat(speed); const d = parseFloat(distance); const t = parseFloat(time); if (solveFor === 'speed' && !isNaN(d) && !isNaN(t) && t > 0) return { label: 'Speed (km/h)', value: (d/t).toFixed(2) }; if (solveFor === 'distance' && !isNaN(s) && !isNaN(t)) return { label: 'Distance (km)', value: (s*t).toFixed(2) }; if (solveFor === 'time' && !isNaN(s) && !isNaN(d) && s > 0) return { label: 'Time (hours)', value: (d/s).toFixed(2) }; return null; }, [solveFor, speed, distance, time]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="flex justify-center gap-2 mb-4"> <button onClick={() => setSolveFor('speed')} className={`px-3 py-1 text-sm rounded-full ${solveFor === 'speed' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Speed</button> <button onClick={() => setSolveFor('distance')} className={`px-3 py-1 text-sm rounded-full ${solveFor === 'distance' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Distance</button> <button onClick={() => setSolveFor('time')} className={`px-3 py-1 text-sm rounded-full ${solveFor === 'time' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Time</button> </div>
            <div className="space-y-4"> {solveFor !== 'speed' && <InputField label="Speed (km/h)" value={speed} onChange={e => setSpeed(e.target.value)} />} {solveFor !== 'distance' && <InputField label="Distance (km)" value={distance} onChange={e => setDistance(e.target.value)} />} {solveFor !== 'time' && <InputField label="Time (hours)" value={time} onChange={e => setTime(e.target.value)} />} </div>
            {result && <ResultDisplay label={result.label} value={result.value} />}
        </div>
    );
};

const HexBinaryConverter: React.FC = () => {
    const [number, setNumber] = useState('255'); const [base, setBase] = useState<10 | 2 | 16 | 8>(10);
    const result = useMemo(() => { const dec = parseInt(number, base); if (isNaN(dec)) return { dec: 'Invalid', bin: 'Invalid', hex: 'Invalid', oct: 'Invalid' }; return { dec: dec.toString(10), bin: dec.toString(2), hex: dec.toString(16).toUpperCase(), oct: dec.toString(8) }; }, [number, base]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-md mx-auto text-white">
            <div className="flex gap-2">
                <div className="w-full"> <InputField label="Input Number" type="text" value={number} onChange={e => setNumber(e.target.value)} /> </div>
                <div> <label className="text-sm">Base</label> <select value={base} onChange={e => setBase(parseInt(e.target.value) as any)} className="w-full mt-1 bg-black/30 p-2 rounded-md"> <option value={10}>DEC</option> <option value={2}>BIN</option> <option value={16}>HEX</option> <option value={8}>OCT</option> </select> </div>
            </div>
            <div className="mt-4 space-y-2"> <div className="flex justify-between items-center bg-black/20 p-2 rounded-md"> <span className="font-bold">Decimal</span> <span className="font-mono text-amber-300 break-all">{result.dec}</span> </div> <div className="flex justify-between items-center bg-black/20 p-2 rounded-md"> <span className="font-bold">Binary</span> <span className="font-mono text-amber-300 break-all">{result.bin}</span> </div> <div className="flex justify-between items-center bg-black/20 p-2 rounded-md"> <span className="font-bold">Hexadecimal</span> <span className="font-mono text-amber-300">{result.hex}</span> </div> <div className="flex justify-between items-center bg-black/20 p-2 rounded-md"> <span className="font-bold">Octal</span> <span className="font-mono text-amber-300">{result.oct}</span> </div> </div>
        </div>
    );
};

const CaloriesCalculator: React.FC = () => {
    const [height, setHeight] = useState('170'); const [weight, setWeight] = useState('65'); const [age, setAge] = useState('25'); const [gender, setGender] = useState<'male' | 'female'>('male'); const [activity, setActivity] = useState(1.55);
    const result = useMemo(() => { const h = parseFloat(height); const w = parseFloat(weight); const a = parseFloat(age); if(!h || !w || !a) return null; const bmr = gender === 'male' ? (10 * w + 6.25 * h - 5 * a + 5) : (10 * w + 6.25 * h - 5 * a - 161); const tdee = bmr * activity; return { bmr: bmr.toFixed(0), tdee: tdee.toFixed(0) }; }, [height, weight, age, gender, activity]);
    return(
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="space-y-4"> <InputField label="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} /> <InputField label="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} /> <InputField label="Age" value={age} onChange={e => setAge(e.target.value)} />
                <div> <label className="text-sm">Gender</label> <select value={gender} onChange={e => setGender(e.target.value as any)} className="w-full mt-1 bg-black/30 p-2 rounded-md"> <option value="male">Male</option> <option value="female">Female</option> </select> </div>
                <div> <label className="text-sm">Activity Level</label> <select value={activity} onChange={e => setActivity(parseFloat(e.target.value))} className="w-full mt-1 bg-black/30 p-2 rounded-md"> <option value={1.2}>Sedentary</option> <option value={1.375}>Lightly Active</option> <option value={1.55}>Moderately Active</option> <option value={1.725}>Very Active</option> </select> </div>
            </div>
            {result && <ResultDisplay label="Daily Calories (TDEE)" value={result.tdee} subValue={`BMR: ${result.bmr}`} />}
        </div>
    );
};

const MortgageCalculator: React.FC = () => {
    const [amount, setAmount] = useState('2500000'); const [rate, setRate] = useState('8'); const [term, setTerm] = useState('20'); const formatter = useMemo(() => new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'BDT' }), []);
    const result = useMemo(() => { const p = parseFloat(amount); const r = parseFloat(rate) / 100 / 12; const n = parseFloat(term) * 12; if(isNaN(p) || isNaN(r) || isNaN(n)) return null; const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1); return formatter.format(monthlyPayment); }, [amount, rate, term, formatter]);
    return (
         <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="space-y-4"> <InputField label="Loan Amount" value={amount} onChange={e => setAmount(e.target.value)} /> <InputField label="Interest Rate (%)" value={rate} onChange={e => setRate(e.target.value)} /> <InputField label="Loan Term (Years)" value={term} onChange={e => setTerm(e.target.value)} /> </div>
            {result && <ResultDisplay label="Monthly Payment" value={result} />}
        </div>
    );
};

const LoanAffordabilityCalculator: React.FC = () => {
    const [income, setIncome] = useState('80000'); const [debt, setDebt] = useState('15000'); const [rate, setRate] = useState('9'); const [term, setTerm] = useState('15'); const formatter = useMemo(() => new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'BDT' }), []);
    const result = useMemo(() => { const i = parseFloat(income); const d = parseFloat(debt); const r = parseFloat(rate) / 100 / 12; const n = parseFloat(term) * 12; if(isNaN(i) || isNaN(d) || isNaN(r) || isNaN(n)) return null; const maxMonthlyPayment = (i * 0.36) - d; if(maxMonthlyPayment <= 0) return "Not affordable"; const maxLoan = maxMonthlyPayment * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))); return formatter.format(maxLoan); }, [income, debt, rate, term, formatter]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
             <div className="space-y-4"> <InputField label="Gross Monthly Income" value={income} onChange={e => setIncome(e.target.value)} /> <InputField label="Total Monthly Debts" value={debt} onChange={e => setDebt(e.target.value)} /> <InputField label="Interest Rate (%)" value={rate} onChange={e => setRate(e.target.value)} /> <InputField label="Loan Term (Years)" value={term} onChange={e => setTerm(e.target.value)} /> </div>
            {result && <ResultDisplay label="You can afford a loan of" value={result} />}
        </div>
    );
};

const FractionCalculator: React.FC = () => {
    const [n1, setN1] = useState('1'); const [d1, setD1] = useState('2'); const [n2, setN2] = useState('3'); const [d2, setD2] = useState('4'); const [op, setOp] = useState('+');
    const result = useMemo(() => { const num1 = parseInt(n1), den1 = parseInt(d1), num2 = parseInt(n2), den2 = parseInt(d2); if(isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2) || den1 === 0 || den2 === 0) return null; let resN, resD; if(op === '+') { resN = num1 * den2 + num2 * den1; resD = den1 * den2; } else if(op === '-') { resN = num1 * den2 - num2 * den1; resD = den1 * den2; } else if(op === '*') { resN = num1 * num2; resD = den1 * den2; } else { resN = num1 * den2; resD = den1 * num2; } const gcd = (a:number, b:number):number => b === 0 ? a : gcd(b, a % b); const commonDivisor = gcd(resN, resD); return `${resN / commonDivisor} / ${resD / commonDivisor}`; }, [n1, d1, n2, d2, op]);
    const FractionInput = ({ n, d, onNChange, onDChange } : {n:string, d:string, onNChange:(e: React.ChangeEvent<HTMLInputElement>)=>void, onDChange:(e: React.ChangeEvent<HTMLInputElement>)=>void}) => ( <div className="flex flex-col items-center"> <input type="number" value={n} onChange={onNChange} className="w-20 bg-black/30 text-center text-xl text-white rounded-md p-2"/> <hr className="w-24 my-1" /> <input type="number" value={d} onChange={onDChange} className="w-20 bg-black/30 text-center text-xl text-white rounded-md p-2"/> </div> );
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="flex items-center justify-center gap-4"> <FractionInput n={n1} d={d1} onNChange={e => setN1(e.target.value)} onDChange={e => setD1(e.target.value)} /> <select value={op} onChange={e => setOp(e.target.value)} className="bg-black/30 p-2 rounded-md"> <option>+</option> <option>-</option> <option>*</option> <option>/</option> </select> <FractionInput n={n2} d={d2} onNChange={e => setN2(e.target.value)} onDChange={e => setD2(e.target.value)} /> </div>
            {result && <ResultDisplay label="Result" value={result} />}
        </div>
    );
};

const ProbabilityCalculator: React.FC = () => {
    const [n, setN] = useState('10'); const [r, setR] = useState('3'); const [mode, setMode] = useState<'p' | 'c'>('p');
    const result = useMemo(() => { const numN = parseInt(n); const numR = parseInt(r); if(isNaN(numN) || isNaN(numR) || numN < numR || numN < 0 || numR < 0) return null; const factorial = (num: number): number => num <= 1 ? 1 : num * factorial(num-1); if(mode === 'p') return (factorial(numN) / factorial(numN - numR)).toLocaleString(); else return (factorial(numN) / (factorial(numR) * factorial(numN - numR))).toLocaleString(); }, [n, r, mode]);
    return (
         <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="flex justify-center gap-2 mb-4"> <button onClick={() => setMode('p')} className={`px-3 py-1 text-sm rounded-full ${mode === 'p' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Permutation</button> <button onClick={() => setMode('c')} className={`px-3 py-1 text-sm rounded-full ${mode === 'c' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>Combination</button> </div>
             <div className="space-y-4"> <InputField label="Total Items (n)" value={n} onChange={e => setN(e.target.value)} /> <InputField label="Items to choose (r)" value={r} onChange={e => setR(e.target.value)} /> </div>
            {result && <ResultDisplay label="Result" value={result} />}
        </div>
    );
};

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

const UnitConverter: React.FC = () => {
    const CONVERSIONS = { length: { 'm': 1, 'cm': 0.01, 'km': 1000, 'in': 0.0254, 'ft': 0.3048, 'mi': 1609.34 }, weight: { 'kg': 1, 'g': 0.001, 'lb': 0.453592, 'oz': 0.0283495 }, temperature: { C: { F: (c: number) => c * 9/5 + 32, K: (c: number) => c + 273.15 }, F: { C: (f: number) => (f - 32) * 5/9, K: (f: number) => (f - 32) * 5/9 + 273.15 }, K: { C: (k: number) => k - 273.15, F: (k: number) => (k - 273.15) * 9/5 + 32 } } };
    const [category, setCategory] = useState<'length' | 'weight' | 'temperature'>('length');
    const [fromUnit, setFromUnit] = useState('m');
    const [toUnit, setToUnit] = useState('ft');
    const [inputValue, setInputValue] = useState('1');
    const units = Object.keys(CONVERSIONS[category]);

    // 🎯 Error Fix Starts Here
    const result = useMemo(() => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) return '';
        if (fromUnit === toUnit) return value.toString();

        if (category === 'temperature') {
            // Type assertion to tell TypeScript the shape of the temperature conversion object
            const tempConversions = CONVERSIONS.temperature as Record<string, Record<string, (val: number) => number>>;
            // Now, accessing with string keys is safe
            return tempConversions[fromUnit][toUnit](value).toFixed(2);
        } else {
            // Type assertion for length and weight conversion objects
            const unitConversions = CONVERSIONS[category] as Record<string, number>;
            // Now, accessing with string keys is safe
            const baseValue = value * unitConversions[fromUnit];
            const finalValue = baseValue / unitConversions[toUnit];
            return finalValue.toFixed(4);
        }
    }, [inputValue, fromUnit, toUnit, category]);
    // 🎯 Error Fix Ends Here

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

const DateCalculator: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);
    const difference = useMemo(() => { const start = new Date(fromDate); const end = new Date(toDate); if (isNaN(start.getTime()) || isNaN(end.getTime())) return null; const diffTime = Math.abs(end.getTime() - start.getTime()); const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); return `${diffDays} days`; }, [fromDate, toDate]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="space-y-4"> <div> <label className="text-sm">From Date</label> <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md" /> </div> <div> <label className="text-sm">To Date</label> <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="w-full mt-1 bg-black/30 p-2 rounded-md" /> </div> </div>
            {difference && ( <div className="mt-6 text-center bg-black/30 p-4 rounded-lg"> <p className="text-lg">Difference</p> <p className="text-4xl font-bold text-amber-400 my-2">{difference}</p> </div> )}
        </div>
    );
};

const EquationSolver: React.FC = () => {
    const [a, setA] = useState('1');
    const [b, setB] = useState('5');
    const [c, setC] = useState('6');
    const roots = useMemo(() => { const numA = parseFloat(a); const numB = parseFloat(b); const numC = parseFloat(c); if (isNaN(numA) || isNaN(numB) || isNaN(numC) || numA === 0) return null; const discriminant = numB * numB - 4 * numA * numC; if (discriminant > 0) { const x1 = (-numB + Math.sqrt(discriminant)) / (2 * numA); const x2 = (-numB - Math.sqrt(discriminant)) / (2 * numA); return `x₁ = ${x1.toFixed(3)}, x₂ = ${x2.toFixed(3)}`; } else if (discriminant === 0) { const x = -numB / (2 * numA); return `x = ${x.toFixed(3)}`; } else { return "No real roots"; } }, [a, b, c]);
    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
            <div className="flex items-center justify-center gap-2"> <input type="number" value={a} onChange={e => setA(e.target.value)} className="w-16 bg-black/30 p-2 rounded-md" /><span>x² +</span> <input type="number" value={b} onChange={e => setB(e.target.value)} className="w-16 bg-black/30 p-2 rounded-md" /><span>x +</span> <input type="number" value={c} onChange={e => setC(e.target.value)} className="w-16 bg-black/30 p-2 rounded-md" /><span>= 0</span> </div>
            {roots && ( <div className="mt-6 text-center bg-black/30 p-4 rounded-lg"> <p className="text-lg">Roots</p> <p className="text-3xl font-bold text-amber-400 my-2">{roots}</p> </div> )}
        </div>
    );
};

type Matrix = [[number, number], [number, number]];

const MatrixCalculator: React.FC = () => {
  const [matrixA, setMatrixA] = useState<Matrix>([[1, 2], [3, 4]]);
  const [matrixB, setMatrixB] = useState<Matrix>([[5, 6], [7, 8]]);
  const [operation, setOperation] = useState<
    "add" | "subtract" | "multiply"
  >("add");

  // Update matrix values safely
  const handleMatrixChange = (
    matrix: "A" | "B",
    row: number,
    col: number,
    value: string
  ) => {
    const newMatrix: Matrix =
      matrix === "A"
        ? (matrixA.map((r) => [...r]) as Matrix)
        : (matrixB.map((r) => [...r]) as Matrix);

    newMatrix[row][col] = parseFloat(value) || 0;

    if (matrix === "A") {
      setMatrixA(newMatrix);
    } else {
      setMatrixB(newMatrix);
    }
  };

  // Compute result matrix
  const resultMatrix = useMemo<Matrix>(() => {
    const res: Matrix = [
      [0, 0],
      [0, 0],
    ];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        if (operation === "add") {
          res[i][j] = matrixA[i][j] + matrixB[i][j];
        } else if (operation === "subtract") {
          res[i][j] = matrixA[i][j] - matrixB[i][j];
        } else if (operation === "multiply") {
          res[i][j] =
            matrixA[i][0] * matrixB[0][j] +
            matrixA[i][1] * matrixB[1][j];
        }
      }
    }
    return res;
  }, [matrixA, matrixB, operation]);

  // Component to render matrix inputs
  const MatrixInput = ({
    matrix,
    matrixName,
    onChange,
  }: {
    matrix: Matrix;
    matrixName: "A" | "B";
    onChange: (
      matrix: "A" | "B",
      row: number,
      col: number,
      value: string
    ) => void;
  }) => (
    <div className="flex flex-col items-center">
      <p className="text-lg font-bold mb-2 text-cyan-300">
        Matrix {matrixName}
      </p>
      <div className="grid grid-cols-2 gap-2 p-2 bg-black/30 rounded-md">
        {matrix.map((row, i) =>
          row.map((cell, j) => (
            <input
              key={`${matrixName}-${i}-${j}`}
              type="number"
              value={cell}
              onChange={(e) =>
                onChange(matrixName, i, j, e.target.value)
              }
              className="w-16 h-16 bg-[#1e3a5f] text-center text-xl text-white rounded-md"
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-lg mx-auto text-white">
      <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">
        2x2 Matrix Calculator
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {/* Matrix A */}
        <MatrixInput
          matrix={matrixA}
          matrixName="A"
          onChange={handleMatrixChange}
        />

        {/* Operation buttons */}
        <div className="flex md:flex-col gap-2">
          <button
            onClick={() => setOperation("add")}
            className={`p-2 rounded-full ${
              operation === "add" ? "bg-cyan-500" : "bg-[#1e3a5f]"
            }`}
          >
            +
          </button>
          <button
            onClick={() => setOperation("subtract")}
            className={`p-2 rounded-full ${
              operation === "subtract" ? "bg-cyan-500" : "bg-[#1e3a5f]"
            }`}
          >
            -
          </button>
          <button
            onClick={() => setOperation("multiply")}
            className={`p-2 rounded-full ${
              operation === "multiply" ? "bg-cyan-500" : "bg-[#1e3a5f]"
            }`}
          >
            ×
          </button>
        </div>

        {/* Matrix B */}
        <MatrixInput
          matrix={matrixB}
          matrixName="B"
          onChange={handleMatrixChange}
        />
      </div>

      {/* Result */}
      <div className="mt-6 text-center">
        <p className="text-lg font-bold text-amber-400">Result</p>
        <div className="p-4 bg-black/50 rounded-lg inline-block mt-2">
          <div className="grid grid-cols-2 gap-2">
            {resultMatrix.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`res-${i}-${j}`}
                  className="w-16 h-16 flex items-center justify-center text-xl font-bold bg-[#102a43] rounded-md"
                >
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Calculator Hub Component ---
const CALCULATOR_TABS: Record<string, { label: string; description: string; component: React.ReactNode }> = {
    general: { label: 'General', description: "A standard calculator for daily arithmetic operations.", component: <GeneralCalculator /> },
    scientific: { label: 'Scientific', description: "An advanced calculator for complex calculations, including trigonometric functions, logarithms, and roots.", component: <ScientificCalculator /> },
    age: { label: 'Age', description: "Calculates the exact age between two dates in years, months, and days.", component: <AgeCalculator /> },
    discount: { label: 'Discount', description: "Find the final price after applying discounts and taxes to see how much you save.", component: <DiscountCalculator /> },
    tip: { label: 'Tip', description: "Easily split bills and calculate tips among friends to find out how much each person should pay.", component: <TipCalculator /> },
    currency: { label: 'Currency', description: "Convert between major international currencies using pre-set exchange rates.", component: <CurrencyConverter /> },
    time: { label: 'Time', description: "Perform calculations with time by adding or subtracting durations in hours, minutes, and seconds.", component: <TimeCalculator /> },
    percentage: { label: 'Percentage', description: "A simple tool for all your percentage needs, such as calculating discounts and stats.", component: <PercentageCalculator /> },
    geometry: { label: 'Geometry', description: "Calculate the area and perimeter for basic geometric shapes like circles and rectangles.", component: <GeometryCalculator /> },
    gst_vat: { label: 'GST/VAT', description: "Quickly add or remove Goods and Services Tax (GST) or Value-Added Tax (VAT) from an amount.", component: <GSTVATCalculator /> },
    speed: { label: 'Speed/Distance', description: "Solve problems involving speed, distance, and time based on the classic S=D/T formula.", component: <SpeedDistanceTimeCalculator /> },
    base_converter: { label: 'Base Converter', description: "A tool to convert numbers between decimal, binary, hexadecimal, and octal systems.", component: <HexBinaryConverter /> },
    calories: { label: 'Calories', description: "Estimate your daily calorie needs (BMR and TDEE) based on your activity level.", component: <CaloriesCalculator /> },
    mortgage: { label: 'Mortgage', description: "Calculate your estimated monthly mortgage payment based on loan amount, interest, and term.", component: <MortgageCalculator /> },
    loan_affordability: { label: 'Loan Affordability', description: "Estimate the maximum loan you can likely afford based on your income and debts.", component: <LoanAffordabilityCalculator /> },
    fraction: { label: 'Fractions', description: "Perform basic arithmetic with fractions, including addition, subtraction, multiplication, and division.", component: <FractionCalculator /> },
    probability: { label: 'Probability', description: "A tool for computing permutations (nPr) and combinations (nCr) for a given set of items.", component: <ProbabilityCalculator /> },
    bmi: { label: 'BMI', description: "Calculate your Body Mass Index (BMI).", component: <BMICalculator /> },
    unit: { label: 'Unit Converter', description: "Convert between different units.", component: <UnitConverter /> },
    date: { label: 'Date', description: "Find the number of days between two dates.", component: <DateCalculator /> },
    equation: { label: 'Equation', description: "Solve quadratic equations.", component: <EquationSolver /> },
    matrix: { label: 'Matrix', description: "Perform basic 2x2 matrix operations.", component: <MatrixCalculator /> },
};


const Calculator: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    if (!isOpen) {
        return ( <div className="cursor-pointer" onClick={() => setIsOpen(true)}> <GlassCard className="p-4 md:p-6 w-full flex flex-col items-center justify-center min-h-[120px]"> <h2 className="text-2xl font-bold text-cyan-300 text-center">🧮 Calculator Hub</h2> <p className="text-sm text-white/70 mt-2">Click to open</p> </GlassCard> </div> );
    }
    const activeCalculator = CALCULATOR_TABS[activeTab];
    return (
        <GlassCard className="p-4 md:p-6 w-full">
            <div className="flex justify-between items-center mb-4"> <h2 className="text-2xl font-bold text-cyan-300">🧮 Calculator Hub</h2> <button onClick={() => setIsOpen(false)} className="text-3xl text-red-500 hover:text-red-400">&times;</button> </div>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                {Object.entries(CALCULATOR_TABS).map(([key, { label }]) => (
                    <button key={key} onClick={() => setActiveTab(key)} className={`px-3 py-1 text-xs md:text-sm rounded-full transition-colors ${activeTab === key ? 'bg-cyan-500 text-white' : 'bg-[#1e3a5f] hover:bg-cyan-500/50'}`}>{label}</button>
                ))}
            </div>
            <div className="mt-4">
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                        <div className="bg-black/20 p-3 rounded-lg mb-4 text-center">
                             <h3 className="text-lg font-bold text-amber-400">{activeCalculator.label}</h3>
                             <p className="text-xs text-white/80 mt-1">{activeCalculator.description}</p>
                        </div>
                        {activeCalculator.component}
                    </motion.div>
                </AnimatePresence>
            </div>
        </GlassCard>
    );
};

export default Calculator;