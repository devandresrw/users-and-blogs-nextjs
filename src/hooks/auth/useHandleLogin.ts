'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema, LoginFormValues } from '@/schemas/auth/LoginForm.schema'
import { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'


type SendStatus = {
 success?: boolean;
 message?: string;
}

export const useHandleLogin = (lang: 'en' | 'es', dict: any) => {
 const [dictState, setDictState] = useState<any>(dict)
 const [sendStatus, setSendStatus] = useState<SendStatus>({})
 const { executeRecaptcha } = useGoogleReCaptcha();



 const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting, isSubmitSuccessful }
 } = useForm<LoginFormValues>({
  resolver: dictState ? zodResolver(loginFormSchema(dictState)) : undefined,
  mode: 'onChange'
 })

 const onSubmit = async (data: LoginFormValues) => {
  if (!executeRecaptcha) {
   setSendStatus({
    success: false,
    message: 'reCAPTCHA no disponible, recarga la página'
   });
   return;
  }
  const token = await executeRecaptcha('login_form');
  // Envía { ...data, recaptchaToken: token } al backend
  // Ejemplo: await apiLogin({ ...data, recaptchaToken: token });
  setSendStatus({
   success: true,
   message: 'Formulario enviado con reCAPTCHA'
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