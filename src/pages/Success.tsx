import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HotelInfo, Product } from '@/lib/models/hotel'

/**
 * 
 * @description
 * This component is responsible for showing the success page using the data in the route query params.
 */
export default function SuccessPage() {
    const [hotel, setHotel] = useState<HotelInfo>()
    const [product, setProduct] = useState<Product>()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (
            !searchParams.get('hotel') ||
            !searchParams.get('reservationId') ||
            !searchParams.get('product') ||
            !searchParams.get('totalPrice')
        ) {
            return navigate('/')
        }

        setHotel(JSON.parse(searchParams.get('hotel')!))
        setProduct(JSON.parse(searchParams.get('product')!))
    }, [])

    console.log(hotel)

    return (
        <div className="flex-col">
            <header>
                <div className="w-3/4 py-8 border-b border-gray-300">
                    <h1 className="text-blue-800 text-4xl">
                        Tu reserva se ha realizado con éxito
                    </h1>
                </div>
            </header>
            <section className="flex gap-10">
                <div className="w-3/4 space-y-8">
                    <h3 className="mt-8 inline-flex items-center gap-1 text-xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <path
                                d="M3 6a1 1 0 0 1 .993 .883l.007 .117v6h6v-5a1 1 0 0 1 .883 -.993l.117 -.007h8a3 3 0 0 1 2.995 2.824l.005 .176v8a1 1 0 0 1 -1.993 .117l-.007 -.117v-3h-16v3a1 1 0 0 1 -1.993 .117l-.007 -.117v-11a1 1 0 0 1 1 -1z"
                                strokeWidth="0"
                                fill="currentColor"
                            ></path>
                            <path
                                d="M7 8a2 2 0 1 1 -1.995 2.15l-.005 -.15l.005 -.15a2 2 0 0 1 1.995 -1.85z"
                                strokeWidth="0"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <span>Gracias por confiar en nosotros</span>
                    </h3>
                    <article className="p-10 border-gray-300 border space-y-6 divide-y-2">
                        <header className="font-semibold flex items-center justify-between">
                            <div>
                                <h3>Reserva nº</h3>
                                <span>Localizador del hotel:</span>
                            </div>
                            <span className="text-blue-800">
                                {searchParams.get('reservationId')}
                            </span>
                        </header>
                        <section className="space-y-2 pt-6">
                            {hotel && product && (
                                <>
                                    <h2 className="text-xl text-cyan-400 font-semibold">
                                        {hotel.hotel_chains}
                                    </h2>
                                    <span>
                                        <strong>{product.room_title}</strong> -{' '}
                                        {hotel.hotel_name}
                                    </span>
                                    <ul className="pl-5 list-disc">
                                        {product.boardtypes?.map(
                                            (boardtype) => (
                                                <li
                                                    key={
                                                        boardtype.boardtype_text
                                                    }
                                                >
                                                    {boardtype.boardtype_text}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <p>6 Noches</p>
                                    <p>Adultos: 2</p>
                                </>
                            )}
                        </section>
                        <div className="pt-6">
                            <div className="bg-green-100 px-8 py-4">
                                <span className="font-semibold text-green-600">
                                    Mejor precio paquete garantizado
                                </span>
                            </div>
                        </div>
                        <footer className="flex justify-between items-center pt-6 font-semibold">
                            <span>A pagar en el hotel</span>
                            <span className='text-blue-800'>
                                {Intl.NumberFormat('es-ES', {
                                    currency: 'EUR',
                                    style: 'currency',
                                }).format(
                                    Number(searchParams.get('totalPrice')!)
                                )}
                            </span>
                        </footer>
                    </article>
                    <Link to="/" className="flex justify-center border-blue-800 hover:border-blue-900 bg-white border-2 py-3 text-blue-800 hover:text-blue-900">
                        Volver al inicio
                    </Link>
                </div>
            </section>
        </div>
    )
}
