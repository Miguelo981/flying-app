import BookingForm from "@/components/Checkout/BookingForm";
import ShoppingCart from "@/components/ShoppingCart/ShoppingCart";

/**
 * 
 * @description
 * This component is responsible for showing the checkout page.
 */
export default function CheckoutPage() {
    return (
        <div className='flex-col'>
            <header>
                <div className='w-3/4 py-8 border-b border-gray-300'>
                    <h1 className='text-blue-800 text-4xl'>Confirma tu reserva</h1>
                </div>
            </header>
            <section className='flex gap-10'>
                <div className='w-3/4 space-y-8'>
                    <h3 className='mt-8 inline-flex items-center gap-1 text-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M3 6a1 1 0 0 1 .993 .883l.007 .117v6h6v-5a1 1 0 0 1 .883 -.993l.117 -.007h8a3 3 0 0 1 2.995 2.824l.005 .176v8a1 1 0 0 1 -1.993 .117l-.007 -.117v-3h-16v3a1 1 0 0 1 -1.993 .117l-.007 -.117v-11a1 1 0 0 1 1 -1z" strokeWidth="0" fill="currentColor"></path>
                            <path d="M7 8a2 2 0 1 1 -1.995 2.15l-.005 -.15l.005 -.15a2 2 0 0 1 1.995 -1.85z" strokeWidth="0" fill="currentColor"></path>
                        </svg>
                        <span>Tu habitación</span>
                    </h3>
                    <div className="bg-gray-100 p-5 border-gray-300 border">
                        <BookingForm />
                    </div>
                </div>
                <aside className='flex-col gap-4 w-1/4'>
                    <ShoppingCart />
                </aside>
            </section>
        </div>
    )
}
