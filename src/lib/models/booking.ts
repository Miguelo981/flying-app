import { HotelInfo, Product } from './hotel'

export interface Booking {
    form: GuestForm
    hotel: string
    products: Product[]
    hotelInfo?: HotelInfo
}

export interface GuestForm {
    gender: string
    first_name: string
    middle_name: string
    last_name: string
    email: string
    phone: string
    confirmEmail?: string
    privacyPolicy?: boolean
    terms: boolean
}

export interface BookingData {
    hotel: HotelInfo
    product: Product
}
