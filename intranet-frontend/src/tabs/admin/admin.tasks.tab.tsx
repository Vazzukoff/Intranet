import { useState, useEffect } from "react";
import { getTasks, deleteTask } from "../../services/tasks.service";
import { Task } from "../../models/task.model";
import { PiEmptyFill } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";

export default function AdminTasksTab() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
    
  useEffect(() => {
    setLoading(true);
    getTasks()
      .then(fetched => {
        setTasks(fetched);
        setError(null);
      })
      .catch(err => {
      console.error(err);
      setError('Error al obtener las tareas pendientes');
      })
      .finally(() => {
      setLoading(false);
      });
    }, []);
    
  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error al eliminar la tarea:', err);
      setError('Error al eliminar la tarea');
    }
  };

  if (loading) {
    return <p>Cargando tareas…</p>;
    }
    if (error) {
      return <p className="text-red-500">{error}</p>;
    }
    if (tasks.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <PiEmptyFill className="w-20 h-20 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No hay tareas
          </h2>
          <p className="text-gray-500 mb-4">
            ¡Crea una y empecemos a trabajar!
          </p>
        </div>
      );
    }
        
  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-10 tracking-tight">
        Todas las tareas
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tasks.map(task => (
          <li
            key={task.id}
            className="
              bg-white border-2 border-black rounded-xl shadow-sm
              p-5 transition-transform duration-200 hover:shadow-md
              h-80 flex flex-col
              "
          >
          {/* Título fijo */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {task.title}
          </h3>
        
          {/* Descripción con scroll */}
          <div className="flex-grow overflow-y-auto pr-2 mb-4">
            <p className="text-sm text-gray-500">
              {task.description}
            </p>
          </div>
        
          {/* Pie de la tarjeta */}
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">
              Fecha límite:
              <span className="font-medium text-gray-700 ml-2">
                {new Date(task.due_date).toLocaleDateString('es-PE')}
              </span>
            </p>
        
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="
                flex items-center gap-2 text-sm font-medium
                text-white border-2 border-red-600 bg-red-600
                rounded-md px-3 py-1 transition
                hover:bg-white hover:text-red-600 focus:outline-none
                "
            >
              <MdDeleteForever className="text-lg" />
              Eliminar
            </button>
          </div>
        </li>
        ))}
      </ul>
    </section>
  );
}