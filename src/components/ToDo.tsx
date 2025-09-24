import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { Plus, Trash2 } from './Icons';
import type { Task } from '../types';

interface ToDoProps {
    selectedDate: Date;
    tasks: Task[];
    onAddTask: (text: string) => void;
    onToggleTask: (id: number) => void;
    onDeleteTask: (id: number) => void;
}

const ToDo: React.FC<ToDoProps> = ({ selectedDate, tasks, onAddTask, onToggleTask, onDeleteTask }) => {
    const [input, setInput] = useState('');

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '') return;
        onAddTask(input);
        setInput('');
    };

    const formattedDate = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    return (
        <GlassCard className="p-6 h-full">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Tasks for <span className="text-cyan-400">{formattedDate}</span></h2>
            <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a new task..."
                       className="w-full bg-black/30 text-white p-2 rounded-md border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"/>
                <button type="submit" className="bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600 transition-colors"><Plus /></button>
            </form>
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {tasks.length > 0 ? tasks.map(task => (
                    <li key={task.id} className="flex items-center justify-between bg-black/20 p-3 rounded-md animate-fade-in">
                        <span className={`cursor-pointer ${task.completed ? 'line-through text-white/50' : ''}`} onClick={() => onToggleTask(task.id)}>{task.text}</span>
                        <button onClick={() => onDeleteTask(task.id)} className="text-red-500 hover:text-red-400"><Trash2 size={18} /></button>
                    </li>
                )) : (<p className="text-center text-white/50 pt-8">No tasks for this day.</p>)}
            </ul>
        </GlassCard>
    );
};

export default ToDo;
