export type Status = "pending" | "completed"

export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status,
  dueDate: string;
}

export type CreateTaskDTO  = Pick<Task, 'title' | 'description' | 'dueDate'>;