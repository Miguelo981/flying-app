import { Booking } from '@/lib/models/booking'
import ShoppingCartItem from './ShoppingCartItem'

type ShoopingCartItemsProps = {
    bookings: Booking[]
}

export default function ShoopingCartItems({
    bookings,
}: ShoopingCartItemsProps) {
    return (
        <>
            {bookings?.map((booking) => (
                <div key={`hotel-cart-${booking.hotel}`}>
                    {booking.products?.map((product, index) => (
                        <ShoppingCartItem
                            key={`${product.room_title}-${index}`}
                            product={product}
                            hotel={booking.hotelInfo!}
                        />
                    ))}
                </div>
            ))}
        </>
    )
}
