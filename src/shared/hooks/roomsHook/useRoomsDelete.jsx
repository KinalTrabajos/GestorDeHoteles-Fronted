import { useState } from "react";
import { deleteRoom } from "../../../services";

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
            }

            return response;
        } catch (err) {
            setError("Error de conexión al servidor");
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
