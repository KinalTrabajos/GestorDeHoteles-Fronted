import { useState } from "react";
import { addReservation } from "../../../services";

export const useReservationAdd = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createReservation = async (roomId, data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await addReservation(roomId, data);

            if (!response.success) {
                setError(response.msg || "Error al crear la reserva");
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

    return { createReservation, loading, error };
};
