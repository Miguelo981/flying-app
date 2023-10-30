import useBooking from '@/lib/hooks/useBooking'
import { Boardtype, HotelInfo, Product, Room } from '@/lib/models/hotel'
import { useState, useEffect } from 'react'

type HotelPensionDetailProps = {
    hotel: HotelInfo
    room: Room
    boardType: Boardtype
}

export default function HotelPensionDetail({
    boardType,
    hotel,
    room,
}: HotelPensionDetailProps) {
    const { addPension, removePension, boardTypeExists } = useBooking()
    const [isBoardTypeSelected, setIsBoardTypeSelected] =
        useState<boolean>(false)

    useEffect(() => {
        const exists = boardTypeExists({
            boardType,
            hotelId: hotel.hotel,
            roomId: room.roomId,
        })

        setIsBoardTypeSelected(exists)
    }, [
        boardTypeExists({
            boardType,
            hotelId: hotel.hotel,
            roomId: room.roomId,
        }),
    ])

    const handleSelectBoardType = () => {
        if (!isBoardTypeSelected) {
            return addPension({
                hotel,
                product: {
                    room: room.roomId,
                    room_title: room.roomTitle,
                    boardtypes: [boardType],
                } as Product,
            })
        }

        return removePension({
            hotel,
            product: {
                room: room.roomId,
                room_title: room.roomTitle,
                boardtypes: [boardType],
            } as Product,
        })
    }

    return (
        <>
            {boardType.show === undefined || boardType.show ? (
                <article className="flex items-center justify-between p-4 border-b border-gray-300">
                    <header>
                        <h1 className="text-blue-800 text-xl">
                            {boardType.boardtype_text}
                        </h1>
                    </header>
                    <footer className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <small className="text-gray-400">
                                {boardType.discount && (
                                    <s>
                                        {Intl.NumberFormat('es-ES', {
                                            currency: boardType.currencyid,
                                            style: 'currency',
                                        }).format(boardType.pricewithoutoffer)}
                                    </s>
                                )}
                            </small>
                            <span>
                                {Intl.NumberFormat('es-ES', {
                                    currency: boardType.currencyid,
                                    style: 'currency',
                                }).format(
                                    boardType.discount
                                        ? boardType.pricewithoutoffer -
                                              (boardType.pricewithoutoffer *
                                                  boardType.discount!) /
                                                  100
                                        : boardType.pricewithoutoffer
                                )}
                            </span>
                        </div>
                        <div className='bg-red-800 hover:bg-red-900'></div>
                        <button
                            onClick={handleSelectBoardType}
                            className={`${
                                isBoardTypeSelected
                                    ? 'bg-white hover:bg-gray-50 border border-red-400 text-red-400'
                                    : `bg-${
                                          boardType.btnColor ?? 'blue'
                                      }-800 hover:bg-${
                                          boardType.btnColor ?? 'blue'
                                      }-900 border border-transparent text-white`
                            } px-5 py-2 shadow-md w-40`}
                        >
                            {isBoardTypeSelected ? 'Eliminar' : 'Seleccionar'}
                        </button>
                    </footer>
                </article>
            ) : null}
        </>
    )
}
