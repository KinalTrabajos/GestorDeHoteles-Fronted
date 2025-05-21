import React from 'react';
import { useRoomsView } from '../../shared/hooks/roomsHook/useRoomsView';
import { useNavigate } from 'react-router-dom';

export const RoomsList = () => {
    const { rooms, loading, error, total } = useRoomsView();
    const navigate = useNavigate();

    if (loading) return <p>Cargando habitaciones...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Habitaciones Disponibles ({total})</h2>

                        {/* 🔘 Botón para agregar habitación */}
            <button
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => navigate("/agregarHabitaciones")}
            >
                Agregar habitación
            </button>
            <button
                className="mb-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => navigate("/editarHabitaciones")}
            >
                Editar habitación
            </button>
            <button
                className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => navigate("/eliminarHabitaciones")}
            >
                Eliminar habitación
            </button>
            <button
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => navigate("/editarFecha")}
            >
                Editar Fecha de una habitacion
            </button>

            {rooms.length === 0 ? (
                <p>No hay habitaciones registradas.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rooms.map((room) => (
                        <div key={room._id} className="border rounded-lg shadow-md p-4 bg-white">
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
                    ))}
                </div>
            )}
        </div>
    );
};