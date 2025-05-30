import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReservationAdd } from "../../shared/hooks/bookingsHook/useBookingAdd";
import { useRoomsView } from '../../shared/hooks/roomsHook/useRoomsView';

export const AddReservation = () => {
    const [formData, setFormData] = useState({
        roomId: "",
        startDate: "",
        endDate: ""
    });

    const navigate = useNavigate();
    const { createReservation, loading, error } = useReservationAdd();
    const [successMsg, setSuccessMsg] = useState(null);

    const { rooms, loading: roomsLoading, error: roomsError } = useRoomsView();

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg(null);

        const { roomId, startDate, endDate } = formData;

        const response = await createReservation(roomId, {
            startDate,
            endDate
        });

        if (response.success) {
            setSuccessMsg("Reserva creada con éxito.");
            setFormData({
                roomId: "",
                startDate: "",
                endDate: ""
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl">
            <h2 className="text-xl font-bold mb-4">Agregar Reserva</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Habitación</label>
                    {roomsLoading ? (
                        <p className="text-sm text-gray-500">Cargando habitaciones...</p>
                    ) : (
                        <select
                            name="roomId"
                            value={formData.roomId}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="">Seleccione una habitación</option>
                            {rooms.map((room) => (
                                <option key={room._id} value={room._id}>
                                    {room.numberRoom} - {room.typeRoom}
                                </option>
                            ))}
                        </select>
                    )}
                    {roomsError && <p className="text-red-500 text-sm">{roomsError}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Fecha de inicio</label>
                    <input
                        type="datetime-local"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Fecha de fin</label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    {loading ? "Creando..." : "Agregar Reserva"}
                </button>
            </form>

            <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={() => navigate("/reservas")}
            >
                Cancelar
            </button>
        </div>
    );
};
