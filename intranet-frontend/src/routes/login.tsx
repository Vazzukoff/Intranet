import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { formSchema } from "../schemas/schemas";
import { z } from "zod";
import { useAuth } from "../context/useAuth";

// Schema para login (username y password)
const loginSchema = formSchema

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { refetchUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });
  
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginForm, string>>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error campo y mensajes generales al cambiar
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);
    setFieldErrors({});

    // Validar con Zod
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const newFieldErrors: Partial<Record<keyof LoginForm, string>> = {};
      if (errors.username?.[0]) newFieldErrors.username = errors.username[0];
      if (errors.password?.[0]) newFieldErrors.password = errors.password[0];
      setFieldErrors(newFieldErrors);

      if (Object.keys(newFieldErrors).length === 0) {
        setError("Datos inválidos");
      }
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        await refetchUser(); // <-- fuerza fetch inmediato
        navigate('/home');   // <-- ya con el user en contexto
      } else {
        alert('Login fallido');
      }

      if (!response.ok) {
        throw new Error(data?.error || "Error en el inicio de sesión");
      }

      

      setSuccess("Inicio de sesión exitoso");

      setTimeout(() => {
        navigate("/home"); // Cambia por la ruta principal tras login
      }, 1000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error en login:", err);
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-gray-900 tracking-tight">Iniciar Sesión</h2>
          <div className="mt-2 w-16 h-0.5 bg-gray-200 mx-auto"></div>
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Usuario field */}
          <div>
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder=" "
                className={`w-full px-4 py-3 text-sm border-b focus:border-b-2 bg-transparent focus:outline-none peer ${
                  fieldErrors.username
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-gray-300 focus:border-gray-800'
                }`}
                required
              />
              <label
                htmlFor="username"
                className="absolute left-0 top-0 px-4 py-3 text-sm text-gray-500 transition-all duration-200 transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-gray-600 pointer-events-none"
              >
                Usuario
              </label>
            </div>
            {fieldErrors.username && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {fieldErrors.username}
              </p>
            )}
          </div>
  
          {/* Contraseña field */}
          <div>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                className={`w-full px-4 py-3 text-sm border-b focus:border-b-2 bg-transparent focus:outline-none peer ${
                  fieldErrors.password
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-gray-300 focus:border-gray-800'
                }`}
                required
              />
              <label
                htmlFor="password"
                className="absolute left-0 top-0 px-4 py-3 text-sm text-gray-500 transition-all duration-200 transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-gray-600 pointer-events-none"
              >
                Contraseña
              </label>
            </div>
            {fieldErrors.password && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {fieldErrors.password}
              </p>
            )}
          </div>
  
          {/* Error / Success messages */}
          {error && (
            <div className="text-red-500 text-xs py-3 px-4 bg-red-50 rounded-lg flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="text-green-600 text-xs py-3 px-4 bg-green-50 rounded-lg flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{success}</span>
            </div>
          )}
  
          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Iniciar Sesión
          </button>
  
          {/* Register link */}
          <p className="text-xs text-center text-gray-500 pt-3">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-gray-700 hover:text-gray-900 font-medium underline underline-offset-2">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}