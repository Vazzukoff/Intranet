import { createTask } from '../../services/tasks.service';
import { CreateTaskDTO } from '../../models/task.model';
import { taskSchema } from '../../schemas/schemas';
import { useState } from 'react';
import { z } from 'zod';

const schema = taskSchema

type TasksForm = z.infer<typeof schema>;

export default function CreateTasksTab() {
    const [formData, setFormData] = useState<TasksForm>({
        title: "",
        description: "",
        dueDate: ""
    });

    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof TasksForm, string>>>({});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));

    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setError(null);
    setSuccess(null);
  };

    const handleCreateTask = async () => {
    setError(null);
    setSuccess(null);
        // Validar con Zod
    const validation = schema.safeParse(formData);
    if (!validation.success) {
      // Extraer errores por campo
      const errors = validation.error.flatten().fieldErrors;
      const newFieldErrors: Partial<Record<keyof TasksForm, string>> = {};
      if (errors.title?.[0]) newFieldErrors.title = errors.title[0];
      if (errors.description?.[0]) newFieldErrors.description = errors.description[0];
      setFieldErrors(newFieldErrors);

      // Mostrar primer error general si no hay errores específicos
      if (Object.keys(newFieldErrors).length === 0) {
        setError("Datos inválidos");
      }
      return;
    }
        const newTask: CreateTaskDTO = {
            title: formData.title,
            description: formData.description,
            dueDate: new Date().toISOString()
        };
        
        try {
            setLoading(true);
            await createTask(newTask);
            setSuccess("Tarea creada exitosamente");
            setFormData({ title:'', description: '', dueDate: '' });
        }   catch (err) {
            console.error('Error al crear la tarea:', err);
            setError("Error al crear la tarea, intenta de nuevo");
        }   finally {
            setLoading(false);
        }
        
    }

    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-2xl">
        <h2 className="text-2xl font-medium text-gray-900 mb-6">Crear Tarea</h2>
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 transition ${
                fieldErrors.title
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {fieldErrors.title && <p className="text-red-500 text-xs mt-1">{fieldErrors.title}</p>}
          </div>
    
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 transition ${
                fieldErrors.description
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {fieldErrors.description && <p className="text-red-500 text-xs mt-1">{fieldErrors.description}</p>}
          </div>
    
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 transition ${
                fieldErrors.dueDate
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-400'
              }`}
              required
            />
          </div>
    
          {error && <div className="text-red-500 text-sm" role="alert">{error}</div>}
          {success && <div className="text-green-500 text-sm" role="status">{success}</div>}
    
          <button
            onClick={handleCreateTask}
            disabled={loading}
            className={`w-full py-3 text-sm font-medium rounded-lg transition-colors ${
              loading
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-white hover:text-black hover:border-gray-900 hover:font-bold'
            }`}
          >
            {loading ? 'Creando...' : 'Crear'}
          </button>
        </div>
      </div>
    );
}