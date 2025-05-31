import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReservationAdd } from "../../shared/hooks/bookingsHook/useBookingAdd";
import { useRoomsView } from "../../shared/hooks/roomsHook/useRoomsView";
import { CalendarClock, BedDouble, ArrowLeft } from "lucide-react";

export const AddReservation = () => {
    const [formData, setFormData] = useState({
        roomId: "",
        startDate: "",
        endDate: "",
    });

    const navigate = useNavigate();
    const { createReservation, loading, error } = useReservationAdd();
    const [successMsg, setSuccessMsg] = useState(null);
    const { rooms, loading: roomsLoading, error: roomsError } = useRoomsView();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg(null);

        const { roomId, startDate, endDate } = formData;
        const response = await createReservation(roomId, { startDate, endDate });

        if (response.success) {
            setSuccessMsg("✅ Reserva creada con éxito.");
            setFormData({ roomId: "", startDate: "", endDate: "" });

            // Ocultar mensaje tras 3 segundos
            setTimeout(() => setSuccessMsg(null), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                        <BedDouble className="w-6 h-6 text-blue-600" />
                        Crear nueva reserva
                    </h2>
                    <button
                        onClick={() => navigate("/reservas")}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Habitación */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Habitación
                        </label>
                        {roomsLoading ? (
                            <p className="text-sm text-gray-500">Cargando habitaciones...</p>
                        ) : (
                            <select
                                name="roomId"
                                value={formData.roomId}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Seleccione una habitación</option>
                                {rooms.map((room) => (
                                    <option key={room._id} value={room._id}>
                                        {room.numberRoom} - {room.typeRoom}
                                    </option>
                                ))}
                            </select>
                        )}
                        {roomsError && <p className="text-red-500 text-sm mt-1">{roomsError}</p>}
                    </div>

                    {/* Fecha de inicio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de inicio
                        </label>
                        <div className="relative">
                            <CalendarClock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                            <input
                                type="datetime-local"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Fecha de fin */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de fin
                        </label>
                        <div className="relative">
                            <CalendarClock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                            <input
                                type="datetime-local"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Mensajes */}
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

                    {/* Botón submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition"
                        >
                            {loading ? "Creando..." : "Agregar Reserva"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};