import { useState } from "react";
import { useEventAdd } from "../../shared/hooks/eventsHook/useEventAdd";
import { useWiewHoteles } from "../../shared/hooks/hoteles";
import { useNavigate } from "react-router-dom";

export const EventAddForm = () => {
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

  const [service, setService] = useState({
    typeService: "",
    descriptionServices: "",
    priceService: 1
  });

  const { createEvent, loading, error } = useEventAdd();
  const { hoteles } = useWiewHoteles();
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceAdd = () => {
    setForm(prev => ({
      ...prev,
      additionalServices: [...prev.additionalServices, service]
    }));
    setService({ typeService: "", descriptionServices: "", priceService: 1 });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isPrivate = form.typeEvent === "Evento_Privado";
    const data = { ...form };
    if (isPrivate) delete data.datesEvent;

    const result = await createEvent(data, isPrivate);
    if (result.success) {
      navigate("/eventos");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🗓️ Crear Nuevo Evento</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos del evento */}
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

        {/* Fechas */}
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

        {/* Servicios adicionales */}
        <div className="border border-gray-200 p-6 rounded-xl bg-gray-50">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Servicios adicionales</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              name="typeService"
              value={service.typeService}
              onChange={e => setService({ ...service, typeService: e.target.value })}
              placeholder="Tipo de servicio"
              className="border border-gray-300 rounded-xl px-3 py-2 shadow-sm"
            />
            <input
              type="text"
              name="descriptionServices"
              value={service.descriptionServices}
              onChange={e => setService({ ...service, descriptionServices: e.target.value })}
              placeholder="Descripción"
              className="border border-gray-300 rounded-xl px-3 py-2 shadow-sm"
            />
            <input
              type="number"
              name="priceService"
              value={service.priceService}
              onChange={e => setService({ ...service, priceService: e.target.value })}
              placeholder="Precio"
              className="border border-gray-300 rounded-xl px-3 py-2 shadow-sm"
            />
          </div>

          <button
            type="button"
            onClick={handleServiceAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            ➕ Agregar servicio
          </button>
        </div>

        {/* Errores */}
        {error && <p className="text-red-500 font-medium">{error}</p>}

        {/* Botones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="submit"
            disabled={loading}
            className="py-3 w-full bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition duration-200"
          >
            {loading ? "Creando..." : "✅ Crear evento"}
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