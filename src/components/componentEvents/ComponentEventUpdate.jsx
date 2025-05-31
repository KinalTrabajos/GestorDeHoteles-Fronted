import { useState, useEffect } from "react";
import { useEventUpdate } from "../../shared/hooks/eventsHook/useEventUpdate";
import { useWiewHoteles } from "../../shared/hooks/hoteles";
import { useEventsView } from "../../shared/hooks/eventsHook/useEventView";
import { useNavigate } from "react-router-dom";

export const EventEditForm = () => {
  const { events } = useEventsView();
  const { hoteles } = useWiewHoteles();
  const { editEvent, loading, error } = useEventUpdate();

  const [selectedEventId, setSelectedEventId] = useState("");
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nameEvent: "",
    description: "",
    nameHotel: "",
    startDate: "",
    endDate: "",
    priceEvent: 1,
    typeEvent: "Evento_General",
    additionalServices: []
  });

  useEffect(() => {
    const selected = events.find(e => e._id === selectedEventId);
    setEvent(selected || null);
  }, [selectedEventId, events]);

  useEffect(() => {
    if (event) {
      setForm({
        nameEvent: event.nameEvent || "",
        description: event.description || "",
        nameHotel: event.keeperHotel?.nameHotel || "",
        startDate: event.datesEvent?.startDate?.slice(0, 10) || "",
        endDate: event.datesEvent?.endDate?.slice(0, 10) || "",
        priceEvent: event.priceEvent || 1,
        typeEvent: event.typeEvent || "Evento_General",
        additionalServices: event.additionalServices || []
      });
    }
  }, [event]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isPrivate = form.typeEvent === "Evento_Privado";

    const data = {
      ...form,
      keeperHotel: hoteles.find(h => h.nameHotel === form.nameHotel)?._id
    };

    if (isPrivate) delete data.datesEvent;

    const result = await editEvent(event._id, data, isPrivate);
    if (result.success) {
      navigate("/eventos");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">✏️ Editar Evento</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <select
          value={selectedEventId}
          onChange={e => setSelectedEventId(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Seleccione un evento</option>
          {events.map(ev => (
            <option key={ev._id} value={ev._id}>
              {ev.nameEvent}
            </option>
          ))}
        </select>

        {event && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="nameEvent"
                value={form.nameEvent}
                onChange={handleChange}
                placeholder="Nombre del evento"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <select
                name="nameHotel"
                value={form.nameHotel}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Seleccione un hotel</option>
                {hoteles.map(hotel => (
                  <option key={hotel._id} value={hotel.nameHotel}>
                    {hotel.nameHotel}
                  </option>
                ))}
              </select>

              <select
                name="typeEvent"
                value={form.typeEvent}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Evento_General">Evento General</option>
                <option value="Evento_Privado">Evento Privado</option>
              </select>

              <input
                type="number"
                name="priceEvent"
                value={form.priceEvent}
                onChange={handleChange}
                min={1}
                placeholder="Precio del evento"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción del evento"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {form.typeEvent === "Evento_General" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}

            {error && <p className="text-red-500 font-medium">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="submit"
                disabled={loading}
                className="py-3 w-full bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200"
              >
                {loading ? "Guardando..." : "💾 Guardar cambios"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/eventos")}
                className="py-3 w-full bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 transition duration-200"
              >
                🔙 Cancelar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};