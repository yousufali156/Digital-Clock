import React, { useState, useMemo } from 'react';
import GlassCard from './GlassCard';
import { toYYYYMMDD } from '../utils/helpers';
import { ChevronLeft, ChevronRight } from './Icons';
import type { Task } from '../types';

interface CalendarProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    tasks: Task[];
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange, tasks }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
    const taskDates = useMemo(() => new Set(tasks.map(task => task.date)), [tasks]);

    const changeMonth = (offset: number) => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const monthYearString = currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    return (
        <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-white/20"><ChevronLeft /></button>
                <h2 className="text-xl font-bold text-cyan-300">{monthYearString}</h2>
                <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-white/20"><ChevronRight /></button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm text-white/60 mb-2">
                {/* Fixed the duplicate key warning by using index */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <div key={`${day}-${index}`}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
                {Array.from({ length: daysInMonth }).map((_, day) => {
                    const dayNumber = day + 1;
                    const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber);
                    const dateStr = toYYYYMMDD(dateObj);
                    const isSelected = toYYYYMMDD(selectedDate) === dateStr;
                    const hasTask = taskDates.has(dateStr);
                    return (
                        <div key={dayNumber}
                             className={`relative flex items-center justify-center h-10 rounded-full cursor-pointer transition-colors ${isSelected ? 'bg-amber-500 text-white font-bold' : 'hover:bg-cyan-500/50'}`}
                             onClick={() => onDateChange(dateObj)}>
                            {dayNumber}
                            {hasTask && <div className="absolute bottom-1 w-1.5 h-1.5 bg-amber-400 rounded-full"></div>}
                        </div>
                    );
                })}
            </div>
        </GlassCard>
    );
};

export default Calendar;

