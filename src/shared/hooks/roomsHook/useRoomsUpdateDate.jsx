import { useState } from "react";
import { updateDateAvailableRoom } from "../../../services";

export const useRoomUpdateDate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateDate = async (id, data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await updateDateAvailableRoom(id, data);

            if (!response.success) {
                setError(response.msg || "Error al actualizar fecha disponible");
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

    return { updateDate, loading, error };
};
