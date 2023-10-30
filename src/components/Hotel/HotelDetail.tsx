import { Boardtype, Hotel } from '@/lib/models/hotel'
import { useState, useEffect, useMemo } from 'react'
import HotelPensionDetail from './HotelPensionDetail'
import HotelHeaderDetail from './HotelHeaderDetail'
import useTimer from '@/lib/hooks/useTimer'
import { usePromoCodeStore } from '@/lib/stores/usePromoCodeStore'
import { applyCode } from '@/lib/helpers/promo-code'

type HotelDetailProps = {
    hotel: Hotel
}

export default function HotelDetail({ hotel }: HotelDetailProps) {
    const { code } = usePromoCodeStore()
    const { sessionTimeout, startTimer } = useTimer()
    const [isPensionsOpen, setIsPensionsOpen] = useState<boolean>(false)
    const [activeNav, setActiveNav] = useState<string>('room')

    useEffect(() => {
        if (!sessionTimeout) {
            startTimer()
        }

        const routeNavTab = window.location.hash

        if (!routeNavTab) return

        setActiveNav(routeNavTab.slice(1))
    }, [window.location.hash])

    const filteredProducts = useMemo(
        () =>
            code.length > 0
                ? hotel.products?.map((prod) => {
                    const boardTypes = prod.boardtypes?.map((bt) => applyCode(code, bt))

                    return {
                        ...prod,
                        boardtypes: [...boardTypes],
                    }
                  })
                : hotel.products,
        [code]
    )

    console.log(filteredProducts)

    const findCheaperBoardtype = (): Boardtype | undefined => {
        return hotel.products
            ?.map((prod) => prod.boardtypes)
            .flat()
            .reduce((prev, curr) => {
                if (prev.pricewithoutoffer < curr.pricewithoutoffer) {
                    return prev
                }

                return curr
            })
    }

    const handleShowPensionsClick = () => {
        setIsPensionsOpen(!isPensionsOpen)
    }

    const navHeaderItems = [
        {
            id: 'room',
            text: 'Habitacion',
        },
        {
            id: 'description',
            text: 'Descripcion',
        },
        {
            id: 'photos',
            text: 'Fotos',
        },
    ]

    return (
        <article>
            <HotelHeaderDetail hotel={hotel} />
            <section className="rounded-b-2xl shadow-md">
                <header className="p-5 flex justify-between items-center">
                    <nav className="w-4/5">
                        <ul className="flex justify-around [&>li>a]:p-3 [&>li>a]:px-6">
                            {navHeaderItems.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className={`${
                                            activeNav == item.id
                                                ? 'text-blue-800 hover:text-blue-900 border-b-2 border-blue-800'
                                                : 'text-gray-500 hover:text-gray-600'
                                        }`}
                                    >
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="flex items-center gap-4">
                        <span>
                            {Intl.NumberFormat('es-ES', {
                                currency: 'EUR',
                                style: 'currency',
                            }).format(
                                findCheaperBoardtype()?.pricewithoutoffer ?? 0
                            )}
                        </span>
                        <button
                            className={`${
                                isPensionsOpen
                                    ? 'bg-white hover:bg-gray-50 border border-lime-400 text-lime-400'
                                    : 'bg-blue-800 border border-transparent text-white'
                            } px-5 py-2 shadow-md w-40`}
                            onClick={handleShowPensionsClick}
                        >
                            {isPensionsOpen ? 'Cerrar' : 'Ver pensiones'}
                        </button>
                    </div>
                </header>
                {activeNav === 'room' && isPensionsOpen ? (
                    <section>
                        <div className="flex justify-between items-center p-4 border-b border-gray-300">
                            <h2 className="text-sm">
                                <strong>Elige tu pensión</strong>
                            </h2>
                            <div className="inline-flex">
                                <span>
                                    Spring Club
                                    <sup>i</sup>
                                </span>
                                <div className="w-40"></div>
                            </div>
                        </div>
                        <div className="flex flex-col pb-4">
                            {filteredProducts?.map((prod) => (
                                <div key={`${hotel.hotel}-${prod.room}`}>
                                    {prod.boardtypes?.map((board) => (
                                        <HotelPensionDetail
                                            key={board.boardtype_text}
                                            boardType={board}
                                            room={{
                                                roomId: prod.room,
                                                roomTitle: prod.room_title,
                                            }}
                                            hotel={hotel}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : activeNav === 'description' ? (
                    <section className="p-4 border-t border-gray-300">
                        <p>{hotel.short_description}</p>
                    </section>
                ) : activeNav === 'photos' ? (
                    <section className="p-4 border-t border-gray-300">
                        <div className="grid grid-cols-3 gap-4">
                            {hotel.hotel_images?.map((img) => (
                                <img
                                    key={img}
                                    className="rounded-xl shadow-sm"
                                    src={img}
                                    alt={`${hotel.hotel_name} hotel image`}
                                />
                            ))}
                        </div>
                    </section>
                ) : null}
            </section>
        </article>
    )
}
