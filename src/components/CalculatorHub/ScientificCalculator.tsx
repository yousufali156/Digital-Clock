import React, { useState } from 'react';

const ScientificCalculator: React.FC = () => {
    const [input, setInput] = useState('');

    const handleClick = (value: string) => {
        setInput(prev => prev + value);
    };

    const calculate = () => {
        try {
            let expression = input
                .replace(/sin\(/g, 'Math.sin(Math.PI/180*')
                .replace(/cos\(/g, 'Math.cos(Math.PI/180*')
                .replace(/tan\(/g, 'Math.tan(Math.PI/180*')
                .replace(/log\(/g, 'Math.log10(')
                .replace(/ln\(/g, 'Math.log(')
                .replace(/√/g, 'Math.sqrt')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/\^/g, '**');
            
            // eslint-disable-next-line no-eval
            setInput(eval(expression).toString());
        } catch {
            setInput("Error");
        }
    };

    const clear = () => setInput("");
    const backspace = () => setInput(prev => prev.slice(0, -1));

    const sciButtons = [ 'sin(', 'cos(', 'tan(', 'log(', 'ln(', '√(', ')', '^', 'π', 'e' ];
    const numButtons = ["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"];

    return (
        <div className="bg-[#102a43] p-4 rounded-2xl shadow-lg max-w-sm mx-auto">
            <div className="bg-black/50 text-amber-300 text-right p-4 rounded-md mb-4 font-mono text-2xl break-all h-16 flex items-end justify-end">
                {input || "0"}
            </div>
            <div className="grid grid-cols-5 gap-2">
                {sciButtons.map((btn) => (
                    <button key={btn} onClick={() => handleClick(btn)}
                        className="p-3 rounded-lg text-white font-bold text-md bg-[#275080] hover:bg-[#1e3a5f] transition-colors">
                        {btn}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
                 {numButtons.map((btn) => (
                    <button key={btn} onClick={() => (btn === "=" ? calculate() : handleClick(btn))}
                        className={`p-3 rounded-lg text-white font-bold text-xl transition-colors ${
                            btn === '=' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#1e3a5f] hover:bg-[#275080]'
                        }`}>
                        {btn}
                    </button>
                ))}
            </div>
             <div className="grid grid-cols-2 gap-2 mt-2">
                <button onClick={clear} className="bg-red-600 hover:bg-red-700 p-2 rounded-lg text-white font-bold text-lg">Clear</button>
                <button onClick={backspace} className="bg-[#1e3a5f] hover:bg-[#275080] p-2 rounded-lg text-white font-bold text-lg">DEL</button>
            </div>
        </div>
    );
};

export default ScientificCalculator;
