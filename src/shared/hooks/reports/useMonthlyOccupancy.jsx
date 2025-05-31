import { useEffect, useState } from "react";
import { getMonthlyOccupancy } from "../../../services";

export const useMonthlyOccupancy = () => {
    const [monthlyOccupancy, setMonthlyOccupancy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMonthlyOccupancy = async () => {
            const result = await getMonthlyOccupancy();
            if (result.error) {
                setError(result.e);
            } else {
                setMonthlyOccupancy(result);
            }
            setLoading(false);
        };

        fetchMonthlyOccupancy();
    }, []);

    return { monthlyOccupancy, loading, error };
};