import { useState, useEffect } from 'react';
import { viewReservations } from '../../../services';

const groupByHotel = (reservations = []) => {
    return reservations.reduce((acc, reservation) => {
        const hotelName = reservation?.keeperRoom?.keeperHotel?.nameHotel || 'Hotel Desconocido';
        if (!acc[hotelName]) acc[hotelName] = [];
        acc[hotelName].push(reservation);
        return acc;
    }, {});
};

export const useReservationView = () => {
    const [reservations, setReservations] = useState([]);
    const [groupedReservations, setGroupedReservations] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await viewReservations();

                if (response?.error) {
                    throw new Error(response?.message || 'Error al obtener reservas');
                }

                const data = response?.reservations || response?.data?.reservations || [];
                setReservations(data);
                setGroupedReservations(groupByHotel(data));

            } catch (e) {
                setError(e.message || 'Error inesperado al obtener reservas');
                setReservations([]);
                setGroupedReservations({});
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    return {
        reservations,
        groupedReservations,
        loading,
        error
    };
};
