import { ReservationEvent } from "../../components/ReservationEvents/ReservationEventPage";
import { Navbar } from "../../components/Navbars/Navbar";
import { Footer } from "../../components/settings/Footer";

export const PagePrincipal = () => {
    return(
        <div>
            <Navbar/>
                <ReservationEvent/>
            <Footer/>
        </div>
    )
}
