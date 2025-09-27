import React, { useState, useMemo, useEffect } from 'react';
import Layout from './Layout';
import FlipClock from './FlipClock';
import WeatherWidget from './WeatherWidget';
import ToDo from './ToDo'; // Corrected component name casing
import QuoteOfTheDay from './QuoteOfTheDay'; // Corrected component name casing
import Calendar from './Calendar'; // Calendar is needed for ToDo to work with dates
import type { Task } from '../types'; // Import the Task type
import { toYYYYMMDD } from '../utils/helpers';

const HomePage: React.FC = () => {
    // State for managing the list of tasks, loading from localStorage.
    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const savedTasks = localStorage.getItem('tasks');
            return savedTasks ? JSON.parse(savedTasks) : [
                 { id: 1, text: "Welcome to your dashboard!", completed: false, date: toYYYYMMDD(new Date()) },
            ];
        } catch (error) {
            console.error("Could not parse tasks from localStorage", error);
            return [];
        }
    });

    // Effect to save tasks to localStorage whenever they change.
    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error("Could not save tasks to localStorage", error);
        }
    }, [tasks]);
    
    // State for the currently selected date in the calendar.
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    // Memoized value to filter tasks for the selected day only.
    const tasksForSelectedDay = useMemo(() => tasks.filter(task => task.date === toYYYYMMDD(selectedDate)), [selectedDate, tasks]);

    // Function to add a new task.
    const addTask = (text: string) => {
        const newTask: Task = {
            id: Date.now(),
            text,
            completed: false,
            date: toYYYYMMDD(selectedDate),
        };
        setTasks(prev => [...prev, newTask]);
    };

    // Function to toggle a task's completed status.
    const toggleTask = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    // Function to delete a task.
    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <Layout>
            <section id="flipclock" className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-center text-cyan-300">Digital Clock</h2>
                <FlipClock />
            </section>
            
            {/* Calendar and ToDo are now in a responsive grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
                <div className="lg:col-span-3">
                    <h2 className="text-2xl font-bold mb-4 text-center text-cyan-300">Calendar</h2>
                    <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} tasks={tasks} />
                </div>
                <div className="lg:col-span-2">
                     <h2 className="text-2xl font-bold mb-4 text-center text-cyan-300">Todo App</h2>
                    <ToDo 
                        selectedDate={selectedDate} 
                        tasks={tasksForSelectedDay} 
                        onAddTask={addTask} 
                        onToggleTask={toggleTask} 
                        onDeleteTask={deleteTask} 
                    />
                </div>
            </div>

            <section id="weather" className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-center text-cyan-300">Weather Widget</h2>
                <WeatherWidget />
            </section>

            <section id="quote" className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-center text-cyan-300">Quote of the Day</h2>
                <QuoteOfTheDay />
            </section>
        </Layout>
    );
};

export default HomePage;
