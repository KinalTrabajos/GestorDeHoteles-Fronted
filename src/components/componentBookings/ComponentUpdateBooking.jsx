// src/pages/reservations/UpdateReservations.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingsView } from "../../shared/hooks/bookingsHook/useBookingsView";
import { useReservationUpdate } from "../../shared/hooks/bookingsHook/useBookingUpdate";

export const UpdateReservations = () => {
    const navigate = useNavigate();
    const { bookings, loading: loadingReservations, error: errorReservations } = useBookingsView();
    const { editReservation, loading, error } = useReservationUpdate();

    const [selectedReservationId, setSelectedReservationId] = useState("");
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: ""
    });

    const [successMsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        if (selectedReservationId) {
            const selected = bookings.find(r => r._id === selectedReservationId);
            if (selected) {
                setFormData({
                    startDate: selected.datesReservation.startDate.slice(0, 10),
                    endDate: selected.datesReservation.endDate.slice(0, 10)
                });
            }
        }
    }, [selectedReservationId, bookings]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSuccessMsg(null);

        const res = await editReservation(selectedReservationId, formData);
        if (res.success) {
            setSuccessMsg("Reserva actualizada con éxito.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl">
            <h2 className="text-xl font-bold mb-4">Editar Reserva</h2>

            <div className="mb-4">
                <label className="block mb-1 font-medium">Seleccionar Reserva</label>
                {loadingReservations ? (
                    <p>Cargando reservas...</p>
                ) : (
                    <select
                        className="w-full px-3 py-2 border rounded-md"
                        value={selectedReservationId}
                        onChange={(e) => setSelectedReservationId(e.target.value)}
                    >
                        <option value="">Seleccione una reserva</option>
                        {Array.isArray(bookings) && bookings.length > 0 ? (
                            bookings
                                .filter(res => res.stateReservation === 'Pendiente')
                                .map(res => (
                                    <option key={res._id} value={res._id}>
                                        {res.keeperRoom?.typeRoom} - {new Date(res.datesReservation.startDate).toLocaleDateString()}
                                    </option>
                                ))
                        ) : (
                            <option disabled>No hay reservas disponibles</option>
                        )}

                    </select>
                )}
                {errorReservations && <p className="text-red-500 text-sm">{errorReservations}</p>}
            </div>

            {selectedReservationId && (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Fecha de inicio</label>
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Fecha de fin</label>
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        {loading ? "Actualizando..." : "Actualizar Reserva"}
                    </button>
                </form>
            )}

            <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={() => navigate("/reservas")}
            >
                Cancelar
            </button>
        </div>
    );
};
