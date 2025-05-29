import { ViewHotel } from "../../components/Hoteles/ViewHotel";
import { Navbar } from "../../components/Navbars/Navbar";


export const HotelPage = () => {
    return(
        <div>
            <Navbar/>
            <div className="mt-8">
                <ViewHotel/>
            </div>
        </div>
    )
}