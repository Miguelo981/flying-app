import HotelHeaderDetail from '@/components/Hotel/HotelHeaderDetail'
import { Hotel } from '@/lib/models/hotel'
import { findHotels } from '@/services/hotel'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function HomePage() {
    const [hotels, setHotels] = useState<Hotel[]>()
    const [isHotelsFetching, setIsHotelsFetching] = useState<boolean>(false)

    const handleFindHotels = async () => {
        setIsHotelsFetching(true)

        try {
            const hotel = await findHotels()

            setHotels(hotel)
        } catch (error) {
            toast.error('Error al obtener el hotel')
            console.log(error)
        } finally {
            setIsHotelsFetching(false)
        }
    }

    useEffect(() => {
        handleFindHotels()
    }, [])

    return (
        <section className='flex-col max-w-5xl mx-auto py-10'>
            {isHotelsFetching ? (
                <p>Loading...</p>
            ) : (
                hotels?.map((hotel) => (
                    <article key={hotel.hotel} className="flex-col rounded-br-2xl rounded-t-2xl border border-gray-200">
                        <Link to={`/hotel/${hotel.hotel}`}>
                            <HotelHeaderDetail hotel={hotel} />
                        </Link>
                    </article>
                ))
            )}
        </section>
    )
}
