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

        const data = {
            additionalServices: [service]
        };

        const res = await editEventServices(selectedEventId, data);
        if (res.success) {
            alert("Servicio agregado exitosamente");
            setService({ typeService: "", descriptionServices: "", priceService: "" });
        } else {
            alert("Error: " + res.msg);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4 text-center">Editar Servicios del Evento</h2>

            <label className="block mb-2 text-sm font-medium">
                Selecciona un evento:
            </label>
            <select
                className="w-full mb-4 p-2 border rounded"
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

            {errorEvents && <p className="text-red-500 mb-2">{errorEvents}</p>}

            <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium mb-1">Tipo de Servicio</label>
                <input
                    type="text"
                    name="typeService"
                    value={service.typeService}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                    required
                />

                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                    name="descriptionServices"
                    value={service.descriptionServices}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                    required
                />

                <label className="block text-sm font-medium mb-1">Precio</label>
                <input
                    type="number"
                    name="priceService"
                    value={service.priceService}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    required
                    min={1}
                />

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    disabled={loading || loadingEvents}
                >
                    {loading ? "Actualizando..." : "Actualizar Servicio"}
                </button>

                {error && <p className="text-red-600 mt-2">{error}</p>}
            </form>
            <button
          type="button"
          onClick={() => navigate("/eventos")}
          className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Cancelar
        </button>
        </div>
    );
};
