import { delethoteles } from "../../../services/api";
import toast from "react-hot-toast";

export const useDeletHotel = () => {
  const deleteHotel = async (id) => {
    const response = await delethoteles(id)

    if (response.error) {
      toast.error("Error al eliminar el Hotel")
      return { error: true }
    }

    toast.success("Hotel eliminado correctamente")
    window.location.reload();
    return response
  }

  return { deleteHotel }
}
