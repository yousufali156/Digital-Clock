import { useState, useEffect } from "react";

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secondsRotation = seconds * 6;
  const minutesRotation = minutes * 6 + seconds * 0.1;
  const hoursRotation = (hours % 12) * 30 + minutes * 0.5;

  const day = time.toLocaleDateString("en-US", {
    weekday: "short",
  }).toUpperCase();
  const month = time.toLocaleDateString("en-US", {
    month: "short",
  }).toUpperCase();
  const date = String(time.getDate()).padStart(2, "0");
  const year = time.getFullYear();

  return (
    <div
      className="relative w-96 h-96 rounded-full flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at 30% 30%, #1e1e1e, #000)",
        boxShadow:
          "inset 0 -8px 20px rgba(255,255,255,0.05), inset 0 8px 20px rgba(0,0,0,0.6), 0 20px 40px rgba(0,0,0,0.9)",
      }}
    >
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-green-400/30 shadow-[0_0_25px_rgba(0,255,150,0.5)]"></div>

      {/* Glass Reflection Overlay */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.2), transparent 70%)",
          }}
        />
      </div>

      {/* Digital Info */}
      <div className="absolute w-full h-full flex items-center justify-center text-lg font-sans font-bold z-10">
        <div
          className="absolute text-green-400"
          style={{ transform: "translateX(-55px)" }}
        >
          {day}
        </div>
        <div
          className="absolute text-green-400"
          style={{ transform: "translateX(35px)" }}
        >
          {month}
        </div>
        <div
          className="absolute text-green-400 border border-green-400 px-1 py-0.5 rounded"
          style={{ transform: "translateX(85px)" }}
        >
          {date}
        </div>
        <div
          className="absolute text-white text-2xl"
          style={{ transform: "translateY(65px)" }}
        >
          {year}
        </div>
      </div>

      {/* Tick Marks */}
      {Array.from({ length: 60 }).map((_, i) => {
        const isHourMark = i % 5 === 0;
        return (
          <div
            key={i}
            className="absolute w-full h-full flex justify-center"
            style={{ transform: `rotate(${i * 6}deg)` }}
          >
            <div
              className={`${
                isHourMark
                  ? "w-1.5 h-6 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                  : "w-0.5 h-2 bg-white/70"
              } rounded`}
              style={{ transform: "translateY(12px)" }}
            />
          </div>
        );
      })}

      {/* Numbers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const number = i + 1;
        const angle = number * 30;
        return (
          <div
            key={number}
            className="absolute w-full h-full flex items-start justify-center"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <span
              className="text-2xl font-sans font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
              style={{
                transform: `rotate(-${angle}deg) translateY(40px)`,
              }}
            >
              {number}
            </span>
          </div>
        );
      })}

      {/* Hour Hand */}
      <div
        className="absolute bottom-1/2 left-1/2 w-2.5 h-20 origin-bottom z-20"
        style={{
          transform: `translateX(-50%) rotate(${hoursRotation}deg)`,
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-800 rounded shadow-xl" />
      </div>

      {/* Minute Hand */}
      <div
        className="absolute bottom-1/2 left-1/2 w-2 h-28 origin-bottom z-20"
        style={{
          transform: `translateX(-50%) rotate(${minutesRotation}deg)`,
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-700 rounded shadow-lg" />
      </div>

      {/* Second Hand with Glow */}
      <div
        className="absolute bottom-1/2 left-1/2 w-1 h-32 origin-bottom z-30"
        style={{
          transform: `translateX(-50%) rotate(${secondsRotation}deg)`,
        }}
      >
        <div className="w-full h-full bg-red-500 shadow-[0_0_12px_rgba(255,0,0,0.8)] animate-pulse" />
      </div>

      {/* Center Cap */}
      <div className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-red-500 to-red-800 border border-white shadow-md z-40" />
    </div>
  );
};

export default AnalogClock;
