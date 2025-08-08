import { z } from "zod";
import type { Dictionary } from '@/types/interfaces/dictionary.interface'

// Debe tener al menos una mayúscula, una minúscula, un número y un carácter especial
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,20}$/


export const loginFormSchema = (dict: Dictionary) =>
  z.object({
    email: z.email({ message: dict.loginErrorsSchema.invalidEmail })
      .min(5, { message: dict.loginErrorsSchema.invalidEmail })
      .max(30, { message: dict.loginErrorsSchema.invalidEmail }),
    password: z.string()
      .min(6, { message: dict.loginErrorsSchema.shortPassword })
      .max(20, { message: dict.loginErrorsSchema.maxPassword })
      .regex(passwordRegex, { message: dict.loginErrorsSchema.weakPassword })
  });

export type LoginFormValues = z.infer<ReturnType<typeof loginFormSchema>>;