import { useState } from "react";
import { updateRoom } from "../../../services";

export const useRoomUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editRoom = async (id, data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await updateRoom(id, data);

            if (!response.success) {
                setError(response.msg || "Error al actualizar habitación");
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

    return { editRoom, loading, error };
};
