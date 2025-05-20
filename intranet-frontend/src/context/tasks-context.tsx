import { createContext, useState, useCallback } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    done: boolean;
}

interface TaskContextType {
    tasks: Task[];
    fetchTasks: () => Promise<void>;
    toggleTaskDone: (id: number) => Promise<void>;
    addTask: (title: string, description: string) => Promise<void>;
    userRole: "admin" | "employee";
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
    children: React.ReactNode;
    initialUserRole?: "admin" | "employee";
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children, initialUserRole = 'employee' }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [userRole] = useState<"admin" | "employee">(initialUserRole);

    const fetchTasks = useCallback(async () => {
        try {
            const res = await fetch("/tasks");
            if (!res.ok) throw new Error("Failed to fetch tasks");
            const data = await res.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }, []);

    const addTask = useCallback(async (title: string, description: string) => {
        if (userRole !== "admin") {
            console.warn("Only admin can add tasks");
            return;
        }
        if (!title.trim() || !description.trim()) {
            console.warn("Title and description are required");
            return;
        }

        try {
            const res = await fetch("/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description }),
            });
            if (!res.ok) throw new Error("Failed to create task");

            const newTask = await res.json();
            setTasks(prev => [...prev, newTask]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }, [userRole]);

    const toggleTaskDone = useCallback(async (id: number) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        try {
            const res = await fetch(`/tasks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ done: !task.done }),
            });
            if (!res.ok) throw new Error("Failed to update task");

            const updatedTask = await res.json();
            setTasks(prev => prev.map(t => (t.id === id ? updatedTask : t)));
        } catch (error) {
            console.error("Error toggling task done:", error);
        }
    }, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, fetchTasks, addTask, toggleTaskDone, userRole }}>
            {children}
        </TaskContext.Provider>
    );
};