import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {  GuestForm } from '../models/booking'

type useCheckoutStoreProps = {
    sessionFormData: GuestForm
    setFormData: (formData: GuestForm) => void
    removeFormData: () => void
}

/**
 * @description
 * Zustand store for checkout session data
 * 
 */
export const useCheckoutStore = create(
    persist<useCheckoutStoreProps>(
        (set) => ({
            sessionFormData: {} as GuestForm,
            setFormData: (formData) => set({ sessionFormData: formData }),
            removeFormData: () => set({ sessionFormData: {} as GuestForm }),
        }),
        {
            name: 'session-checkout',
        }
    )
)
