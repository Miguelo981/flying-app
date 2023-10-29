import HotelExample from "@/assets/requests/hotel.json" assert { type: "json" };
import { HOTEL_API_URL } from "@/lib/constants";
import { Hotel } from "@/lib/models/hotel";

const apiUrl = new URL(HOTEL_API_URL)

export async function findHotels(): Promise<Hotel[]> {
    const response = await fetch(`${apiUrl}/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(HotelExample),
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();
    return [data.json];
}

export async function getHotel(id: string): Promise<Hotel> {
    apiUrl.pathname = `/post`;
    apiUrl.searchParams.set("id", id);
    
    const response = await fetch(`${apiUrl}/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(HotelExample),
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.json;
  }