import { useState } from "react";
import { updateReservation } from "../../../services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useReservationUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const editReservation = async (id, data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await updateReservation(id, data);

            if (!response.success) {
                setError(response.msg || "Error al actualizar la reserva");
                toast.error(response.msg || "Error al actualizar la reserva");
            } else {
                toast.success("Reserva actualizada correctamente");
                navigate("/reservas")
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

    return { editReservation, loading, error };
};