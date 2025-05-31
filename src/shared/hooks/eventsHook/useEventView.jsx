import { useState, useEffect } from "react";
import { getEvents } from "../../../services/api";

export const useEventsView = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getEvents();

            if (response.success) {
                setEvents(response.events);
                setTotal(response.total || response.events?.length || 0);
            } else {
                setError(response.msg || "Error al obtener los eventos");
            }
        } catch (err) {
            setError("Error de conexión al servidor");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return {
        events,
        total,
        loading,
        error,
        refetch: fetchEvents
    };
};