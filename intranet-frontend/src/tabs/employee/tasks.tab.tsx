import { completeTask, getPendingTasks } from '../../services/tasks.service';
import { useEffect, useState } from 'react';
import { Task } from '../../models/task.model';
import FileUpload from '../../lib/upload.props';
import { PiEmptyFill } from "react-icons/pi";

export default function TasksTab() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{ [taskId: number]: boolean }>({});

  useEffect(() => {
    setLoading(true);
    getPendingTasks()
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

  const handleCompleteTask = async (taskId: number) => {
    try {
      await completeTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error al completar la tarea:', err);
      setError('Error al completar la tarea');
    }
  };

  const handleFileUploadSuccess = (taskId: number) => {
    setUploadStatus(prev => ({ ...prev, [taskId]: true }));
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
        Sin tareas pendientes
      </h2>
      <p className="text-gray-500 mb-4">
        ¡Estás al día!
      </p>
    </div>
  );
}

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-medium mb-8 text-gray-900">
        Tareas
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tasks.map(task => (
          <li
            key={task.id}
            className="
              bg-white border-2 border-black rounded-xl shadow-sm
              p-5 transition-transform duration-200 hover:shadow-md
              h-96 flex flex-col
              "
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {task.title}
            </h3>
          <div className="flex-grow overflow-y-auto pr-2 mb-4">
            <p className="text-sm text-gray-500">
              {task.description}
            </p>
          </div>
          
            {/* Fecha límite + botón en línea */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-400">
                Fecha límite:
                <span className="font-medium text-gray-700 ml-2">
                  {new Date(task.dueDate).toLocaleDateString('es-PE')}
                </span>
              </p>
              <button
                onClick={() => handleCompleteTask(task.id)}
                disabled={!uploadStatus[task.id]}
                className={`text-sm font-medium px-4 py-2 rounded-lg border-2 transition ${
                  uploadStatus[task.id]
                    ? 'bg-green-500 text-white border-transparent hover:bg-white hover:text-green-500 hover:border-green-500'
                    : 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                }`}
              >
                Completar
              </button>
            </div>
            <div className="mt-4">
              <FileUpload taskId={task.id} onUploadSuccess={() => handleFileUploadSuccess(task.id)} />
            </div>
          </li>        
        ))}
      </ul>
    </section>
  );
}