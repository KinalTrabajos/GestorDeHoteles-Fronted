import { useState } from "react";
import { addReservation } from "../../../services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useReservationAdd = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const createReservation = async (roomId, data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await addReservation(roomId, data);

            if (!response.success) {
                setError(response.msg || "Error al crear la reserva");
                toast.error(response.msg || "Error al crear la reserva");
            } else {
                toast.success("Reserva creada correctamente");
                navigate("/reservas");
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

    return { createReservation, loading, error };
};