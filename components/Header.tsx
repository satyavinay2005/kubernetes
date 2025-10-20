
import React from 'react';
import type { View } from '../types';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavLink: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-indigo-500 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {label}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="bg-gray-800 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m-9 9h18" />
            </svg>
            <span className="text-xl font-bold ml-3 text-white">Kubernetes Task Runner</span>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink label="Task Runner" isActive={currentView === 'runner'} onClick={() => setView('runner')} />
            <NavLink label="Deployment Files" isActive={currentView === 'files'} onClick={() => setView('files')} />
            <NavLink label="Pod Manifest Generator" isActive={currentView === 'generator'} onClick={() => setView('generator')} />
            <NavLink label="kubectl" isActive={currentView === 'kubectl'} onClick={() => setView('kubectl')} />
          </div>
        </div>
      </nav>
    </header>
  );
};
