import useBooking from '@/lib/hooks/useBooking'
import { Boardtype, Product } from '@/lib/models/hotel'
import { useState, useEffect } from 'react'

type HotelPensionDetailProps = {
    hotelId: string
    roomId: string
    boardType: Boardtype
}

export default function HotelPensionDetail({
    boardType,
    hotelId,
    roomId,
}: HotelPensionDetailProps) {
    const { addPension, removePension, boardTypeExists } = useBooking()
    const [isBoardTypeSelected, setIsBoardTypeSelected] =
        useState<boolean>(false)

    useEffect(() => {
        const exists = boardTypeExists({ boardType, hotelId, roomId })
        console.log(exists)
        setIsBoardTypeSelected(exists)
    }, [boardTypeExists({ boardType, hotelId, roomId })])

    const handleSelectBoardType = () => {
        if (!isBoardTypeSelected) {
            return addPension({
                hotel: hotelId,
                product: {
                    room: roomId,
                    boardtypes: [boardType],
                } as Product,
            })
        }

        return removePension({
            hotel: hotelId,
            product: {
                room: roomId,
                boardtypes: [boardType],
            } as Product,
        })
    }

    return (
        <article className="flex items-center justify-between p-4 border-b border-gray-300">
            <header>
                <h1 className="text-blue-800 text-xl">
                    {boardType.boardtype_text}
                </h1>
            </header>
            <footer>
                <div></div>
                <button
                    onClick={handleSelectBoardType}
                    className={`${
                        isBoardTypeSelected
                            ? 'bg-white hover:bg-gray-50 border border-red-400 text-red-400'
                            : 'bg-blue-800 hover:bg-blue-900 border border-transparent text-white'
                    } px-5 py-2 shadow-md w-40`}
                >
                    {isBoardTypeSelected ? 'Eliminar' : 'Seleccionar'}
                </button>
            </footer>
        </article>
    )
}
