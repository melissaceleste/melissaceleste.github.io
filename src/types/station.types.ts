import {BookingEntry} from "./booking-entry.types";

export interface  StationTypes {
    id: string;
    name: string;
    bookings:  BookingEntry[];
}
