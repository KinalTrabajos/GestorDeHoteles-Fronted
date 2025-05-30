import React from "react";
import { Navbar } from "../../components/Navbars/Navbar";
import { EventsList } from "../../components/componentEvents/ComponentEventsView";

export const EventPage = () => {
    return(
        <div>
            <Navbar />
            <EventsList/>
        </div>
    )
}