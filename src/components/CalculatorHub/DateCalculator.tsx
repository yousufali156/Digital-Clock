import React, { useState, useMemo } from 'react';

const DateCalculator: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);

    const difference = useMemo(() => {
        const start = new Date(fromDate);
        const end = new Date(toDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return `${diffDays} days`;
    }, [fromDate, toDate]);
    
    return (
         <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-white">
             <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">Days Between Dates</h3>
             <div className="space-y-4">
                 <div>
                     <label className="text-sm">From Date</label>
                     <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
                            className="w-full mt-1 bg-black/30 p-2 rounded-md" />
                 </div>
                 <div>
                     <label className="text-sm">To Date</label>
                     <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
                            className="w-full mt-1 bg-black/30 p-2 rounded-md" />
                 </div>
             </div>
             {difference && (
                <div className="mt-6 text-center bg-black/30 p-4 rounded-lg">
                    <p className="text-lg">Difference</p>
                    <p className="text-4xl font-bold text-amber-400 my-2">{difference}</p>
                </div>
            )}
         </div>
    );
};

export default DateCalculator;
