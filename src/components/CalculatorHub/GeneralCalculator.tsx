import React, { useState } from 'react';

const GeneralCalculator: React.FC = () => {
    const [input, setInput] = useState('');

    const handleClick = (value: string) => {
        if (input === "Error") {
            setInput(value);
        } else {
            setInput((prev) => prev + value);
        }
    };

    const calculate = () => {
        try {
            // eslint-disable-next-line no-eval
            const result = eval(input);
            setInput(String(result));
        } catch {
            setInput("Error");
        }
    };

    const clear = () => setInput("");
    const backspace = () => setInput(prev => prev.slice(0, -1));

    const buttons = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];

    return (
        <div className="bg-[#102a43] p-4 rounded-2xl shadow-lg max-w-xs mx-auto">
            <div className="bg-black/50 text-amber-300 text-right p-4 rounded-md mb-4 font-mono text-3xl break-all h-20 flex items-end justify-end">
                {input || "0"}
            </div>
            <div className="grid grid-cols-4 gap-2">
                {buttons.map((btn) => (
                    <button
                        key={btn}
                        onClick={() => (btn === "=" ? calculate() : handleClick(btn))}
                        className={`p-4 rounded-lg text-white font-bold text-xl transition-colors ${
                            btn === '=' ? 'bg-amber-500 hover:bg-amber-600 col-span-2' : 'bg-[#1e3a5f] hover:bg-[#275080]'
                        } ${['/', '*', '-', '+'].includes(btn) ? 'text-cyan-300' : ''}`}
                    >
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

export default GeneralCalculator;
