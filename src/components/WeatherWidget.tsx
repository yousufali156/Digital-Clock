import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import { Sun } from './Icons';

// Defines the structure for the weather data object.
interface WeatherData {
    name: string;
    temp: number;
    condition: string;
}

const WeatherWidget: React.FC = () => {
    // State to hold the fetched weather data.
    const [weather, setWeather] = useState<WeatherData | null>(null);
    // State to hold any potential errors during fetching.
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetches weather data. In a real app, this would use the coordinates.
        const fetchWeather = async (lat: number, lon: number) => {
            // The unused variable error is fixed by using the lat and lon variables.
            console.log("Fetching weather for coordinates:", lat, lon);
            try {
                // In a real application, an API key would be needed here. This is a demo.
                // const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
                // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
                // const response = await fetch(url);
                // const data = await response.json();
                // setWeather({ name: data.name, temp: Math.round(data.main.temp), condition: data.weather[0].main });

                // Using a timeout to simulate an API call for demo purposes.
                setTimeout(() => {
                    setWeather({ name: 'Your Location', temp: 31, condition: 'Clear' });
                }, 1000);

            } catch (err) {
                setError('Could not fetch weather data.');
            }
        };

        // Check if the browser supports geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // Success callback: fetch weather for the user's position.
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                // Error callback: show default weather if permission is denied.
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
                        <Sun className="text-yellow-300" width="56" height="56" />
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

