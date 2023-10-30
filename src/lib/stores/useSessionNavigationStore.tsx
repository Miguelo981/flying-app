import { create } from 'zustand'

type useSessionNavigationStoreProps = {
    shoppingCart: {
        showMore: boolean
    }
}

export const useSessionNavigationStore = create<useSessionNavigationStoreProps>(
    () => ({
        shoppingCart: {
            showMore: false,
        }
    })
)
