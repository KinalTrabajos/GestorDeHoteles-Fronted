import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingsView } from "../../shared/hooks/bookingsHook/useBookingsView";
import { useReservationUpdate } from "../../shared/hooks/bookingsHook/useBookingUpdate";
import { CalendarClock, BedDouble, ArrowLeft } from "lucide-react";

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
          startDate: selected.datesReservation.startDate.slice(0, 16),
          endDate: selected.datesReservation.endDate.slice(0, 16)
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
      setSuccessMsg("✅ Reserva actualizada con éxito.");
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <BedDouble className="w-6 h-6 text-blue-600" />
            Editar reserva
          </h2>
          <button
            onClick={() => navigate("/reservas")}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        </div>

        {/* Selector de reserva */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seleccionar reserva
          </label>
          {loadingReservations ? (
            <p className="text-sm text-gray-500">Cargando reservas...</p>
          ) : (
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedReservationId}
              onChange={(e) => setSelectedReservationId(e.target.value)}
              required
            >
              <option value="">Seleccione una reserva</option>
              {Array.isArray(bookings) && bookings.length > 0 ? (
                bookings
                  .filter(res => res.stateReservation === "Pendiente")
                  .map(res => (
                    <option key={res._id} value={res._id}>
                      {res.keeperRoom?.numberRoom} - {res.keeperRoom?.typeRoom} |{" "}
                      {new Date(res.datesReservation.startDate).toLocaleDateString()}
                    </option>
                  ))
              ) : (
                <option disabled>No hay reservas disponibles</option>
              )}
            </select>
          )}
          {errorReservations && (
            <p className="text-red-500 text-sm mt-1">{errorReservations}</p>
          )}
        </div>

        {/* Formulario */}
        {selectedReservationId && (
          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Fecha inicio */}
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

            {/* Fecha fin */}
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

            {/* Botones */}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition"
              >
                {loading ? "Actualizando..." : "Actualizar Reserva"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/reservas")}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};