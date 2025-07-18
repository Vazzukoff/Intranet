export type Status = 'pending' | 'completed';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: Status;
    dueDate: Date
}