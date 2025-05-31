import React from "react";
import { Navbar } from "../../components/Navbars/Navbar";
import { BookingsList } from "../../components/componentBookings/ComponentViewBookings";

export const BookingsPage = () => {
    return(
        <div>
            <Navbar />
            <BookingsList/>
        </div>
    )
}