import { useState } from "react";
import { updateServicesEvent } from "../../../services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useUpdateEventServices = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const editEventServices = async (id, data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await updateServicesEvent(id, data);

            if (!response.success) {
                const msg = response.msg || "Error al actualizar los servicios del evento";
                setError(msg);
                toast.error(msg);
            } else {
                toast.success("Servicios del evento actualizados correctamente");
                navigate("/eventos")
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

    return { editEventServices, loading, error };
};