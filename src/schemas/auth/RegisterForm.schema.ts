import { z } from "zod";
import type { Dictionary } from '@/types/interfaces/dictionary.interface'

// Debe tener al menos una mayúscula, una minúscula, un número y un carácter especial
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,30}$/

export const registerFormSchema = (dict: Dictionary) =>
  z.object({
    email: z.string()
      .email({ message: dict.registerForm.invalidEmail })
      .min(5, { message: dict.registerForm.minEmail })
      .max(50, { message: dict.registerForm.maxEmail }),
    password: z.string()
      .min(8, { message: dict.registerForm.minPassword })
      .max(30, { message: dict.registerForm.maxPassword })
      .regex(passwordRegex, { message: dict.registerForm.weakPassword }),
    confirmPassword: z.string()
      .min(8, { message: dict.registerForm.minCPassword })
      .max(30, { message: dict.registerForm.maxCPassword })
      .regex(passwordRegex, { message: dict.registerForm.weakPassword })
  }).refine((data) => data.password === data.confirmPassword, {
    message: dict.registerForm.passwordMismatch,
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<ReturnType<typeof registerFormSchema>>;