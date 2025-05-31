import { cancelarReservationEvent } from "../../../services/api";
import toast from "react-hot-toast";

export const useDeletReservastionEvent = () => {
    const deletReservationEvent = async (id) =>{
        const response = await cancelarReservationEvent(id)

        if (response.error){
            toast.error("Error al eliminar la Reservacion")
            return{ error: true}
        }

        toast.success("Reservacion Cancelada exitosamente")
        window.location.reload();
        return response
    }

    return {deletReservationEvent}
}