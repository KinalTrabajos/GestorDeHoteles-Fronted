import { useState } from "react";
import { confirmBooking } from "../../../services/api";
import toast from "react-hot-toast";

export const useConfirmBooking = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const confirm = async (id) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await confirmBooking(id);
            if (response.success) {
                setSuccess(true);
                toast.success("Reservación confirmada correctamente");
                return response.reservation;
            } else {
                const msg = response.msg || "Error al confirmar la reservación";
                setError(msg);
                toast.error(msg);
                return null;
            }
        } catch (err) {
            const msg = "Error de conexión";
            setError(msg);
            toast.error(msg);
            console.log(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { confirm, loading, error, success };
};