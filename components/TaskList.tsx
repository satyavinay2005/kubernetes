
import React from 'react';
import type { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-400">Task Executions</h2>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No tasks have been run yet.</p>
        ) : (
          tasks.map(task => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};
