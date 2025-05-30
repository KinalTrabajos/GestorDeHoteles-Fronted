import { useState } from "react";
import { cancelBooking } from "../../../services/api";

export const useCancelBooking = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cancel = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const result = await cancelBooking(id);
            if (!result.success) {
                setError(result.msg);
                return null;
            }
            return result;
        } catch (e) {
            setError(e.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { cancel, loading, error };
};
