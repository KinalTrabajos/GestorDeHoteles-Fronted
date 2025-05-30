import { useState } from "react";
import { deleteEvent } from "../../../services/api"; // asegúrate de importar correctamente

export const useEventDelete = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeEvent = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await deleteEvent(id);

            if (!response.success) {
                setError(response.msg || "Error al eliminar evento");
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

    return { removeEvent, loading, error };
};
