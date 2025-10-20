
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TaskRunner } from './components/TaskRunner';
import { DeploymentFilesViewer } from './components/DeploymentFilesViewer';
import { ManifestGenerator } from './components/ManifestGenerator';
import { KubectlSimulator } from './components/KubectlSimulator'; // Import new component
import type { Task, View } from './types';
import { InfoPanel } from './components/InfoPanel';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<View>('runner');

  const handleRunTask = useCallback((command: string) => {
    const newTask: Task = {
      id: Date.now(),
      command,
      status: 'Pending',
      logs: [`[${new Date().toISOString()}] Task created for command: "${command}"`],
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);

    // Simulate pod lifecycle
    setTimeout(() => {
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === newTask.id ? { ...t, status: 'Running', logs: [...t.logs, `[${new Date().toISOString()}] Pod starting...`] } : t
        )
      );
    }, 1500);

    setTimeout(() => {
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === newTask.id ? { ...t, status: 'Succeeded', logs: [...t.logs, `[${new Date().toISOString()}] Command executed successfully.`, `[${new Date().toISOString()}] Pod terminated.`] } : t
        )
      );
    }, 4000);
  }, []);

  const renderView = () => {
    switch (view) {
      case 'runner':
        return <TaskRunner onRunTask={handleRunTask} tasks={tasks} />;
      case 'files':
        return <DeploymentFilesViewer />;
      case 'generator':
        return <ManifestGenerator />;
      case 'kubectl': // Add new case
        return <KubectlSimulator />;
      default:
        return <TaskRunner onRunTask={handleRunTask} tasks={tasks} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header currentView={view} setView={setView} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {view === 'runner' && <InfoPanel />}
        {renderView()}
      </main>
    </div>
  );
};

export default App;
