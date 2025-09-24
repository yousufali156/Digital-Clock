import React from 'react';
import Layout from './Layout';
import FlipClock from './FlipClock';
import WeatherWidget from './WeatherWidget';
import TodoApp from './ToDo';
import QuoteCard from './QuoteOfTheDay';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <section id="flipclock" className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Flip Clock</h2>
        <FlipClock />
      </section>

      <section id="weather" className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Weather Widget</h2>
        <WeatherWidget />
      </section>

      <section id="todo" className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Todo App</h2>
        <TodoApp />
      </section>

      <section id="quote" className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Quote of the Day</h2>
        <QuoteCard />
      </section>
    </Layout>
  );
};

export default HomePage;
