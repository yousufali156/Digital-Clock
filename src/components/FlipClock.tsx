import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { padZero } from '../utils/helpers';

const FlipUnit = ({ value }: { value: string }) => (
    <div className="relative w-[70px] h-[90px] md:w-[100px] md:h-[120px] bg-[#1a1a1a] text-cyan-300 rounded-lg shadow-2xl flex items-center justify-center text-5xl md:text-7xl font-black perspective-1000">
        <AnimatePresence>
            <motion.div
                key={value}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: -90, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                {value}
            </motion.div>
        </AnimatePresence>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/50"></div>
    </div>
);

const FlipClock: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const hours12 = time.getHours() % 12 || 12;
    const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

    return (
        <div className="flex flex-col items-center my-8 cursor-pointer" onClick={() => setShowControls(!showControls)}>
            <div className="flex gap-2 md:gap-4 justify-center items-center">
                <FlipUnit value={padZero(hours12)} />
                <div className="text-5xl md:text-7xl text-cyan-300/50 pb-2">:</div>
                <FlipUnit value={padZero(time.getMinutes())} />
                <div className="text-5xl md:text-7xl text-cyan-300/50 pb-2">:</div>
                <FlipUnit value={padZero(time.getSeconds())} />
                <div className="pl-2 md:pl-4">
                    <div className="text-xl md:text-2xl font-semibold text-amber-400">{ampm}</div>
                </div>
            </div>
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className="mt-4 flex gap-4"
                    >
                         <button className="bg-cyan-500/80 text-white px-4 py-2 rounded-lg text-sm hover:bg-cyan-600">Stopwatch</button>
                         <button className="bg-amber-500/80 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-600">Timer</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FlipClock;
