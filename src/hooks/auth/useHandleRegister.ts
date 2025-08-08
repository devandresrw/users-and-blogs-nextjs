'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema, RegisterFormValues } from '@/schemas/auth/RegisterForm.schema'
import { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { postData } from '@/lib/config/api.service'

type SendStatus = {
 success?: boolean;
 message?: string;
 loading?: boolean;
}

export const useHandleRegister = (lang: 'en' | 'es', dict: any) => {
 const [sendStatus, setSendStatus] = useState<SendStatus>({})
 const { executeRecaptcha } = useGoogleReCaptcha();

 const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting, isSubmitSuccessful }
 } = useForm<RegisterFormValues>({
  resolver: dict ? zodResolver(registerFormSchema(dict)) : undefined,
  mode: 'onChange'
 })

 const onSubmit = async (data: RegisterFormValues) => {
  setSendStatus({ loading: true });

  try {
   // Verificar reCAPTCHA
   if (!executeRecaptcha) {
    setSendStatus({
     success: false,
     message: 'reCAPTCHA no disponible, recarga la página'
    });
    return;
   }

   const recaptchaToken = await executeRecaptcha('register_form');

   // ✅ Cambiar la URL - usar RELATIVA sin /api al inicio
   const response = await postData('/api/auth/register', {
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    recaptchaToken
   });

   setSendStatus({
    success: true,
    message: response.message || 'Registro exitoso. Revisa tu email para verificar tu cuenta.'
   });

   // Limpiar formulario después del éxito
   reset();

  } catch (error: any) {
   console.error('Error en registro:', error);

   setSendStatus({
    success: false,
    message: error.response?.data?.message || error.message || 'Error al registrar usuario'
   });
  }
 }

 return {
  register,
  handleSubmit,
  onSubmit,
  errors,
  reset,
  isSubmitting,
  isSubmitSuccessful,
  sendStatus,
  resetSendStatus: () => setSendStatus({})
 }
}