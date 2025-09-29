import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { padZero } from '../utils/helpers';
import { Play, Pause, RotateCcw, Timer, Stopwatch, Flag, Clock } from './Icons'; // Clock আইকন ইম্পোর্ট করা হয়েছে
import GlassCard from './GlassCard';
import AnalogClock from './AnalogClock';

// --- Custom Hook for Local Storage State ---
// This hook syncs state with the browser's localStorage.
function useLocalStorageState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        try {
            const storedValue = window.localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error(`Error reading localStorage key “${key}”:`, error);
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error setting localStorage key “${key}”:`, error);
        }
    }, [key, state]);

    return [state, setState];
}


// --- Helper function to format time for stopwatch ---
const formatTime = (time: number) => {
    const minutes = padZero(Math.floor((time / 60000) % 60));
    const seconds = padZero(Math.floor((time / 1000) % 60));
    const milliseconds = padZero(Math.floor((time / 10) % 100));
    return { minutes, seconds, milliseconds };
};

// --- Flip Unit Component ---
// Renders a single unit of the clock with a 3D flip animation.
const FlipUnit = ({ value }: { value: string }) => (
    <div className="relative w-[70px] h-[90px] md:w-[100px] h-[120px] bg-[#1a1a1a] text-cyan-300 rounded-lg shadow-2xl flex items-center justify-center text-5xl md:text-7xl font-black perspective-1000">
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

// --- Stopwatch Component ---
// Contains the UI and logic for the stopwatch feature.
const StopwatchComponent = () => {
    const [time, setTime] = useLocalStorageState('stopwatch-time', 0);
    const [laps, setLaps] = useLocalStorageState<number[]>('stopwatch-laps', []);
    const [isRunning, setIsRunning] = useLocalStorageState('stopwatch-running', false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = window.setInterval(() => setTime(prev => prev + 10), 10);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isRunning, setTime]);

    const handleStartStop = () => setIsRunning(!isRunning);
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };
    const handleLap = () => {
        if (isRunning) {
            setLaps(prevLaps => [time, ...prevLaps]);
        }
    };

    const { minutes, seconds, milliseconds } = formatTime(time);

    return (
        <GlassCard className="p-6 w-full max-w-md mx-auto">
            <div className="text-5xl md:text-6xl font-mono text-amber-400 tracking-widest text-center">
                {minutes}:{seconds}:{milliseconds}
            </div>
            <div className="flex justify-center gap-4 my-4">
                <button onClick={handleStartStop} className="bg-cyan-500/80 text-white p-3 rounded-full hover:bg-cyan-600" aria-label={isRunning ? "Pause stopwatch" : "Start stopwatch"}><span className="w-6 h-6 flex items-center justify-center">{isRunning ? <Pause /> : <Play />}</span></button>
                <button onClick={handleLap} disabled={!isRunning} className="bg-cyan-500/80 text-white p-3 rounded-full hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Record lap"><Flag /></button>
                <button onClick={handleReset} className="bg-amber-500/80 text-white p-3 rounded-full hover:bg-amber-600" aria-label="Reset stopwatch"><RotateCcw /></button>
            </div>
            <div className="max-h-32 overflow-y-auto text-center space-y-1 pr-2">
                {laps.map((lap, index) => {
                    const { minutes, seconds, milliseconds } = formatTime(lap);
                    return <p key={index} className="font-mono text-sm">Lap {laps.length - index}: {minutes}:{seconds}:{milliseconds}</p>;
                })}
            </div>
        </GlassCard>
    );
};

// --- Timer Component ---
// Contains the UI and logic for the timer feature.
const TimerComponent = () => {
    const [duration, setDuration] = useLocalStorageState('timer-duration', { hours: 0, minutes: 5, seconds: 0 });
    const [timeLeft, setTimeLeft] = useLocalStorageState('timer-timeLeft', duration.minutes * 60 + duration.seconds);
    const [isRunning, setIsRunning] = useLocalStorageState('timer-running', false);
    const intervalRef = useRef<number | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    const playAlarm = () => {
        if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext)();
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime);
        gainNode.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);
        oscillator.start();
        setTimeout(() => oscillator.stop(), 500);
    };

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            playAlarm();
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isRunning, timeLeft, setIsRunning, setTimeLeft]);
    
    const calculateTotalSeconds = (h: number, m: number, s: number) => h * 3600 + m * 60 + s;

    const handleStartStop = () => {
         if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext)();
        setIsRunning(!isRunning);
    }
    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(calculateTotalSeconds(duration.hours, duration.minutes, duration.seconds));
    };
    const setPresetTimer = (minutes: number) => {
        const totalSeconds = minutes * 60;
        setDuration({ hours: Math.floor(minutes / 60), minutes: minutes % 60, seconds: 0 });
        setTimeLeft(totalSeconds);
        setIsRunning(false);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newDuration = { ...duration, [name]: Math.max(0, parseInt(value) || 0) };
        setDuration(newDuration);
        if (!isRunning) {
            setTimeLeft(calculateTotalSeconds(newDuration.hours, newDuration.minutes, newDuration.seconds));
        }
    };
    
    const displayHours = padZero(Math.floor(timeLeft / 3600));
    const displayMinutes = padZero(Math.floor((timeLeft % 3600) / 60));
    const displaySeconds = padZero(timeLeft % 60);
    const presets = [5, 10, 15, 30, 45, 60];

    return (
        <GlassCard className="p-6 w-full max-w-md mx-auto">
            {!isRunning ? (
                 <div className="flex gap-2 items-center justify-center mb-4">
                     <input type="number" name="hours" placeholder='HH' value={duration.hours} onChange={handleInputChange} className="w-20 bg-black/30 text-center text-4xl text-amber-400 rounded-md" min="0" />
                     <span className="text-4xl text-amber-400">:</span>
                     <input type="number" name="minutes" placeholder='MM' value={duration.minutes} onChange={handleInputChange} className="w-20 bg-black/30 text-center text-4xl text-amber-400 rounded-md" min="0" max="59" />
                      <span className="text-4xl text-amber-400">:</span>
                     <input type="number" name="seconds" placeholder='SS' value={duration.seconds} onChange={handleInputChange} className="w-20 bg-black/30 text-center text-4xl text-amber-400 rounded-md" min="0" max="59" />
                 </div>
            ) : (
                 <div className="text-5xl md:text-6xl font-mono text-amber-400 tracking-widest text-center mb-4">
                     {displayHours}:{displayMinutes}:{displaySeconds}
                 </div>
            )}
            <div className="flex justify-center gap-4 my-4">
                <button onClick={handleStartStop} className="bg-cyan-500/80 text-white p-3 rounded-full hover:bg-cyan-600" aria-label={isRunning ? "Pause timer" : "Start timer"}><span className="w-6 h-6 flex items-center justify-center">{isRunning ? <Pause /> : <Play />}</span></button>
                <button onClick={handleReset} className="bg-amber-500/80 text-white p-3 rounded-full hover:bg-amber-600" aria-label="Reset timer"><RotateCcw /></button>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                {presets.map(p => (
                    <button key={p} onClick={() => setPresetTimer(p)} className="text-xs px-3 py-1 bg-black/30 rounded-full hover:bg-cyan-500/50">{p} min</button>
                ))}
            </div>
        </GlassCard>
    );
};

// --- Main FlipClock Component ---
// Manages the main clock display and toggles between Stopwatch and Timer tools.
const FlipClock: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [activeTool, setActiveTool] = useState<'stopwatch' | 'timer' | null>(null);
    // 🎯 পরিবর্তন শুরু: অ্যানালগ ঘড়ির visibility নিয়ন্ত্রণের জন্য নতুন state
    const [showAnalogClock, setShowAnalogClock] = useState(false);

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const hours12 = time.getHours() % 12 || 12;
    const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

    const toggleTool = (tool: 'stopwatch' | 'timer') => {
        setActiveTool(activeTool === tool ? null : tool);
    };
    
    // 🎯 পরিবর্তন: অ্যানালগ ঘড়ির state টগল করার জন্য ফাংশন
    const toggleAnalogClock = () => {
        setShowAnalogClock(prev => !prev);
    };

    return (
        <div className="flex flex-col items-center my-8">
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
            
            <div className="mt-6 flex gap-4">
                <button onClick={() => toggleTool('stopwatch')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${activeTool === 'stopwatch' ? 'bg-cyan-500 text-white' : 'bg-black/30 text-cyan-300 hover:bg-cyan-500/50'}`}>
                    <Stopwatch width={18} height={18} /> Stopwatch
                </button>
                <button onClick={() => toggleTool('timer')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${activeTool === 'timer' ? 'bg-amber-500 text-white' : 'bg-black/30 text-amber-300 hover:bg-amber-500/50'}`}>
                    <Timer  width={18} height={18} /> Timer
                </button>
                {/* 🎯 পরিবর্তন: অ্যানালগ ঘড়ি দেখানোর জন্য নতুন বাটন */}
                <button onClick={toggleAnalogClock} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${showAnalogClock ? 'bg-green-500 text-white' : 'bg-black/30 text-green-300 hover:bg-green-500/50'}`}>
                    <Clock width={18} height={18} /> Analog Clock
                </button>
            </div>

            <div className="w-full mt-6">
                <AnimatePresence>
                    {activeTool === 'stopwatch' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                            <StopwatchComponent />
                        </motion.div>
                    )}
                    {activeTool === 'timer' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                            <TimerComponent />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* 🎯 পরিবর্তন: অ্যানালগ ঘড়িটি এখন শর্তসাপেক্ষে (conditionally) রেন্ডার হবে */}
            <div className="w-full mt-8">
                <AnimatePresence>
                    {showAnalogClock && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: 20, height: 0 }}
                            className="flex justify-center"
                        >
                            <AnalogClock />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FlipClock;