import { useState, useEffect } from "react";
import { useEventUpdate } from "../../shared/hooks/eventsHook/useEventUpdate";
import { useWiewHoteles } from "../../shared/hooks/hoteles";
import { useEventsView } from "../../shared/hooks/eventsHook/useEventView"; // tu hook que lista eventos
import { useNavigate } from "react-router-dom";

export const EventEditForm = () => {
  const { events } = useEventsView();
  const { hoteles } = useWiewHoteles();
  const { editEvent, loading, error } = useEventUpdate();

  const [selectedEventId, setSelectedEventId] = useState("");
  const [event, setEvent] = useState(null);

  const navigate = useNavigate()

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
    if (result.success) alert("Evento actualizado correctamente");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Editar Evento</h2>

      <select
        value={selectedEventId}
        onChange={e => setSelectedEventId(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      >
        <option value="">Selecciona un evento</option>
        {events.map(ev => (
          <option key={ev._id} value={ev._id}>
            {ev.nameEvent}
          </option>
        ))}
      </select>

      {event && (
        <>
          <input
            type="text"
            name="nameEvent"
            value={form.nameEvent}
            onChange={handleChange}
            placeholder="Nombre del evento"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <select
            name="nameHotel"
            value={form.nameHotel}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
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
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="Evento_General">Evento General</option>
            <option value="Evento_Privado">Evento Privado</option>
          </select>

          {form.typeEvent === "Evento_General" && (
            <div className="flex gap-4">
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          )}

          <input
            type="number"
            name="priceEvent"
            value={form.priceEvent}
            onChange={handleChange}
            min={1}
            placeholder="Precio del evento"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            {loading ? "Actualizando..." : "Actualizar evento"}
          </button>

          {error && <p className="text-red-500 font-semibold">{error}</p>}
        </>
      )}
      <button
          type="button"
          onClick={() => navigate("/eventos")}
          className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Cancelar
        </button>
    </form>
  );
};
