import { useEffect, useState } from "react";
import { getMostRequestedHotels } from "../../../services";

export const useMostRequestedHotels = () => {
    const [mostRequestedHotels, setMostRequestedHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMostRequestedHotels = async () => {
            const result = await getMostRequestedHotels();
            if (result.error) {
                setError(result.e);
            } else {
                setMostRequestedHotels(result);
            }
            setLoading(false);
        };

        fetchMostRequestedHotels();
    }, []);

    return {
        mostRequestedHotels,
        loading,
        error
    };
};

