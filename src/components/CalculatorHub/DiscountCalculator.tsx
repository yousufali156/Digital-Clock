import React, { useState, useMemo } from 'react';
import { InputField, ResultDisplay } from './CalculatorUtils';

const DiscountCalculator: React.FC = () => {
    const [price, setPrice] = useState('1000');
    const [discount, setDiscount] = useState('15');
    const [tax, setTax] = useState('5');

    const result = useMemo(() => {
        const p = parseFloat(price);
        const d = parseFloat(discount);
        const t = parseFloat(tax);
        if (isNaN(p) || isNaN(d) || isNaN(t)) return null;

        const discountAmount = p * (d / 100);
        const priceAfterDiscount = p - discountAmount;
        const taxAmount = priceAfterDiscount * (t / 100);
        const finalPrice = priceAfterDiscount + taxAmount;

        return {
            finalPrice: finalPrice.toFixed(2),
            saved: discountAmount.toFixed(2)
        };
    }, [price, discount, tax]);

    return (
        <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
             <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Discount & Tax Calculator</h3>
            <div className="space-y-4">
                <InputField label="Original Price" value={price} onChange={e => setPrice(e.target.value)} />
                <InputField label="Discount (%)" value={discount} onChange={e => setDiscount(e.target.value)} />
                <InputField label="Tax (%)" value={tax} onChange={e => setTax(e.target.value)} />
            </div>
            {result && <ResultDisplay label="Final Price" value={`${result.finalPrice} (You saved ${result.saved})`} />}
        </div>
    );
};

export default DiscountCalculator;
