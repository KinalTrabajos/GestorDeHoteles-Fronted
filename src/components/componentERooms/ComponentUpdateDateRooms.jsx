import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../../services";
import { useRoomUpdateDate } from "../../shared/hooks/roomsHook/useRoomsUpdateDate";

export const UpdateDateRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newDate, setNewDate] = useState("");
  const { updateDate, loading, error } = useRoomUpdateDate();
  const navigate = useNavigate()

  // Cargar habitaciones
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await getRooms();
      if (response.success) {
        setRooms(response.rooms);
      }
    };
    fetchRooms();
  }, []);

  const handleRoomChange = (e) => {
    const roomId = e.target.value;
    const room = rooms.find(r => r._id === roomId);
    setSelectedRoom(room);
    setNewDate(""); // Reiniciar input
  };

  const handleSubmit = async () => {
    if (!selectedRoom || !newDate) {
      return alert("Debes seleccionar una habitación y una fecha");
    }

    const response = await updateDate(selectedRoom._id, { date: newDate });

    if (response.success) {
      alert("Fecha agregada correctamente");
      setNewDate(""); // Limpiar input
    } else {
      alert(response.msg || "Error al agregar fecha");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Agregar nueva fecha disponible</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Select de habitaciones */}
      <div className="mb-4">
        <label className="block font-medium">Selecciona una habitación:</label>
        <select
          className="border rounded p-2 w-full"
          value={selectedRoom?._id || ""}
          onChange={handleRoomChange}
        >
          <option value="">-- Elige una habitación --</option>
          {rooms.map(room => (
            <option key={room._id} value={room._id}>
              {room.typeRoom}
            </option>
          ))}
        </select>
      </div>

      {/* Input de fecha */}
      {selectedRoom && (
        <div className="mb-4">
          <label className="block font-medium">Nueva fecha disponible:</label>
          <input
            type="date"
            className="border rounded p-2 w-full"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>
      )}

      {/* Botón de enviar */}
      {selectedRoom && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar fecha"}
        </button>
      )}
      <button
        className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => navigate("/habitaciones")}
    >
        Cancelar
    </button>
    </div>
  );
};
