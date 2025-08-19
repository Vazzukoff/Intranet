import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formSchema } from "../schemas/schemas";
import { z } from "zod";
import { useAuth } from "../context/useAuth";
import { loginUser } from "../services/auth.service";
import AuthForm from "../UI/auth.form";

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

    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);
    setFieldErrors({});

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
      await loginUser(formData);
      await refetchUser();
      setSuccess("Inicio de sesión exitoso");
      setFormData({ username: "", password: "" });
      
      setTimeout(() => {navigate("/home");}, 1000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error en login:", err);
      setError(message);
    }
  };

  return (
      <AuthForm
        title="Iniciar sesión"
        buttonText="Iniciar sesión"
        footerText="¿No tienes una cuenta?"
        footerLinkText="Regístrate"
        footerLinkTo="/register"
        formData={formData}
        fieldErrors={fieldErrors}
        error={error ?? undefined}
        success={success ?? undefined}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
  );
}