import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formSchema } from "../schemas/schemas";
import { z } from "zod";
import { registerUser } from "../services/auth.service";
import AuthForm from "../UI/auth.form";

const registerSchema = formSchema;
type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterForm>({
    username: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterForm, string>>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setFieldErrors({});

    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const newFieldErrors: Partial<Record<keyof RegisterForm, string>> = {};
      if (errors.username?.[0]) newFieldErrors.username = errors.username[0];
      if (errors.password?.[0]) newFieldErrors.password = errors.password[0];
      setFieldErrors(newFieldErrors);
      if (Object.keys(newFieldErrors).length === 0) {
        setError("Datos inválidos");
      }
      return;
    }

    try {
      await registerUser(formData);
      setSuccess("Usuario registrado exitosamente");
      setFormData({ username: "", password: "" });

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido al registrar";
      console.error("Error en registro:", err);
      setError(message);
    }
  };

  return (
    <AuthForm
      title="Crear Cuenta"
      buttonText="Crear Cuenta"
      footerText="¿Ya tienes una cuenta?"
      footerLinkText="Inicia sesión"
      footerLinkTo="/"
      formData={formData}
      fieldErrors={fieldErrors}
      error={error ?? undefined}
      success={success ?? undefined}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
