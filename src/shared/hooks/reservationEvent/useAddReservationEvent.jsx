import { addReservationEvento } from "../../../services/api";
import toast from "react-hot-toast";

export const useAddReservationEvent = () => {
    const addReservationEvent = async(id,data) => {
        const response = await addReservationEvento(id,data)
        if(response.error){
            toast.error("Error al Reservar el evento")
        }

        toast.success("Reservacion exitosa!")
    }

    return addReservationEvent
}