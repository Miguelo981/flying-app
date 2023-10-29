import { CHECK_INTERVAL_IN_MS, FIRST_TIMEOUT_NOTIFICATION_IN_MINUTES } from '@/lib/constants'
import useTimer from '@/lib/hooks/useTimer'
import { useEffect, useState } from 'react'
import Countdown from 'react-countdown';

export default function SessionTimeoutModal() {
    const { sessionTimeout, clearTimer, startTimer } = useTimer()
    const [showModal, setShowModal] = useState<boolean>(false)

    const handleCountdown = () => {
        if (!sessionTimeout) return

        const now = new Date()
        const timeRemaining = new Date(sessionTimeout).getTime() - now.getTime();
        console.log(timeRemaining)

        if (timeRemaining <= 0) {
            handleStopTimer();
            setShowModal(false);
            //TODO clear form data and  booking data

            // TODO try to redirect using react-router-dom
            return window.location.href = '/';
        } else if (timeRemaining <= FIRST_TIMEOUT_NOTIFICATION_IN_MINUTES * 60 * 1000) {
            console.log('SHOW MODAL')
            setShowModal(true);
        }
    }

    const handleStopTimer = () => {
        clearTimer()
    }

    const handleResetTimer = () => {
        setShowModal(false)
        startTimer()
    }

    useEffect(() => {
        if (!sessionTimeout) return

        const intervalId = setInterval(handleCountdown, CHECK_INTERVAL_IN_MS)

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [sessionTimeout])

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
          return <span className='text-4xl'>00:00</span>;
        } else {
          return (
            <span className='text-4xl'>
              {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          );
        }
    };

    return (
        <>
            { sessionTimeout && showModal ? (
                <div onClick={handleResetTimer} className="w-full h-screen bg-black/70 absolute top-0 grid justify-items-center items-center">
                    <section className="p-10 bg-white rounded-xl flex flex-col justify-center items-center">
                        <time>
                            <Countdown date={new Date(sessionTimeout)} precision={2} renderer={renderer} />
                        </time>
                        <p className='text-xl'>¿Sigues ahí?</p>
                        <button className="px-5 py-1 bg-blue-800 hover:bg-blue-900 text-white" onClick={handleResetTimer}>Seguir navegando</button>
                    </section>
                </div>
            ) : null}
        </>
    )
}
