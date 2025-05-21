import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../../services";
import { useRoomDelete } from "../../shared/hooks/roomsHook/useRoomsDelete";

export const DeleteRooms = () => {
  const [rooms, setRooms] = useState([]);
  const { removeRoom, loading, error } = useRoomDelete();
  const navigate = useNavigate()

  const fetchRooms = async () => {
    const response = await getRooms();
    if (response.success) {
      setRooms(response.rooms);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar esta habitación?");
    if (!confirm) return;

    const response = await removeRoom(id);
    if (response.success) {
      setRooms(prev => prev.filter(room => room._id !== id));
      alert("Habitación eliminada correctamente");
    } else {
      alert(response.msg || "Error al eliminar habitación");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Eliminar habitaciones</h2>

      {loading && <p>Eliminando habitación...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {rooms.length === 0 ? (
        <p>No hay habitaciones registradas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div key={room._id} className="border rounded-lg shadow-md p-4 bg-white flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold">{room.typeRoom}</h3>
                <p className="text-gray-600">{room.descriptionRoom}</p>
                <p><strong>Capacidad:</strong> {room.capacityRoom} personas</p>
                <p><strong>Precio:</strong> Q{room.priceRoom}</p>

                {room.keeperHotel && (
                  <p><strong>Hotel:</strong> {room.keeperHotel.nameHotel}</p>
                )}
                {room.keeperAdmin && (
                  <p><strong>Administrador:</strong> {room.keeperAdmin.name}</p>
                )}

                <div className="mt-2">
                  <p className="font-semibold">Fechas disponibles:</p>
                  <ul className="list-disc list-inside">
                    {room.datesAvialableRoom.map((dateObj, index) => (
                      <li key={index}>
                        {new Date(dateObj.date).toLocaleDateString()} - 
                        {dateObj.availabilityRoom ? " Disponible" : " No disponible"}
                        {dateObj.keeperUser && ` (Reservado por: ${dateObj.keeperUser.username})`}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded self-start"
                onClick={() => handleDelete(room._id)}
                disabled={loading}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
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
