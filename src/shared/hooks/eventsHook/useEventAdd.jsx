import { useState } from "react";
import { addEventGeneral, addEventPrivate } from "../../../services";
import toast from "react-hot-toast";

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
                const msg = response.msg || "Error al crear el evento";
                setError(msg);
                toast.error(msg);
            } else {
                toast.success("Evento creado correctamente");
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

    return { createEvent, loading, error };
};