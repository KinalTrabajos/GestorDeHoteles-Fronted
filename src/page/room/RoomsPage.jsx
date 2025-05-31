import React from "react";
import { Navbar } from "../../components/Navbars/Navbar";
import { RoomsList } from "../../components/componentERooms/ComponentViewRooms";

export const RoomsPage = () => {
    return(
        <div>
            <Navbar />
            <RoomsList/>
        </div>
    )
}