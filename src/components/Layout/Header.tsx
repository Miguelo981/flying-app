import { usePromoCodeStore } from '@/lib/stores/usePromoCodeStore';
import { Outlet, Link } from 'react-router-dom'

const Header = () => {
    const { code } = usePromoCodeStore();

    return (
        <>
            <header className="px-20 py-6 bg-teal-200 flex justify-between items-center">
                <div>
                    <span className="text-xs">Tu búsqueda</span>
                    <p className='font-semibold'>SPRING, 2 adultos, 10/03/2024 a 16/03/2024</p>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/" className='underline'>Nueva búsqueda</Link>
                        </li>
                        {
                            code.length > 0 && code === '15MP' ?
                            <span>Código { code }</span>
                            : null
                        }
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
