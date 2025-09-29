Futuristic Dashboard - A Modern Personal Productivity Hub
➡️ [Live Demo] (https://digitalclockmulticalculator.vercel.app/)

This is a modern, fully responsive, and feature-rich personal dashboard built with React, TypeScript, and Tailwind CSS. It combines several useful widgets into a single, beautiful interface with a futuristic aesthetic, featuring glassmorphism effects and smooth animations.

✨ Key Features
This dashboard is packed with widgets designed to boost your productivity and keep you informed:

🕰️ Core Timekeeping:

Animated Flip Clock: A classic flip clock with smooth 3D animations, showing hours, minutes, seconds, and AM/PM. Includes a Stopwatch and Timer.

Premium Analog Clock: A beautifully designed analog clock with multiple themes (Cosmic Glow, Golden View, Digital Sports).

World Clock: Displays the current time in major cities around the world.

🛠️ Productivity Tools:

Interactive Calendar: A full-month calendar to view and select dates.

Date-Based To-Do List: A powerful task manager to add, complete, and delete tasks for any selected day.

Productivity Stats: A widget that visualizes your daily task completion progress.

Calculator Hub: A massive collection of over 22 calculators, including General, Scientific, BMI, Financial, and more.

🌐 Live Information & Motivation:

Live Weather Widget: Automatically detects the user's location and displays real-time weather information from the OpenWeather API.

Gemini Goal Suggester: An AI-powered widget that provides 100 different goal ideas to stay motivated.

Quote of the Day: Shows a new inspirational quote daily.

🎨 Modern UI/UX:

Stunning Interface: A beautiful dark-mode UI with a cyan and amber color scheme.

Glassmorphism Effects: Modern glass-like card components for a futuristic feel.

Smooth Animations: Fluid animations powered by Framer Motion.

Fully Responsive: The layout is designed to work seamlessly on all devices.

🛠️ Tech Stack & APIs
Frontend: React.js, TypeScript

Build Tool: Vite

Styling: Tailwind CSS

Animation: Framer Motion

APIs:

OpenWeather API (for live weather)

Gemini API (for goal suggestions)

Browser Geolocation API

📂 Project Structure
The project is organized into a clean and maintainable folder structure.

<details>
<summary>Click to view the full project structure</summary>

/
├── .env
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src
    ├── App.tsx
    ├── App.css
    ├── index.css
    ├── main.tsx
    ├── types.ts
    ├── env.d.ts
    ├── assets/
    ├── components/
    │   ├── AnalogClock.tsx
    │   ├── Calendar.tsx
    │   ├── DateModal.tsx
    │   ├── FlipClock.tsx
    │   ├── Footer.tsx
    │   ├── GeminiGoalGenerator.tsx
    │   ├── GlassCard.tsx
    │   ├── HomePage.tsx
    │   ├── Icons.tsx
    │   ├── Layout.tsx
    │   ├── ProductivityStats.tsx
    │   ├── QuoteOfTheDay.tsx
    │   ├── ToDo.tsx
    │   ├── WeatherWidget.tsx
    │   ├── WorldClock.tsx
    │   └── calculatorHub/
    │       ├── AgeCalculator.tsx
    │       ├── BMICalculator.tsx
    │       ├── Calculator.tsx
    │       ├── CalculatorUtils.tsx
    │       └── (and 20+ other calculator components...)
    └── utils/
        └── helpers.ts

</details>

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Make sure you have Node.js (version 16 or later) and npm installed on your machine.

Installation
Clone the repository:

git clone [https://github.com/yousufali156/Digital-Clock.git](https://github.com/yousufali156/Digital-Clock.git)

Navigate to the project directory:

cd Digital-Clock

Install NPM packages:

npm install

Environment Variables
To run this project, you will need to add the following environment variables to your .env file in the root directory.

Create a .env file and add the following:

VITE_OPENWEATHER_KEY="YOUR_OPENWEATHER_API_KEY"

You can get a free API key from OpenWeatherMap.

Running the Application
To start the development server, run the following command:

npm run dev

The application will be available at http://localhost:5173 (or another port if 5173 is in use).

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📜 License
Distributed under the MIT License. See LICENSE for more information.

👤 About The Author
Md. Yousuf Ali

Passionate Full Stack Developer (MERN) with a strong focus on building high-performance, scalable, and user-centric web applications. Eager to join a forward-thinking team that values innovation, mentorship, and meaningful impact through technology.

Portfolio: yousufali-portfolio.vercel.app

GitHub: @yousufali156

LinkedIn: in/yousufali156