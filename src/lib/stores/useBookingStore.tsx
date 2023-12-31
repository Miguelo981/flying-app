import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Boardtype } from '../models/hotel'
import { Booking, BookingData } from '../models/booking'

type useBookingStoreProps = {
    sessionBookingData: Booking[]
    addBoardType: (boardType: Boardtype, bookingData: BookingData) => void
    removeBoardType: (boardType: Boardtype, bookingData: BookingData) => void
    addProduct: (booking: BookingData) => void
    deleteProduct: (booking: BookingData) => void
    resetBooking: () => void
}

export const useBookingStore = create(
    persist<useBookingStoreProps>(
        (set) => ({
            sessionBookingData: [],
            addProduct: (bookingData) =>
                set((state) => ({
                    sessionBookingData: [
                        ...state.sessionBookingData,
                        {
                            hotel: bookingData.hotel.hotel,
                            hotelInfo: bookingData.hotel,
                            products: [bookingData.product],
                        } as Booking,
                    ],
                })),
            addBoardType: (boardType, { hotel, product }) =>
                set((state) => {
                    const bookingData = state.sessionBookingData.find(
                        (sbd) => sbd.hotelInfo?.hotel === hotel.hotel
                    )

                    if (!bookingData)
                        return { sessionBookingData: state.sessionBookingData }

                    const bookingDataProduct = bookingData.products.find(
                        (prod) => prod.room === product.room
                    )

                    if (!bookingDataProduct)
                        return { sessionBookingData: state.sessionBookingData }

                    bookingDataProduct.boardtypes.push(boardType)

                    return { sessionBookingData: state.sessionBookingData }
                }),
            removeBoardType: (boardType, { hotel, product }) =>
                set((state) => {
                    const bookingData = state.sessionBookingData.find(
                        (sbd) => sbd.hotelInfo?.hotel === hotel.hotel
                    )

                    if (!bookingData)
                        return { sessionBookingData: state.sessionBookingData }

                    const bookingDataProduct = bookingData.products.find(
                        (prod) => prod.room === product.room
                    )

                    if (!bookingDataProduct)
                        return { sessionBookingData: state.sessionBookingData }

                    bookingDataProduct.boardtypes =
                        bookingDataProduct.boardtypes.filter(
                            (bt) => bt.boardtype !== boardType.boardtype
                        )

                    return { sessionBookingData: state.sessionBookingData }
                }),
            deleteProduct: (bookingData) =>
                set((state) => ({
                    sessionBookingData: state.sessionBookingData.filter(
                        (sbd) =>
                            sbd.hotelInfo?.hotel !== bookingData.hotel.hotel
                    ),
                })),
            resetBooking: () => set({ sessionBookingData: [] }),
        }),
        {
            name: 'session-booking',
        }
    )
)
