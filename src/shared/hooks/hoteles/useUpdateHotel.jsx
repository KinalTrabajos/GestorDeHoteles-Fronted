import { updateHoteles } from "../../../services/api";
import toast from "react-hot-toast";

export const useUpdateHotel = () => {
    const updateHotel = async(id, data) => {
        const response = await updateHoteles(id, data)
        if(response.error){
            toast.error("Error al Actualizar el Hotel")
        }

        toast.success("Hotel Actualizado Correctamente")
        window.location.reload();

    }
    return updateHotel
}