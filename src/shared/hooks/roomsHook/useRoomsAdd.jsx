import { useState } from "react";
import { addRoom } from "../../../services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useRoomAdd = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const createRoom = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await addRoom(data);

            if (!response.success) {
                setError(response.msg || "Error al crear habitación");
                toast.error(response.msg || "Error al crear habitación");
            } else {
                toast.success("Habitación creada correctamente");
                navigate("/habitaciones");
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

    return { createRoom, loading, error };
};