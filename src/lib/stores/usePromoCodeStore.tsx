import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type usePromoCodeStoreProps = {
    code: string,
    setCode: (code: string) => void,
    clearCode: () => void,
}

export const usePromoCodeStore = create(
    persist<usePromoCodeStoreProps>(
        (set) => ({
            code: '',
            setCode: (code) => set({ code }),
            clearCode: () => set({ code: '' })
        }),
        {
            name: 'session-promo-code',
        }
    )
)
