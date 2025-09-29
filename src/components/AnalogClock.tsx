import { useState, useEffect } from "react";

const getTimeInZone = (zone: string) =>
  new Date(new Date().toLocaleString("en-US", { timeZone: zone }));

const TIMEZONES = [
  "Asia/Dhaka", "Asia/Kolkata", "Asia/Tokyo", "Asia/Shanghai", "Asia/Singapore",
  "Asia/Seoul", "Asia/Bangkok", "Asia/Jakarta", "Asia/Kuala_Lumpur", "Asia/Manila",
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Moscow", "Europe/Rome",
  "Europe/Madrid", "Europe/Amsterdam", "Europe/Zurich", "Europe/Stockholm", "Europe/Oslo",
  "America/New_York", "America/Los_Angeles", "America/Chicago", "America/Denver",
  "America/Toronto", "America/Vancouver", "America/Mexico_City", "America/Sao_Paulo",
  "Australia/Sydney", "Australia/Melbourne", "Australia/Perth", "Australia/Brisbane"
];

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [timezone, setTimezone] = useState("Asia/Dhaka");
  const [darkMode, setDarkMode] = useState(true);

  const [temperature, setTemperature] = useState<number | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  const [alarm, setAlarm] = useState<string | null>(null);
  const [alarmInput, setAlarmInput] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => setTime(getTimeInZone(timezone)), 1000);
    return () => clearInterval(intervalId);
  }, [timezone]);

  // Weather Fetch
  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        if (data.main?.temp) setTemperature(Math.round(data.main.temp));
        if (data.name) setLocation(data.name);
      } catch (err) {
        console.error(err);
      }
    };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(23.8103, 90.4125) // fallback Dhaka
      );
    } else fetchWeather(23.8103, 90.4125);
  }, []);

  // Alarm
  useEffect(() => {
    if (alarm) {
      const current = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      if (current === alarm) {
        alert(`⏰ Alarm Ringing for ${alarm}!`);
        setAlarm(null);
      }
    }
  }, [time, alarm]);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secondsRotation = seconds * 6;
  const minutesRotation = minutes * 6 + seconds * 0.1;
  const hoursRotation = (hours % 12) * 30 + minutes * 0.5;

  const day = time.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const month = time.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const date = String(time.getDate()).padStart(2, "0");
  const year = time.getFullYear();

  return (
    <div className="flex flex-col mb-20 items-center justify-center w-full p-4">
      <div
        className={`relative w-[320px] sm:w-96 h-[320px] sm:h-96 rounded-full flex items-center justify-center transition-all duration-700`}
        style={{
          background: darkMode
            ? "radial-gradient(circle at 30% 30%, #1e1e1e, #000)"
            : "radial-gradient(circle at 30% 30%, #f0f0f0, #ccc)",
          boxShadow: darkMode
            ? "inset 0 -8px 20px rgba(255,255,255,0.05), inset 0 8px 20px rgba(0,0,0,0.6), 0 20px 40px rgba(0,0,0,0.9)"
            : "inset 0 -8px 20px rgba(0,0,0,0.05), inset 0 8px 20px rgba(255,255,255,0.8), 0 20px 40px rgba(0,0,0,0.3)",
          backdropFilter: "blur(8px)"
        }}
      >
        {/* Outer Glow */}
        <div className="absolute inset-0 rounded-full border-4 border-green-400/30 shadow-[0_0_25px_rgba(0,255,150,0.5)]"></div>
        {/* Glass Reflection */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.15), transparent 70%)" }} />
        </div>

        {/* Digital Date */}
        <div className="absolute w-full h-full flex items-center justify-center text-lg font-sans font-bold z-10">
          <div className={darkMode ? "absolute text-green-400" : "absolute text-green-700"} style={{ transform: "translateX(-55px)" }}>{day}</div>
          <div className={darkMode ? "absolute text-green-400" : "absolute text-green-700"} style={{ transform: "translateX(35px)" }}>{month}</div>
          <div className={darkMode ? "absolute text-green-400 border border-green-400 px-1 py-0.5 rounded" : "absolute text-green-700 border border-green-700 px-1 py-0.5 rounded"} style={{ transform: "translateX(85px)" }}>{date}</div>
          <div className={darkMode ? "absolute text-white text-2xl" : "absolute text-black text-2xl"} style={{ transform: "translateY(65px)" }}>{year}</div>
        </div>

        {/* Tick Marks & Numbers */}
        {Array.from({ length: 60 }).map((_, i) => {
          const isHourMark = i % 5 === 0;
          return <div key={i} className="absolute w-full h-full flex justify-center" style={{ transform: `rotate(${i * 6}deg)` }}>
            <div className={`${isHourMark ? "w-1.5 h-6 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" : "w-0.5 h-2 bg-white/70"} rounded`} style={{ transform: "translateY(12px)" }} />
          </div>;
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const number = i + 1;
          const angle = number * 30;
          return <div key={number} className="absolute w-full h-full flex items-start justify-center" style={{ transform: `rotate(${angle}deg)` }}>
            <span className="text-2xl font-sans font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" style={{ transform: `rotate(-${angle}deg) translateY(40px)` }}>{number}</span>
          </div>;
        })}

        {/* Hands */}
        <div className="absolute bottom-1/2 left-1/2 w-2.5 h-20 origin-bottom z-20 transition-transform duration-500" style={{ transform: `translateX(-50%) rotate(${hoursRotation}deg)` }}><div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-800 rounded shadow-xl" /></div>
        <div className="absolute bottom-1/2 left-1/2 w-2 h-28 origin-bottom z-20 transition-transform duration-500" style={{ transform: `translateX(-50%) rotate(${minutesRotation}deg)` }}><div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-700 rounded shadow-lg" /></div>
        <div className="absolute bottom-1/2 left-1/2 w-1 h-32 origin-bottom z-30" style={{ transform: `translateX(-50%) rotate(${secondsRotation}deg)` }}><div className="relative w-full h-full bg-red-500 shadow-[0_0_12px_rgba(255,0,0,0.8)]"><div className="absolute w-full h-full bg-red-500/40 blur-md top-0 left-0" /></div></div>

        {/* Center Cap */}
        <div className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-red-500 to-red-800 border border-white shadow-md z-40" />

        {/* Digital Clock */}
        <div className="absolute bottom-6 text-green-400 text-xl font-mono tracking-wider z-30">{time.toLocaleTimeString("en-US", { hour12: true })}</div>

        {/* Weather Info */}
        {temperature !== null && location && <div className="absolute top-6 left-4 sm:left-8 text-green-400 text-sm">🌡️ {temperature}°C — {location}</div>}

        {/* Alarm Indicator */}
        {alarm && <div className="absolute bottom-20 text-yellow-400 text-sm animate-pulse">🔔 Alarm set: {alarm}</div>}

        {/* Single Line Controls */}
        <div className="absolute -bottom-28 w-full flex flex-wrap justify-center items-center gap-2 sm:gap-3">
          <input type="time" value={alarmInput} onChange={(e) => setAlarmInput(e.target.value)} className="px-2 py-1 rounded bg-black text-green-400 border border-green-400 text-sm" />
          <button onClick={() => setAlarm(alarmInput)} className="px-3 py-1 rounded bg-green-500 text-black font-semibold text-sm shadow hover:bg-green-400">Set Alarm</button>
          <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="px-2 py-1 text-sm rounded bg-black text-green-400 border border-green-400">
            {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz.split("/")[1].replace("_", " ")}</option>)}
          </select>
        </div>

        {/* Theme Toggle */}
        <button onClick={() => setDarkMode(!darkMode)} className="absolute -top-12 px-2 py-1 rounded bg-gray-700 text-white text-sm shadow hover:bg-gray-600">{darkMode ? "☀️ Light" : "🌙 Dark"}</button>
      </div>
    </div>
  );
};

export default AnalogClock;
