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
      alert("Evento creado exitosamente");
      navigate("/eventos");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Agregar Evento</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="nameEvent"
          value={form.nameEvent}
          onChange={handleChange}
          placeholder="Nombre del evento"
          required
          className="w-full border rounded-md px-3 py-2"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
          className="w-full border rounded-md px-3 py-2"
        />

        <select
          name="nameHotel"
          value={form.nameHotel}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-3 py-2"
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
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="Evento_General">Evento General</option>
          <option value="Evento_Privado">Evento Privado</option>
        </select>

        {form.typeEvent === "Evento_General" && (
          <>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </>
        )}

        <input
          type="number"
          name="priceEvent"
          value={form.priceEvent}
          onChange={handleChange}
          min={1}
          placeholder="Precio del evento"
          required
          className="w-full border rounded-md px-3 py-2"
        />

        <div className="border p-4 rounded-md bg-gray-50">
          <h4 className="font-semibold mb-2">Servicios adicionales</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              type="text"
              name="typeService"
              value={service.typeService}
              onChange={e => setService({ ...service, typeService: e.target.value })}
              placeholder="Tipo de servicio"
              className="border rounded-md px-3 py-2"
            />
            <input
              type="text"
              name="descriptionServices"
              value={service.descriptionServices}
              onChange={e => setService({ ...service, descriptionServices: e.target.value })}
              placeholder="Descripción"
              className="border rounded-md px-3 py-2"
            />
            <input
              type="number"
              name="priceService"
              value={service.priceService}
              onChange={e => setService({ ...service, priceService: e.target.value })}
              placeholder="Precio"
              className="border rounded-md px-3 py-2"
            />
          </div>
          <button
            type="button"
            onClick={handleServiceAdd}
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Agregar servicio
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? "Creando..." : "Crear evento"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/eventos")}
          className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
