import { useEffect, useState } from "react";
import { getRoomsByHotel } from "../../../services";

export const useRoomsByHotel = (hotelId) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hotelId) return;

    const fetchRooms = async () => {
      setLoading(true);
      try {
        const data = await getRoomsByHotel(hotelId);
        setRooms(data.rooms || []);
      } catch (error) {
        console.error("Error al cargar habitaciones:", error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  return { rooms, loading };
};