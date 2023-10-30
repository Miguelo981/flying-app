import useBooking from '@/lib/hooks/useBooking'
import { HotelInfo, Product } from '@/lib/models/hotel'
import { useSessionNavigationStore } from '@/lib/stores/useSessionNavigationStore'
import { useState } from 'react'

type BookingDataProps = {
    hotel: HotelInfo
    product: Product
}

export default function ShoppingCartItem({ product, hotel }: BookingDataProps) {
    const { shoppingCart } = useSessionNavigationStore()
    const { removeProduct } = useBooking()
    const [isShowMore, setIsShowMore] = useState<boolean>(shoppingCart.showMore)

    const handleShowMoreClick = () => {
        useSessionNavigationStore.setState({
            shoppingCart: { ...shoppingCart, showMore: !isShowMore },
        })
        setIsShowMore(!isShowMore)
    }

    return (
        <article className="border border-gray-200">
            <header className="flex justify-between p-5 border-b border-gray-200">
                <h1>Habitación {product.room}</h1>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleShowMoreClick}
                        className="text-gray-600"
                    >
                        {isShowMore ? 'Ver menos' : 'Ver más'}
                    </button>
                    <button
                        onClick={() => removeProduct({ hotel: hotel, product })}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-blue-800 hover:text-blue-950 w-5"
                            width={24}
                            height={24}
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
                            <path d="M4 7l16 0"></path>
                            <path d="M10 11l0 6"></path>
                            <path d="M14 11l0 6"></path>
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                        </svg>
                    </button>
                </div>
            </header>
            {isShowMore ? (
                <footer className="p-5 space-y-2">
                    <h2 className="text-xl text-cyan-400 font-semibold">
                        {hotel.hotel_chains}
                    </h2>
                    <span>
                        <strong>{product.room_title}</strong> -{' '}
                        {hotel.hotel_name}
                    </span>
                    <ul className="pl-5 list-disc">
                        {product.boardtypes?.map((boardtype) => (
                            <li key={boardtype.boardtype_text}>
                                {boardtype.boardtype_text}
                            </li>
                        ))}
                    </ul>
                    <p>6 Noches</p>
                    <p>Adultos: 2</p>
                </footer>
            ) : null}
        </article>
    )
}
