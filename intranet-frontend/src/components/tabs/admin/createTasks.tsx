import React, { useState } from "react";

export interface Tasks {
  name: string,
  description: string,
  completionDate: string,
}
export default function CreateTasks() {
  
const [tasks, setTasks] = useState<Tasks[]>([]);
const [newName, setNewname] = useState<string>("");
const [newDescription, setNewDescription] = useState<string>("");
const [newCompletionDate, setNewCompletionDate] = useState<string>("");

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  addTask();
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  switch (name) {
    case "name":
      setNewname(value);
      break;
    case "description":
      setNewDescription(value);
      break;
    case "completionDate":
      setNewCompletionDate(value);
      break;
    default:
      break;
  }
};

const addTask = () => {
  if (!newName || !newDescription || !newCompletionDate) return;

  const newTask: Tasks = {
    name: newName,
    description: newDescription,
    completionDate: newCompletionDate
  };
  
  setTasks(prev => [...prev, newTask]);
  setNewname("");
  setNewDescription("");
  setNewCompletionDate("");
};

const deleteTask = (index: number) => {
  setTasks(prev => prev.filter((_, i) => i !== index));
};

return (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Crear Nueva Tarea</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={newName}
        onChange={handleChange}
        placeholder="Nombre de la tarea"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="description"
        value={newDescription}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="completionDate"
        value={newCompletionDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button 
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar Tarea
      </button>
    </form>
    
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-2">Tareas Creadas:</h3>
      {tasks.map((task, index) => (
        <div key={index} className="border p-2 mb-2 rounded">
          
          <p><strong>Nombre:</strong> {task.name}</p>
          <p><strong>Descripción:</strong> {task.description}</p>
          <p><strong>Fecha de finalización:</strong> {task.completionDate}</p>
        <button onClick={() => deleteTask(0)} className="bg-red-500 text-white px-4 py-2 rounded">
        Eliminar Tarea
        </button>
        </div>
      ))}
    </div>
  </div>
);
}
