import { object, string, boolean } from 'yup'
import { phoneRegExp } from '../constants'

/**
 * @description
 * This function returns a validation schema for the guess form
 */
export const guessFormValidationSchema = object({
    gender: string().required(),
    first_name: string().required(),
    middle_name: string().required(),
    last_name: string().required(),
    email: string().email().required('Campo requerido'),
    confirmEmail: string().email().required('Campo requerido'),
    phone: string().matches(phoneRegExp, 'Número de teléfono inválido').required('Campo requerido'),
    privacyPolicy: boolean().required(),
    terms: boolean().required(),
})
