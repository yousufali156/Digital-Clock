import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

const HexBinaryConverter: React.FC = () => {
    const [number, setNumber] = useState('255');
    const [base, setBase] = useState<10 | 2 | 16 | 8>(10);

    const result = useMemo(() => {
        const dec = parseInt(number, base);
        if (isNaN(dec)) return { dec: 'Invalid', bin: 'Invalid', hex: 'Invalid', oct: 'Invalid' };
        return {
            dec: dec.toString(10),
            bin: dec.toString(2),
            hex: dec.toString(16).toUpperCase(),
            oct: dec.toString(8),
        };
    }, [number, base]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-md mx-auto text-white">
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Base Converter</h3>
            <div className="flex gap-2">
                <div className="w-full">
                    <InputField label="Input Number" type="text" value={number} onChange={e => setNumber(e.target.value)} />
                </div>
                <div>
                     <label className="text-sm">Base</label>
                    <select value={base} onChange={e => setBase(parseInt(e.target.value) as any)} className="w-full mt-1 bg-black/30 p-2 rounded-md">
                        <option value={10}>DEC</option>
                        <option value={2}>BIN</option>
                        <option value={16}>HEX</option>
                        <option value={8}>OCT</option>
                    </select>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center bg-black/20 p-2 rounded-md"> <span className="font-bold">Decimal</span> <span className="font-mono text-amber-300 break-all">{result.dec}</span> </div>
                <div className="flex justify-between items-center bg-black/20 p-2 rounded-md"> <span className="font-bold">Binary</span> <span className="font-mono text-amber-300 break-all">{result.bin}</span> </div>
                <div className="flex justify-between items-center bg-black/20 p-2 rounded-md"> <span className="font-bold">Hexadecimal</span> <span className="font-mono text-amber-300">{result.hex}</span> </div>
                <div className="flex justify-between items-center bg-black/20 p-2 rounded-md"> <span className="font-bold">Octal</span> <span className="font-mono text-amber-300">{result.oct}</span> </div>
            </div>
        </div>
    );
};

export default HexBinaryConverter;
