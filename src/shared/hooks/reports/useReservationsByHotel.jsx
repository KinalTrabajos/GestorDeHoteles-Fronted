import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReservationsByHotel } from "../../../services";

export const useReservationsByHotel = () => {
    const { hotelId } = useParams();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            if (!hotelId) {
                setError("No se ha seleccionado un hotel.");
                setLoading(false);
                return;
            }

            try {
                const data = await getReservationsByHotel(hotelId);
                if (!data.error) {
                    setReservations(data);
                    setError(null);
                } else {
                    setError("Error al obtener las reservas del hotel.");
                }
            } catch (err) {
                setError(`Error inesperado: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [hotelId]);

    return {
        reservations,
        loading,
        error,
    };
};
