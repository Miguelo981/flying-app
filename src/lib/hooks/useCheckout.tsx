import { GuestForm } from "../models/booking"
import { useCheckoutStore } from "../stores/useCheckoutStore"

/**
 * 
 * @description
 * This hook is responsible for managing the checkout data.
 */
export default function useCheckout() {
    const { setFormData: setFormDataStore, removeFormData: removeFormDataStore, sessionFormData } = useCheckoutStore()
    
    const setFormData = (checkoutData: GuestForm) => {
        setFormDataStore(checkoutData)
    }

    const removeFormData = () => {
        removeFormDataStore();
    }

    return {
        sessionFormData,
        setFormData,
        removeFormData,
    }
}