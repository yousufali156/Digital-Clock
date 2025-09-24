import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Digital Clock</h1>
        <nav className="hidden md:flex gap-4">
          <a href="#flipclock" className="hover:underline">Flip Clock</a>
          <a href="#weather" className="hover:underline">Weather</a>
          <a href="#todo" className="hover:underline">Todo</a>
          <a href="#quote" className="hover:underline">Quote</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
        &copy; {new Date().getFullYear()} Digital Clock. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
