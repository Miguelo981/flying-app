import { DEATLINE_TIMEOUT_IN_MINUTES } from "../constants"
import { useTimerStore } from "../stores/useTimerStore"

/**
 * 
 * @description
 * This hook is responsible for managing the timer.
 */
export default function useTimer() {
    const { sessionTimeout, clearTimer, setTimer } = useTimerStore()
    
    const startTimer = () => {
        const now = new Date()
        const deadline = new Date(now.getTime() + 1000 * 60 * DEATLINE_TIMEOUT_IN_MINUTES)
        setTimer(deadline)
    }

    return {
        sessionTimeout,
        startTimer,
        clearTimer,
    }
}