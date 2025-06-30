import { completeTask, getPendingTasks } from '../../services/tasks.service';
import { useEffect, useState } from 'react';
import { Task } from '../../models/task.model';
import FileUpload from '../../lib/upload.props';

export default function TasksTab() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

        if (loading) {
            return <p>Cargando tareas…</p>;
          }
          if (error) {
            return <p className="text-red-500">{error}</p>;
          }
          if (tasks.length === 0) {
            return <p>No hay tareas para mostrar.</p>;
          }

          return (
            <div className="max-w-3xl mx-auto p-4">
              <h2 className="text-3xl font-medium mb-8 text-gray-900">Tareas</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {tasks.map(task => (
                  <li
                    key={task.id}
                    className="p-6 border border-gray-100 rounded-2xl bg-white shadow transition-transform hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-base text-gray-500 mt-2">{task.description}</p>
                    <p className="text-sm text-gray-400 mt-4">Estado: <span className="font-medium text-gray-700">{task.status}</span></p>
                    <p className="text-sm text-gray-400 mt-2">Fecha límite: <span className="font-medium text-gray-700">{new Date(task.dueDate).toLocaleDateString('es-PE')}</span></p>
          
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="mt-6 inline-block text-sm font-medium text-white bg-black px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                      Completar
                    </button>
                    <div className="mt-4">
                      <FileUpload taskId={task.id} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
          
}