import React from 'react';
import { useRoomsView } from '../../shared/hooks/roomsHook/useRoomsView';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../settings/Footer';

export const RoomsList = () => {
    const { rooms, loading, error, total } = useRoomsView();
    const navigate = useNavigate();

    if (loading) return <p>Cargando habitaciones...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <>
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
                                <p><strong>Numero de Habitacion:</strong> {room.numberRoom}</p>

                                {room.keeperHotel && (
                                    <p><strong>Hotel:</strong> {room.keeperHotel.nameHotel}</p>
                                )}
                                {room.keeperAdmin && (
                                    <p><strong>Administrador:</strong> {room.keeperAdmin.name}</p>
                                )}

                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};