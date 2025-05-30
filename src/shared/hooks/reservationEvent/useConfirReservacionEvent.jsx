import { confirmReservationEvent } from "../../../services/api";
import toast from "react-hot-toast";

export const useConfirReservacionEvent = () => {
    const confirReservationEvent = async (id) => {
        const response = await confirmReservationEvent(id)

        if (response.error){
            toast.error("Error al confirmar el Evento")
            return{ error: true}
        }

        toast.success("Reservacion confirmanda exitosamente")
        window.location.reload();
        return response
    }

    return{confirReservationEvent}
}