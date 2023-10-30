import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import Header from '@/components/Layout/Header'
import HotelPage from '@/pages/HotelPage'
import SuccessPage from '@/pages/Success'
import CheckoutPage from '@/pages/Checkout'
import NotFoundPage from './pages/404'


/**
 * @description
 * This component is responsible for handling the routing of the application.
 */
export const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Header />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/hotel/:hotelId" element={<HotelPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    )
)
