import { useEventsView } from '../../shared/hooks/eventsHook/useEventView';
import { useEventDelete } from '../../shared/hooks/eventsHook/useEventDelete';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../settings/Footer';
import { useState } from 'react';
import { AddReservationEventModal } from "../ReservationEvents/AddReservationEventModal";


export const EventsList = () => {
    const { events, loading, error, total } = useEventsView();
    const { removeEvent, loading: deleting, error: deleteError } = useEventDelete();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [selectedEventServices, setSelectedEventServices] = useState([]);

    const openReservationModal = (eventId) => {
        setSelectedEventId(eventId);
        setIsModalOpen(true);
    };

    const handleDeleteEvent = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este evento?");
        if (!confirmDelete) return;

        const result = await removeEvent(id);
        if (result.success) {
            alert("Evento eliminado correctamente");
        } else {
            alert("Error al eliminar el evento: " + result.msg);
        }
    };

    if (loading) return <p className="text-center">Cargando eventos...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Eventos Disponibles ({total})</h2>

                {/* 🔘 Botones de acciones */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={() => navigate("/agregarEventos")}
                    >
                        Agregar evento
                    </button>
                    <button
                        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                        onClick={() => navigate("/editarEventos")}
                    >
                        Editar evento
                    </button>
                    <button
                        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                        onClick={() => navigate("/editarServiciosDeEventos")}
                    >
                        Editar servicios
                    </button>
                </div>

                {events.length === 0 ? (
                    <p>No hay eventos registrados.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {events.map((event) => (
                            <div key={event._id} className="border rounded-lg shadow-md p-4 bg-white">
                                <h3 className="text-xl font-semibold mb-1">{event.nameEvent}</h3>

                                <p className="text-gray-700 mb-1">
                                    <strong>Descripción:</strong> {event.description}
                                </p>

                                {event.typeEvent === "Evento_General" && event.datesEvent && (
                                    <>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <strong>Desde:</strong>{" "}
                                            {new Date(event.datesEvent.startDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <strong>Hasta:</strong>{" "}
                                            {new Date(event.datesEvent.endDate).toLocaleDateString()}
                                        </p>
                                    </>
                                )}

                                {event.keeperHotel && (
                                    <p className="text-sm text-gray-700 mb-1">
                                        <strong>Hotel:</strong> {event.keeperHotel.nameHotel}
                                    </p>
                                )}

                                <p className="text-sm text-gray-700 mb-1">
                                    <strong>Tipo de evento:</strong> {event.typeEvent}
                                </p>

                                <p className="text-sm text-gray-700 mb-2">
                                    <strong>Precio del evento:</strong> Q{event.priceEvent}
                                </p>

                                <div className="mt-2">
                                    <h4 className="font-semibold text-gray-800 mb-1">
                                        Servicios Adicionales:
                                    </h4>
                                    {event.additionalServices && event.additionalServices.length > 0 ? (
                                        <ul className="list-disc list-inside text-sm text-gray-700">
                                            {event.additionalServices.map((service, index) => (
                                                <li key={index}>
                                                    <strong>{service.typeService}:</strong>{" "}
                                                    {service.descriptionServices} (Q{service.priceService})
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">No hay servicios adicionales.</p>
                                    )}
                                </div>

                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                    onClick={() => handleDeleteEvent(event._id)}
                                    disabled={deleting}
                                >
                                    {deleting ? "Eliminando..." : "Eliminar evento"}
                                </button>

                                <button
                                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                    onClick={() => openReservationModal(event._id)}
                                >
                                    Agregar reservación
                                </button>

                                {deleteError && (
                                    <p className="text-red-500 mt-2 text-center">Error: {deleteError}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
                <AddReservationEventModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    eventId={selectedEventId}
                />
            <Footer />
        </>
    );
};
