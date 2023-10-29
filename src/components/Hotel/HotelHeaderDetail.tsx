import { Hotel } from '@/lib/models/hotel'
import Stars from '../Stars'

type HotelHeaderDetailProps = {
    hotel: Hotel
}

export default function HotelHeaderDetail({ hotel }: HotelHeaderDetailProps) {
    return (
        <header className="flex">
            <figure className="w-1/2">
                <img
                    className="rounded-tl-2xl"
                    src={hotel.hotel_images?.[0] ?? ''}
                    alt={`${hotel.hotel_name} hotel image`}
                />
            </figure>
            <div className="rounded-tr-2xl space-y-5 p-10 w-1/2">
                <h1 className="text-blue-900 text-2xl font-bold">
                    {hotel.hotel_name}
                </h1>
                <Stars stars={hotel.hotel_stars} />
                <div className="inline-flex gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-600 w-5 h-auto"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"
                            strokeWidth="0"
                            fill="currentColor"
                        />
                    </svg>
                    <span className="text-gray-600 font-semibold">
                        {hotel.address}
                    </span>
                </div>
                <footer>
                    <p>{hotel.short_description}</p>
                </footer>
            </div>
        </header>
    )
}
