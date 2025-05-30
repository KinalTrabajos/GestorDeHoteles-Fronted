import { useState } from "react";
import { addEventGeneral, addEventPrivate } from "../../../services";

export const useEventAdd = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createEvent = async (data, isPrivate = false) => {
        setLoading(true);
        setError(null);

        try {
            const response = isPrivate
                ? await addEventPrivate(data)
                : await addEventGeneral(data);

            if (!response.success) {
                setError(response.msg || "Error al crear el evento");
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

    return { createEvent, loading, error };
};
