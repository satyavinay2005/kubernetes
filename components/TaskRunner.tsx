
import React, { useState } from 'react';
import type { Task } from '../types';
import { TaskList } from './TaskList';

interface TaskRunnerProps {
  onRunTask: (command: string) => void;
  tasks: Task[];
}

export const TaskRunner: React.FC<TaskRunnerProps> = ({ onRunTask, tasks }) => {
  const [command, setCommand] = useState<string>('echo "Hello from Kubernetes Pod"');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onRunTask(command.trim());
      setCommand('');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-400">Create New Task</h2>
        <p className="text-gray-400 mb-6">
          Enter a shell command to run inside a new, temporary Kubernetes pod (using a <code className="bg-gray-700 text-sm p-1 rounded">busybox</code> image).
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-grow w-full relative">
             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="e.g., ls -la /"
              className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 text-gray-200"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 duration-200 shadow-md flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Run Task in Pod
          </button>
        </form>
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
};
