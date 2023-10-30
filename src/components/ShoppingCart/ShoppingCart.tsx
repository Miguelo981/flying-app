import useBooking from "@/lib/hooks/useBooking";
import { Link, useLocation } from "react-router-dom";
import ShoopingCartItems from "./ShoopingCartItems";

export default function ShoppingCart() {
    const { sessionBookingData, getFinalPrice } = useBooking();
    const { pathname } = useLocation()

    const isHotelSelected = sessionBookingData.length > 0 && sessionBookingData?.[0].products.length > 0 && sessionBookingData?.[0].products?.[0].boardtypes.length > 0;

    return (
        <div className="w-full">
            <header>
                {
                    isHotelSelected ?
                        <ShoopingCartItems bookings={sessionBookingData} />
                    :
                    <div className="p-5 border-gray-300 border border-x">
                        <span>¡Añade una habitación!</span>
                    </div>
                }
            </header>
            <footer>
                <div className="p-5 border-gray-300 border-b border-x flex justify-between items-center">
                    <strong>Precio final</strong>
                    <span className="text-blue-800 font-bold">
                        {
                            Intl.NumberFormat('es-ES', {
                                currency: 'EUR',
                                style: 'currency',
                            }).format(getFinalPrice())
                        }
                    </span>
                </div>
                <div>
                {
                    isHotelSelected && pathname !== '/checkout' ?
                    
                    <Link to="/checkout" className="bg-blue-800 hover:bg-blue-900 text-white px-5 py-2 flex w-full justify-center">
                        Siguiente
                    </Link> :
                    null
                }
                </div>
            </footer>
        </div>
    )
}