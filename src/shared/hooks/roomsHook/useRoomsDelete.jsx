import { useState } from "react";
import { deleteRoom } from "../../../services";
import toast from "react-hot-toast";

export const useRoomDelete = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeRoom = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await deleteRoom(id);

            if (!response.success) {
                setError(response.msg || "Error al eliminar habitación");
                toast.error(response.msg || "Error al eliminar habitación");
            } else {
                toast.success("Habitación eliminada correctamente");
            }

            return response;
        } catch (err) {
            setError("Error de conexión al servidor");
            toast.error("Error de conexión al servidor");
            console.error(err);
            return {
                success: false,
                msg: "Error de conexión al servidor"
            };
        } finally {
            setLoading(false);
        }
    };

    return { removeRoom, loading, error };
};