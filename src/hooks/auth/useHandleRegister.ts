'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema, RegisterFormValues } from '@/schemas/auth/RegisterForm.schema'
import { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

type SendStatus = {
 success?: boolean;
 message?: string;
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
  if (!executeRecaptcha) {
   setSendStatus({
    success: false,
    message: 'reCAPTCHA no disponible, recarga la página'
   });
   return;
  }
  const token = await executeRecaptcha('register_form');
  // Envía { ...data, recaptchaToken: token } al backend
  setSendStatus({
   success: true,
   message: 'Formulario de registro enviado con reCAPTCHA'
  });
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