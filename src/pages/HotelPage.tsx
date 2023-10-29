import { Hotel } from '@/lib/models/hotel'
import { getHotel } from '@/services/hotel'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HotelDetail from '@/components/Hotel/HotelDetail'
import { toast } from 'sonner';
import ShoppingCart from '@/components/ShoppingCart'
import PromoForm from '@/components/PromoForm'

export default function HotelPage() {
    const [hotel, setHotel] = useState<Hotel>()
    const [isHotelFetching, setIsHotelFetching] = useState<boolean>(false)
    const { hotelId } = useParams()
    const navigate = useNavigate()

    const handleGetHotel = async () => {
        setIsHotelFetching(true)

        try {
            const hotel = await getHotel(hotelId!)

            setHotel(hotel)
        } catch (error) {
            toast.error('Error al obtener el hotel');
            console.log(error)
        } finally {
            setIsHotelFetching(false)
        }
    }

    useEffect(() => {
        if (!hotelId) {
            return navigate('/404')
        }

        handleGetHotel()
    }, [])

    return (
        <div className='flex-col'>
            <header>
                <div className='w-3/4 py-8 border-b border-gray-300'>
                    <h1 className='text-blue-800 text-4xl'>Tu viaje recomendado</h1>
                </div>
            </header>
            <section className='flex'>
                <div className='w-3/4 space-y-8'>
                    <h3 className='mt-8 inline-flex items-center gap-1 text-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M3 6a1 1 0 0 1 .993 .883l.007 .117v6h6v-5a1 1 0 0 1 .883 -.993l.117 -.007h8a3 3 0 0 1 2.995 2.824l.005 .176v8a1 1 0 0 1 -1.993 .117l-.007 -.117v-3h-16v3a1 1 0 0 1 -1.993 .117l-.007 -.117v-11a1 1 0 0 1 1 -1z" strokeWidth="0" fill="currentColor"></path>
                            <path d="M7 8a2 2 0 1 1 -1.995 2.15l-.005 -.15l.005 -.15a2 2 0 0 1 1.995 -1.85z" strokeWidth="0" fill="currentColor"></path>
                        </svg>
                        <span>Tu habitación</span>
                    </h3>
                    { !isHotelFetching && hotel ? (
                        <HotelDetail hotel={hotel} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <aside className='flex-col gap-4'>
                    <ShoppingCart />
                    <PromoForm />
                </aside>
            </section>
        </div>
    )
}
