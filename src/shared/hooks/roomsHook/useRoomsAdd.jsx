import { useState } from "react";
import { addRoom } from "../../../services";

export const useRoomAdd = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createRoom = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await addRoom(data);

            if (!response.success) {
                setError(response.msg || "Error al crear habitación");
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

    return { createRoom, loading, error };
};
