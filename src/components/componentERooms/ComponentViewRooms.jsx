import React, { useState } from 'react';
import { useWiewHoteles } from '../../shared/hooks/hoteles/useWiewHoteles';
import { useRoomsByHotel } from '../../shared/hooks/roomsHook/useRoomsByIdHotel';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../settings/Footer';

export const RoomsList = () => {
    const { hoteles, isLoading: loadingHoteles } = useWiewHoteles();
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    const { rooms, loading: loadingRooms } = useRoomsByHotel(selectedHotelId);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const isHotelAdmin = user?.role === "HOTEL_ADMIN";

    return (
        <>
            <div className="min-h-screen bg-gray-100 px-6 py-8 pt-35">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Habitaciones Disponibles
                    </h2>

                    <div className="mb-6 flex flex-col items-center">
                        {loadingHoteles ? (
                            <p className="text-gray-500">Cargando hoteles...</p>
                        ) : (
                            <select
                                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                onChange={(e) => setSelectedHotelId(e.target.value)}
                                defaultValue=""
                            >
                                <option value="" disabled>Selecciona un hotel</option>
                                {hoteles.map((hotel) => (
                                    <option key={hotel._id} value={hotel._id}>
                                        {hotel.nameHotel}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Acciones para admin */}
                    {isHotelAdmin && (
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-full transition"
                                onClick={() => navigate("/agregarHabitaciones")}
                            >
                                Agregar habitación
                            </button>
                            <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-full transition"
                                onClick={() => navigate("/editarHabitaciones")}
                            >
                                Editar habitación
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-full transition"
                                onClick={() => navigate("/eliminarHabitaciones")}
                            >
                                Eliminar habitación
                            </button>
                        </div>
                    )}

                    {/* Lista de habitaciones */}
                    {loadingRooms ? (
                        <p className="text-center text-gray-500">Cargando habitaciones...</p>
                    ) : rooms.length === 0 ? (
                        <p className="text-center text-gray-500">No hay habitaciones para este hotel.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rooms.map((room) => (
                                <div
                                    key={room._id}
                                    className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                                >
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {room.typeRoom}
                                    </h3>
                                    <p className="text-gray-600 mb-2">{room.descriptionRoom}</p>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li><span className="font-medium">Capacidad:</span> {room.capacityRoom} personas</li>
                                        <li><span className="font-medium">Precio:</span> Q{room.priceRoom}</li>
                                        <li><span className="font-medium">Habitación:</span> {room.numberRoom}</li>
                                        {room.keeperHotel && (
                                            <li><span className="font-medium">Hotel:</span> {room.keeperHotel.nameHotel}</li>
                                        )}
                                        {room.keeperAdmin && (
                                            <li><span className="font-medium">Admin:</span> {room.keeperAdmin.name}</li>
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};