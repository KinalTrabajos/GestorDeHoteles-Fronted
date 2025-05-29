import { useState } from "react";
import { confirmBooking } from "../../../services/api";

export const useConfirmBooking = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const confirm = async (id) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await confirmBooking(id);
            if (response.success) {
                setSuccess(true);
                return response.reservation; // Devuelve la reserva actualizada
            } else {
                setError(response.msg || "Error al confirmar la reservación");
                return null;
            }
        } catch (err) {
            setError("Error de conexión");
            console.log(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { confirm, loading, error, success };
};
