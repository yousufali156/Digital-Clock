import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import { Sun } from './Icons';

interface WeatherData {
    name: string;
    temp: number;
    condition: string;
}

const WeatherWidget: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async (lat: number, lon: number) => {
            try {
                // একটি বাস্তব API Key প্রয়োজন হবে। এটি একটি ডেমো।
                // const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
                // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
                // const response = await fetch(url);
                // const data = await response.json();
                // setWeather({ name: data.name, temp: Math.round(data.main.temp), condition: data.weather[0].main });
                
                 setTimeout(() => {
                    setWeather({ name: 'Your Location', temp: 31, condition: 'Clear' });
                }, 1000);

            } catch (err) {
                setError('Could not fetch weather data.');
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    setError('Location access denied. Showing default weather.');
                     setTimeout(() => {
                        setWeather({ name: 'Rajshahi', temp: 31, condition: 'Clear' });
                    }, 1000);
                }
            );
        } else {
            setError('Geolocation is not supported by your browser.');
        }
    }, []);

    return (
        <GlassCard className="p-6 flex flex-col items-center justify-center h-full">
            {error && !weather && <p className="text-amber-400 text-sm">{error}</p>}
            {!weather && !error && <p>Loading weather...</p>}
            {weather && (
                <>
                    <h2 className="text-xl font-bold text-cyan-300 mb-2">{weather.name}</h2>
                    <div className="flex items-center gap-4">
                        <Sun className="text-yellow-300" size={56} />
                        <div>
                            <p className="text-4xl font-bold">{weather.temp}°C</p>
                            <p className="text-white/80">{weather.condition}</p>
                        </div>
                    </div>
                </>
            )}
        </GlassCard>
    );
};

export default WeatherWidget;
