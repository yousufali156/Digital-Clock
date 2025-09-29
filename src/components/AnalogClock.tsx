import { useState, useEffect } from "react";

// --- Helper: Get time for selected timezone ---
const getTimeInZone = (zone: string) =>
  new Date(new Date().toLocaleString("en-US", { timeZone: zone }));

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [timezone, setTimezone] = useState("Asia/Dhaka"); // Default: BD
  const [darkMode, setDarkMode] = useState(true);
  const [weather, setWeather] = useState<{ temp: number; icon: string } | null>(
    null
  );
  const [alarm, setAlarm] = useState<string | null>(null);

  // ⏱ Update Time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTimeInZone(timezone));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timezone]);

  // 🌤 Dummy Weather (API integration possible)
  useEffect(() => {
    setWeather({ temp: 29, icon: "☀️" }); // replace with API call
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Sweep effect (smooth)
  const secondsRotation = seconds * 6;
  const minutesRotation = minutes * 6 + seconds * 0.1;
  const hoursRotation = (hours % 12) * 30 + minutes * 0.5;

  const day = time.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const month = time.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const date = String(time.getDate()).padStart(2, "0");
  const year = time.getFullYear();

  return (
    <div
      className="relative w-96 h-96 rounded-full flex items-center justify-center transition-colors duration-700"
      style={{
        background: darkMode
          ? "radial-gradient(circle at 30% 30%, #1e1e1e, #000)"
          : "radial-gradient(circle at 30% 30%, #f0f0f0, #ccc)",
        boxShadow: darkMode
          ? "inset 0 -8px 20px rgba(255,255,255,0.05), inset 0 8px 20px rgba(0,0,0,0.6), 0 20px 40px rgba(0,0,0,0.9)"
          : "inset 0 -8px 20px rgba(0,0,0,0.05), inset 0 8px 20px rgba(255,255,255,0.8), 0 20px 40px rgba(0,0,0,0.3)",
      }}
    >
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-green-400/30 shadow-[0_0_25px_rgba(0,255,150,0.5)]"></div>

      {/* Glass Reflection */}
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
    className={darkMode ? "absolute text-green-400" : "absolute text-green-700"}
    style={{ transform: "translateX(-55px)" }}
  >
    {day}
  </div>
  <div
    className={darkMode ? "absolute text-green-400" : "absolute text-green-700"}
    style={{ transform: "translateX(35px)" }}
  >
    {month}
  </div>
  <div
    className={
      darkMode
        ? "absolute text-green-400 border border-green-400 px-1 py-0.5 rounded"
        : "absolute text-green-700 border border-green-700 px-1 py-0.5 rounded"
    }
    style={{ transform: "translateX(85px)" }}
  >
    {date}
  </div>
  <div
    className={darkMode ? "absolute text-white text-2xl" : "absolute text-black text-2xl"}
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
        className="absolute bottom-1/2 left-1/2 w-2.5 h-20 origin-bottom z-20 transition-transform duration-500"
        style={{
          transform: `translateX(-50%) rotate(${hoursRotation}deg)`,
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-800 rounded shadow-xl" />
      </div>

      {/* Minute Hand */}
      <div
        className="absolute bottom-1/2 left-1/2 w-2 h-28 origin-bottom z-20 transition-transform duration-500"
        style={{
          transform: `translateX(-50%) rotate(${minutesRotation}deg)`,
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-700 rounded shadow-lg" />
      </div>

      {/* Second Hand with Glow + Trail */}
      <div
        className="absolute bottom-1/2 left-1/2 w-1 h-32 origin-bottom z-30"
        style={{
          transform: `translateX(-50%) rotate(${secondsRotation}deg)`,
        }}
      >
        <div className="relative w-full h-full bg-red-500 shadow-[0_0_12px_rgba(255,0,0,0.8)]">
          <div className="absolute w-full h-full bg-red-500/40 blur-md top-0 left-0" />
        </div>
      </div>

      {/* Center Cap */}
      <div className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-red-500 to-red-800 border border-white shadow-md z-40" />

      {/* Digital Clock Overlay */}
      <div className="absolute bottom-6 text-green-400 text-xl font-mono tracking-wider z-30">
        {time.toLocaleTimeString("en-US", { hour12: true })}
      </div>

      {/* Weather Info */}
      {weather && (
        <div className="absolute top-6 left-8 text-green-400 text-sm">
          {weather.icon} {weather.temp}°C
        </div>
      )}

      {/* Alarm Indicator */}
      {alarm && (
        <div className="absolute bottom-14 text-yellow-400 text-sm animate-pulse">
          🔔 Alarm set: {alarm}
        </div>
      )}

      {/* Timezone Selector */}
      <div className="absolute -bottom-12 w-full flex justify-center">
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="px-2 py-1 text-sm rounded bg-black text-green-400 border border-green-400"
        >
          <option value="Asia/Dhaka">Dhaka</option>
          <option value="America/New_York">New York</option>
          <option value="Europe/London">London</option>
          <option value="Asia/Tokyo">Tokyo</option>
        </select>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute -top-12 px-2 py-1 rounded bg-gray-700 text-white text-sm shadow"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
};

export default AnalogClock;
