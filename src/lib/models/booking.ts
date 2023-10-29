import { Product } from "./hotel";

export interface Booking {
    form:     GuestForm;
    hotel:    string;
    products: Product[];
}

export interface GuestForm {
    first_name:  string;
    middle_name: string;
    last_name:   string;
    email:       string;
    phone:       string;
}

export interface BookingData {
    hotel: string;
    product: Product;
}
