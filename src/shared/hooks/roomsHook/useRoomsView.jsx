import { useState, useEffect } from "react";
import { getRooms } from "../../../services/api";

export const useRoomsView = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);

    const fetchRooms = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getRooms();

            if (response.success) {
                setRooms(response.rooms);
                setTotal(response.total);
            } else {
                setError(response.msg || "Error al obtener los cuartos");
            }
        } catch (err) {
            setError("Error de conexión al servidor");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return {
        rooms,
        total,
        loading,
        error,
        refetch: fetchRooms
    };
};