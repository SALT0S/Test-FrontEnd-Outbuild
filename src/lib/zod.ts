import { object, string } from 'zod';

export const signInSchema = object({
  email: string({ required_error: 'Se requiere correo electrónico' })
    .min(1, 'Se requiere correo electrónico')
    .email('Correo electrónico inválido'),

  password: string({ required_error: 'Se requiere contraseña' })
    .min(1, 'Se requiere contraseña')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(32, 'La contraseña debe tener menos de 32 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe tener al menos una mayúscula')
    .regex(/[0-9]/, 'La contraseña debe tener al menos un número'),
});

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        first_name?: string[];
        last_name?: string[];
        phone?: string[];
      };
      message?: string;
    }
  | undefined;
