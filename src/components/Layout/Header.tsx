import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'

const Header = () => {
    const [current, setCurrent] = useState('h')

    const onClick = (e) => {
        console.log('click ', e)
        setCurrent(e.key)
    }

    return (
        <>
            <header className="px-20 py-6 bg-teal-200 flex justify-between items-center">
                <div>
                    <span className="text-xs">Tu búsqueda</span>
                    <p className='font-semibold'>SPRING, 2 adultos, 10/03/2024 a 16/03/2024</p>
                </div>
                <nav onClick={onClick}>
                    <ul>
                        <li>
                            <Link to="/" className='underline'>Nueva búsqueda</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className='md:max-w-7xl mx-auto'>
                <Outlet />
            </main>
        </>
    )
}
export default Header
