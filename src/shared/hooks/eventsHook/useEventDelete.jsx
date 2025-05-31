import { useState } from "react";
import { deleteEvent } from "../../../services/api";
import toast from "react-hot-toast";

export const useEventDelete = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeEvent = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await deleteEvent(id);

            if (!response.success) {
                const msg = response.msg || "Error al eliminar evento";
                setError(msg);
                toast.error(msg);
            } else {
                toast.success("Evento eliminado correctamente");
                window.location.reload()
            }

            return response;
        } catch (err) {
            const msg = "Error de conexión al servidor";
            setError(msg);
            console.error(err);
            toast.error(msg);
            return {
                success: false,
                msg
            };
        } finally {
            setLoading(false);
        }
    };

    return { removeEvent, loading, error };
};