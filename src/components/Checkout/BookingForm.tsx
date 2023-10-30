import { exampleReservationId } from '@/lib/constants'
import { guessFormValidationSchema } from '@/lib/helpers/checkout'
import useBooking from '@/lib/hooks/useBooking'
import useCheckout from '@/lib/hooks/useCheckout'
import useTimer from '@/lib/hooks/useTimer'
import { GuestForm } from '@/lib/models/booking'
import { reserveBooking } from '@/services/booking'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function BookingForm() {
    const { sessionFormData, setFormData, removeFormData } = useCheckout()
    const { sessionBookingData, getFinalPrice, clearBooking } = useBooking()
    const { clearTimer } = useTimer()
    const [formSent, setFormSent] = useState<boolean>(false)
    const navigate = useNavigate()

    const formik = useFormik<GuestForm>({
        initialValues: sessionFormData ?? {
            gender: 'male',
            first_name: '',
            middle_name: '',
            last_name: '',
            email: '',
            phone: '',
            confirmEmail: '',
            privacyPolicy: false,
            terms: false,
        },
        validationSchema: guessFormValidationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        },
    })

    useEffect(() => {
        formik.validateForm()
    }, [])

    useEffect(() => {
        setFormData(formik.values)
    }, [formik.values])

    const isSameEmail = formik.values.email === formik.values.confirmEmail

    const handleSubmit = async (event) => {
        event?.preventDefault()

        const [hotel] = sessionBookingData

        if (!hotel) return

        setFormSent(true)

        try {
            await reserveBooking({
                form: formik.values,
                products: hotel.products,
                hotel: hotel.hotelInfo?.hotel ?? hotel.hotel,
            })

            const queryString = new URLSearchParams({
                reservationId: exampleReservationId,
                hotel: JSON.stringify(hotel.hotelInfo),
                product: JSON.stringify(hotel.products?.[0]),
                totalPrice: getFinalPrice().toString(),
            })

            clearBooking();
            removeFormData();
            clearTimer();

            navigate(`/success?${queryString.toString()}`)
        } catch (error) {
            toast.error('Error al reservar')
        } finally {
            setFormSent(false)
        }
    }

    return (
        <form className="flex flex-col space-y-3">
            <div>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formik.values.gender === 'male'}
                        onChange={formik.handleChange}
                    />{' '}
                    Sr.
                </label>
                <label>
                    <input
                        className="ml-5"
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formik.values.gender === 'female'}
                        onChange={formik.handleChange}
                    />{' '}
                    Sra.
                </label>
            </div>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label htmlFor="first_name" className="text-blue-800">
                        Nombre
                    </label>
                    <input
                        className="border border-gray-300 p-2 focus:outline-none"
                        id="first_name"
                        name="first_name"
                        type="text"
                        placeholder="Escribe tu nombre"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="middle_name" className="text-blue-800">
                        Primer Apellido
                    </label>
                    <input
                        className="border border-gray-300 p-2 focus:outline-none"
                        id="middle_name"
                        name="middle_name"
                        type="text"
                        placeholder="Escribe tu apellido"
                        onChange={formik.handleChange}
                        value={formik.values.middle_name}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="last_name" className="text-blue-800">
                        Segundo Apellido
                    </label>
                    <input
                        className="border border-gray-300 p-2 focus:outline-none"
                        id="last_name"
                        name="last_name"
                        type="text"
                        placeholder="Escribe tu apellido"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="phone" className="text-blue-800">
                        Teléfono Móvil
                    </label>
                    <input
                        className="border border-gray-300 p-2 focus:outline-none"
                        id="phone"
                        name="phone"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        required
                    />
                    {formik.errors.phone ? (
                        <small className="text-red-400">
                            {formik.errors.phone}
                        </small>
                    ) : null}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-blue-800">
                        Correo Electrónico
                    </label>
                    <input
                        className="border border-gray-300 p-2 focus:outline-none"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-blue-800">
                        Confirmar email
                    </label>
                    <input
                        className="border border-gray-300 p-2 focus:outline-none"
                        id="confirmEmail"
                        name="confirmEmail"
                        type="email"
                        placeholder="email"
                        onChange={formik.handleChange}
                        value={formik.values.confirmEmail}
                        required
                    />
                    {formik.values.email?.length > 0 && !isSameEmail ? (
                        <small className="text-red-400">
                            Los correos no coinciden
                        </small>
                    ) : null}
                </div>
            </div>
            <label className="inline-flex items-center gap-1">
                <input
                    type="checkbox"
                    name="privacyPolicy"
                    id="privacyPolicy"
                    onChange={() =>
                        formik.setFieldValue(
                            'privacyPolicy',
                            !formik.values.privacyPolicy
                        )
                    }
                    checked={formik.values.privacyPolicy}
                    required
                />
                Confirmo que he leído y acepto la Política de Privacidad de
                SPRING. (Obligatorio)
            </label>
            <label className="inline-flex items-center gap-1">
                <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    onChange={() =>
                        formik.setFieldValue('terms', !formik.values.terms)
                    }
                    checked={formik.values.terms}
                    required
                />
                Confirmo que he leído y acepto las condiciones de reserva de
                SPRING. (Obligatorio)
            </label>
            <button
                type="button"
                onClick={handleSubmit}
                className="text-center w-full text-white py-2 bg-blue-800 hover:bg-blue-900 disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={
                    !formik.isValid ||
                    !isSameEmail ||
                    !formik.values.gender ||
                    formSent
                }
            >
                {formSent ? 'Enviando...' : 'Confirma tu reserva'}
            </button>
        </form>
    )
}
