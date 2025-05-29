// src/shared/hooks/reservationsHook/useReservationUpdate.js
import { useState } from "react";
import { updateReservation } from "../../../services";

export const useReservationUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editReservation = async (id, data) => {
        setLoading(true);
        setError(null);
        const response = await updateReservation(id, data);
        setLoading(false);

        if (!response.success) {
            setError(response.msg);
        }

        return response;
    };

    return { editReservation, loading, error };
};
