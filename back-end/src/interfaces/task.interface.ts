import { BaseEntity } from "./base.interface";

export enum TaskStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
}

export interface Task extends BaseEntity {
    title: string;
    description: string;
    status: TaskStatus;
    assignedTo: number;
}

export type CreateTaskDTO = Omit<Task, keyof BaseEntity>;

export type UpdateTaskDTO = Partial<Pick<Task, 'title' | 'description' | 'status'>>;