import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../../services";
import { useRoomDelete } from "../../shared/hooks/roomsHook/useRoomsDelete";

export const DeleteRooms = () => {
  const [rooms, setRooms] = useState([]);
  const { removeRoom, loading, error } = useRoomDelete();
  const navigate = useNavigate();

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
    const confirm = window.confirm(
      "¿Estás seguro de que deseas eliminar esta habitación?"
    );
    if (!confirm) return;

    const response = await removeRoom(id);
    if (response.success) {
      setRooms((prev) => prev.filter((room) => room._id !== id));
      alert("Habitación eliminada correctamente");
    } else {
      alert(response.msg || "Error al eliminar habitación");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Eliminar Habitaciones
        </h2>

        {loading && (
          <p className="text-center text-gray-500 mb-6">Eliminando habitación...</p>
        )}
        {error && (
          <p className="text-center text-red-500 mb-6 font-medium">{error}</p>
        )}

        {rooms.length === 0 ? (
          <p className="text-center text-gray-600">No hay habitaciones registradas.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between hover:shadow-lg transition"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {room.typeRoom}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{room.descriptionRoom}</p>

                  <ul className="text-gray-700 text-sm space-y-1 mb-4">
                    <li>
                      <span className="font-semibold">Capacidad:</span> {room.capacityRoom} personas
                    </li>
                    <li>
                      <span className="font-semibold">Precio:</span> Q{room.priceRoom}
                    </li>
                    <li>
                      <span className="font-semibold">Número:</span> {room.numberRoom}
                    </li>
                    {room.keeperHotel && (
                      <li>
                        <span className="font-semibold">Hotel:</span> {room.keeperHotel.nameHotel}
                      </li>
                    )}
                    {room.keeperAdmin && (
                      <li>
                        <span className="font-semibold">Administrador:</span> {room.keeperAdmin.name}
                      </li>
                    )}
                  </ul>
                </div>

                <button
                  onClick={() => handleDelete(room._id)}
                  disabled={loading}
                  className="self-start bg-red-600 text-white font-medium rounded-lg px-5 py-2
                             hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/habitaciones")}
            className="bg-gray-800 text-white rounded-lg px-8 py-3 hover:bg-gray-900 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};