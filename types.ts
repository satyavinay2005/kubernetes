
export type TaskStatus = 'Pending' | 'Running' | 'Succeeded' | 'Failed';

export interface Task {
  id: number;
  command: string;
  status: TaskStatus;
  logs: string[];
}

export type View = 'runner' | 'files' | 'generator' | 'kubectl';
