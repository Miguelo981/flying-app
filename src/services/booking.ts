import { HOTEL_API_URL } from "@/lib/constants";
import { Booking } from "@/lib/models/booking";

const apiUrl = new URL(HOTEL_API_URL)

/**
 * 
 * @param {Booking} the booking data
 * @throws {Error} if the request fails
 * @description
 * This function reservers a booking
 */
export async function reserveBooking(booking: Booking) {
    apiUrl.pathname = '/status'

    const response = await fetch(`${apiUrl}/201`, {
        method: 'POST',
        body: JSON.stringify(booking),
        headers: {
        'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    /* const data = await response.json()
    return data */
}