import React from 'react';
import GlassCard from './GlassCard';
import type { Task } from '../types';

interface ProductivityStatsProps {
    tasks: Task[];
}

const ProductivityStats: React.FC<ProductivityStatsProps> = ({ tasks }) => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <GlassCard className="p-6 h-full flex flex-col justify-center">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">Productivity Stats</h2>
            <div className="text-center">
                <p className="text-4xl font-bold text-amber-400">{completedTasks}<span className="text-2xl text-white/70">/{totalTasks}</span></p>
                <p className="text-sm text-white/80">Tasks Completed Today</p>
                <div className="w-full bg-black/30 rounded-full h-2.5 mt-4">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        </GlassCard>
    );
};

export default ProductivityStats;
