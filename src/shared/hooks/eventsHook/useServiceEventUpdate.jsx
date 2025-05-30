import { useState } from "react";
import { updateServicesEvent } from "../../../services";

export const useUpdateEventServices = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editEventServices = async (id, data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await updateServicesEvent(id, data);

            if (!response.success) {
                setError(response.msg || "Error al actualizar los servicios del evento");
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

    return { editEventServices, loading, error };
};
