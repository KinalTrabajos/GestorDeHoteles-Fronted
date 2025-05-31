import { useState } from "react";
import { updateRoom } from "../../../services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useRoomUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const editRoom = async (id, data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await updateRoom(id, data);

            if (!response.success) {
                setError(response.msg || "Error al actualizar habitación");
                toast.error(response.msg || "Error al actualizar habitación");
            } else {
                toast.success("Habitación actualizada correctamente");
                navigate("/habitaciones")
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

    return { editRoom, loading, error };
};