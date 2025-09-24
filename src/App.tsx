import React, { useState, useMemo } from 'react';
import FlipClock from './components/FlipClock';
import Calendar from './components/Calendar';
import ToDo from './components/ToDo';
import WeatherWidget from './components/WeatherWidget';
import ProductivityStats from './components/ProductivityStats';
import GeminiGoalGenerator from './components/GeminiGoalGenerator';
import QuoteOfTheDay from './components/QuoteOfTheDay';
import WorldClock from './components/WorldClock';
import Footer from './components/Footer';
import { toYYYYMMDD } from './utils/helpers';

export interface Task {
    id: number;
    text: string;
    completed: boolean;
    date: string;
}

function App() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, text: "Review new dashboard design", completed: true, date: toYYYYMMDD(new Date()) },
        { id: 2, text: "Test live weather feature", completed: false, date: toYYYYMMDD(new Date()) },
    ]);

    const tasksForSelectedDay = useMemo(() => tasks.filter(task => task.date === toYYYYMMDD(selectedDate)), [selectedDate, tasks]);
    const todayTasks = useMemo(() => tasks.filter(task => task.date === toYYYYMMDD(new Date())), [tasks]);

    const addTask = (text: string) => {
        const newTask: Task = {
            id: Date.now(),
            text,
            completed: false,
            date: toYYYYMMDD(selectedDate),
        };
        setTasks(prev => [...prev, newTask]);
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="bg-[#0a192f] min-h-screen text-white font-sans p-4 md:p-8 selection:bg-amber-500 selection:text-black flex flex-col">
            <style>{`.perspective-1000 { perspective: 1000px; } .animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <main className="max-w-7xl mx-auto flex flex-col gap-8 flex-grow w-full">
                <FlipClock />
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                        <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} tasks={tasks} />
                    </div>
                    <div className="lg:col-span-2">
                        <ToDo selectedDate={selectedDate} tasks={tasksForSelectedDay} onAddTask={addTask} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     <ProductivityStats tasks={todayTasks} />
                    <WeatherWidget />
                    <QuoteOfTheDay />
                    <div className="lg:col-span-2">
                        <GeminiGoalGenerator />
                    </div>
                    <WorldClock />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
