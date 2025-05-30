import { useState, useEffect } from "react";
import { getBookings } from "../../../services/api";

export const useBookingsView = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState([]);
    const [total, setTotal] = useState(0);

    const fetchBookings = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getBookings();
            if (response?.reservations?.length >= 0) {
                setBookings(response.reservations);
                setTotal(response.total);
            } else {
                setError(response.msg || "Ocurrió un error al obtener las reservas");
            }
        } catch (err) {
            setError("Error de conexión al servidor");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchBookings();
    }, []);

    return {
        bookings,
        total,
        loading,
        error,
        refetch: fetchBookings
    }
}