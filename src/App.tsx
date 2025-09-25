import React, { useState, useEffect, useMemo } from 'react';
import FlipClock from './components/FlipClock';
import Calendar from './components/Calendar';
import ToDo from './components/ToDo';
import WeatherWidget from './components/WeatherWidget';
import ProductivityStats from './components/ProductivityStats';
import GeminiGoalGenerator from './components/GeminiGoalGenerator';
import QuoteOfTheDay from './components/QuoteOfTheDay';
import WorldClock from './components/WorldClock';
import Footer from './components/Footer';
import type { Task } from './types'; 
import { toYYYYMMDD } from './utils/helpers';
import Calculator from './components/Calculator Hub/Calculator';

const App: React.FC = () => {
    // This state manages the list of tasks, loading them from localStorage on initial render.
    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const savedTasks = localStorage.getItem('tasks');
            // If tasks are found in localStorage, parse them, otherwise use default tasks.
            return savedTasks ? JSON.parse(savedTasks) : [
                 { id: 1, text: "Review new dashboard design", completed: true, date: toYYYYMMDD(new Date()) },
                 { id: 2, text: "Test calculator hub", completed: false, date: toYYYYMMDD(new Date()) },
            ];
        } catch (error) {
            console.error("Could not parse tasks from localStorage", error);
            return [];
        }
    });

    // This effect saves the tasks to localStorage whenever the tasks state changes.
    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error("Could not save tasks to localStorage", error);
        }
    }, [tasks]);

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    
    // Filters tasks for the currently selected day in the calendar.
    const tasksForSelectedDay = useMemo(() => tasks.filter(task => task.date === toYYYYMMDD(selectedDate)), [selectedDate, tasks]);
    // Filters tasks for today to show in the productivity stats.
    const todayTasks = useMemo(() => tasks.filter(task => task.date === toYYYYMMDD(new Date())), [tasks]);

    // Adds a new task for the selected date.
    const addTask = (text: string) => {
        const newTask: Task = { id: Date.now(), text, completed: false, date: toYYYYMMDD(selectedDate) };
        setTasks(prev => [...prev, newTask]);
    };

    // Toggles the completed status of a task.
    const toggleTask = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    // Deletes a task from the list.
    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="bg-[#0a192f] min-h-screen text-white font-sans p-4 md:p-8 selection:bg-amber-500 selection:text-black flex flex-col">
            <style>{`.perspective-1000 { perspective: 1000px; } .animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <main className="max-w-7xl mx-auto flex flex-col gap-8 flex-grow w-full">
                <FlipClock />
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3"> <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} tasks={tasks} /> </div>
                    <div className="lg:col-span-2"> <ToDo selectedDate={selectedDate} tasks={tasksForSelectedDay} onAddTask={addTask} onToggleTask={toggleTask} onDeleteTask={deleteTask} /> </div>
                </div>
                
                {/* The Calculator Hub is placed here in a full-width container to make it a central feature. */}
                <div className="w-full">
                    <Calculator />
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

