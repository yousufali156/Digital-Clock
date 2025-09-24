import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DateModal: React.FC<DateModalProps> = ({ isOpen, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // first & last day of the month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const today = new Date();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 rounded-2xl p-6 w-full max-w-lg text-center shadow-xl shadow-green-700/40 border border-green-700/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={prevMonth}
                className="px-3 py-1 rounded bg-green-800/30 text-green-300 hover:bg-green-700/50 transition"
              >
                ◀
              </button>
              <h2 className="text-xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]">
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <button
                onClick={nextMonth}
                className="px-3 py-1 rounded bg-green-800/30 text-green-300 hover:bg-green-700/50 transition"
              >
                ▶
              </button>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-2 text-green-400 font-semibold">
              {daysOfWeek.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2 mt-2">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const d = i + 1;
                const isToday =
                  d === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear();

                return (
                  <div
                    key={d}
                    className={`p-2 rounded-lg cursor-pointer transition
                      ${
                        isToday
                          ? "bg-green-600 text-black font-bold shadow-lg"
                          : "bg-green-900/30 text-green-200 hover:bg-green-700/50"
                      }`}
                  >
                    {d}
                  </div>
                );
              })}
            </div>

            {/* Close Button */}
            <div className="mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded bg-green-700 text-black font-semibold hover:bg-green-600 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DateModal;
