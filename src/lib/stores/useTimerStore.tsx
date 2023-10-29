import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type useTimerStoreProps = {
    sessionTimeout: Date | null
    setTimer: (deadline: Date) => void
    clearTimer: () => void
}

export const useTimerStore = create(
    persist<useTimerStoreProps>(
        (set) => ({
            sessionTimeout: null,
            setTimer: (deadline) => set({ sessionTimeout: deadline }),
            clearTimer: () => set({ sessionTimeout: null }),
        }),
        {
            name: 'session-timeout',
        }
    )
)
