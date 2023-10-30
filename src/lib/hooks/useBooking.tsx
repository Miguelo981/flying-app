import { BookingData } from "../models/booking";
import { Boardtype } from "../models/hotel";
import { useBookingStore } from "../stores/useBookingStore";

/**
 * 
 * @description
 * This hook is responsible for managing the booking data.
 */
export default function useBooking() {
    const { sessionBookingData, removeBoardType, addBoardType, addProduct, deleteProduct, resetBooking } = useBookingStore();

    const addPension = (bookingData: BookingData) => {
        const bookingExists = sessionBookingData.find((hotelBookingData) => hotelBookingData.hotelInfo?.hotel === bookingData.hotel.hotel);

        if (!bookingExists) {
            return addProduct(bookingData);
        }

        const productExists = bookingExists.products.find((product) => bookingData.product.room === product.room);

        if (!productExists) return;

        const [boardType] = bookingData.product.boardtypes;

        if (!boardType) return;

        const boardTypeExists = productExists.boardtypes.find((boardtype) => boardtype.boardtype === boardType.boardtype);

        if (boardTypeExists) return;
        
        return addBoardType(boardType, bookingData);
    }

    const removePension = (bookingData: BookingData) => {
        const bookingExists = sessionBookingData.find((hotelBookingData) => hotelBookingData.hotelInfo?.hotel === bookingData.hotel.hotel);

        if (!bookingExists) return;

        const productExists = bookingExists.products.find((product) => bookingData.product.room === product.room);

        if (!productExists) return;

        const [boardType] = bookingData.product.boardtypes;

        if (!boardType) return;

        const boardTypeExists = productExists.boardtypes.find((boardtype) => boardtype.boardtype === boardType.boardtype);

        if (!boardTypeExists) return;

        return removeBoardType(boardType, bookingData);
    }

    const boardTypeExists = ({ boardType, hotelId, roomId }: { boardType: Boardtype, hotelId: string, roomId: string }) => {
        const bookingExists = sessionBookingData.find((hotelBookingData) => hotelBookingData.hotel === hotelId);

        if (!bookingExists) return false;

        const productExists = bookingExists.products.find((product) => roomId === product.room);

        if (!productExists) return false;

        const boardTypeExists = productExists.boardtypes.find((boardtype) => boardtype.boardtype === boardType.boardtype);

        return !!boardTypeExists
    }

    const removeProduct = (bookingData: BookingData) => {
        const bookingExists = sessionBookingData.find((hotelBookingData) => hotelBookingData.hotelInfo?.hotel === bookingData.hotel.hotel);

        if (!bookingExists) return;

        const productExists = bookingExists.products.find((product) => bookingData.product.room === product.room);

        if (!productExists) return;

        return deleteProduct(bookingData);
    }

    const getFinalPrice = (): number => {
        return sessionBookingData?.map(bookingData => bookingData.products
            .map(prod => prod.boardtypes.flat(2)))
            .flat(2)
            .reduce((prev, curr) => prev + curr.pricewithoutoffer, 0);
    }

    const clearBooking = () => {
        return resetBooking();
    }

    return {
        sessionBookingData,
        addPension,
        removePension,
        boardTypeExists,
        getFinalPrice,
        removeProduct,
        clearBooking,
    }
}