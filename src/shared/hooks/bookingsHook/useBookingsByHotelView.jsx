import { useState, useEffect } from "react";
import { getBookingsByHotel } from "../../../services";

export const useBookingsByHotel = (hotelId) => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!hotelId) return;

        const fetchReservations = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await getBookingsByHotel(hotelId);
                if (response?.reservations) {
                    setReservations(response.reservations);
                    setTotal(response.total);
                } else {
                    setError(response.msg || "Error al obtener reservaciones del hotel");
                }
            } catch (err) {
                setError("Error de conexión al servidor");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [hotelId]);

    return { reservations, loading, error, total };
};