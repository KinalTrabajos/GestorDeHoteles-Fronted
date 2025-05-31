import { useState } from "react";
import { cancelBooking } from "../../../services/api";
import toast from "react-hot-toast";

export const useCancelBooking = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cancel = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const result = await cancelBooking(id);
            if (!result.success) {
                const message = result.msg || "Error al cancelar la reserva";
                setError(message);
                toast.error(message);
                return null;
            }

            toast.success("Reserva cancelada correctamente");
            return result;
        } catch (e) {
            const message = e.message || "Error de conexión al servidor";
            setError(message);
            toast.error(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { cancel, loading, error };
};