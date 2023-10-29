export interface Hotel {
    address: string
    hotel: string
    hotel_chains: string
    hotel_images: string[]
    hotel_name: string
    hotel_stars: number
    is_promoted: boolean
    products: Product[]
    short_description: string
    time: number
}

export interface Product {
    boardtypes: Boardtype[]
    images_room: string[]
    room: string
    room_title: string
}

export interface Boardtype {
    availability: number
    boardtype: string
    boardtype_text: string
    currencyid: string
    pricewithoffer: number
    pricewithoutoffer: number
    ratecode: string
}

export interface HotelBookingData {
    hotelId: string
    boardTypes: Boardtype[]
    productRoom: string
}
