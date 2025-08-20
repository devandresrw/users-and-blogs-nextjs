'use client'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react"
import type { Dictionary } from '@/types/interfaces/dictionary.interface'
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import type { LangParams } from '@/types/interfaces/lang.interfaces'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useHandleLogin } from '@/hooks/auth/useHandleLogin'
import { signIn } from 'next-auth/react'

export const FormLogin = ({ params, dict }: { params: LangParams, dict: Dictionary }) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    sendStatus,
    resetSendStatus
  } = useHandleLogin(params.lang, dict)

  return (
    <div>
      <form className="flex flex-col justify-between gap-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="h-20">
          <Label>{dict.loginForm.email}</Label>
          <Input {...register("email")} placeholder={dict.loginForm.emailPlaceholder} />
          <div className="min-h-3">
            {errors.email && <span className="text-sm">{errors.email.message}</span>}
          </div>
        </div>
        <div className="h-20 relative">
          <Label>{dict.loginForm.password}</Label>
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder={dict.loginForm.passwordPlaceholder}
          />
          <button
            type="button"
            className="absolute right-2 top-8 text-xl"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
          </button>
          <div className="min-h-3">
            {errors.password && <span className="text-sm">{errors.password.message}</span>}
          </div>
        </div>
        <div>
          <Button type="submit"
            disabled={isSubmitting} className='w-full'>{dict.loginForm.submit}</Button>
        </div>
      </form>
      <div className='mt-2'>
        <Separator />
        <h3 className="text-center mt-1">{dict.loginForm.providers}</h3>
        <div className='mt-1 w-full flex justify-between items-center gap-2'>
          <Button type="button" className='flex-1'
            onClick={() => signIn("google")}
          ><FaGoogle /></Button>
          <Button type="button" className='flex-1'
            onClick={() => signIn("facebook")}><FaFacebookF /></Button>
        </div>
        {sendStatus.message && (
          <div className={`mt-2 text-center ${sendStatus.success ? 'text-green-500' : 'text-red-500'}`}>
            {sendStatus.message}
          </div>
        )}
      </div>
    </div>
  )
}