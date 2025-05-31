import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateEventServices } from "../../shared/hooks/eventsHook/useServiceEventUpdate";
import { useEventsView } from "../../shared/hooks/eventsHook/useEventView";

export const EventServicesEditForm = () => {
  const [selectedEventId, setSelectedEventId] = useState("");
  const [service, setService] = useState({
    typeService: "",
    descriptionServices: "",
    priceService: ""
  });

  const { events, loading: loadingEvents, error: errorEvents } = useEventsView();
  const { editEventServices, loading, error } = useUpdateEventServices();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEventId) return alert("Selecciona un evento");

    const data = { additionalServices: [service] };
    const res = await editEventServices(selectedEventId, data);

    if (res.success) {
      setService({ typeService: "", descriptionServices: "", priceService: "" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🛠️ Editar Servicios del Evento
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Selecciona un evento
        </label>
        <select
          className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          <option value="">-- Selecciona un evento --</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.nameEvent}
            </option>
          ))}
        </select>
        {errorEvents && <p className="text-red-500 font-medium mt-2">{errorEvents}</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="typeService"
          value={service.typeService}
          onChange={handleChange}
          placeholder="Tipo de Servicio"
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="descriptionServices"
          value={service.descriptionServices}
          onChange={handleChange}
          placeholder="Descripción del Servicio"
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="priceService"
          value={service.priceService}
          onChange={handleChange}
          min={1}
          placeholder="Precio (Q)"
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {error && <p className="text-red-600 font-medium">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="submit"
            disabled={loading || loadingEvents}
            className="py-3 w-full bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Actualizando..." : "✅ Actualizar Servicio"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/eventos")}
            className="py-3 w-full bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition duration-200"
          >
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};