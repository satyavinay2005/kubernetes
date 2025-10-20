
import React, { useState } from 'react';
import type { Task, TaskStatus } from '../types';

const statusStyles: Record<TaskStatus, { dot: string; text: string; bg: string }> = {
  Pending: { dot: 'bg-yellow-400', text: 'text-yellow-400', bg: 'bg-yellow-900/50' },
  Running: { dot: 'bg-blue-400', text: 'text-blue-400', bg: 'bg-blue-900/50' },
  Succeeded: { dot: 'bg-green-400', text: 'text-green-400', bg: 'bg-green-900/50' },
  Failed: { dot: 'bg-red-400', text: 'text-red-400', bg: 'bg-red-900/50' },
};

export const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const [showLogs, setShowLogs] = useState(false);
  const { dot, text, bg } = statusStyles[task.status];

  return (
    <div className={`p-4 rounded-lg transition-colors duration-300 ${bg}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${text} font-semibold`}>
            <span className={`h-3 w-3 rounded-full ${dot} ${task.status === 'Running' ? 'animate-pulse' : ''}`}></span>
            <span>{task.status}</span>
          </div>
          <code className="bg-gray-900/80 text-gray-300 px-3 py-1 rounded-md text-sm">{task.command}</code>
        </div>
        <button
          onClick={() => setShowLogs(!showLogs)}
          className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-1 px-3 rounded-lg text-sm transition-all duration-200 flex items-center gap-1"
        >
          {showLogs ? 'Hide' : 'Show'} Logs
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${showLogs ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {showLogs && (
        <div className="mt-4 p-4 bg-black/50 rounded-lg">
          <pre className="text-gray-400 text-xs whitespace-pre-wrap font-mono">
            {task.logs.join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
};
