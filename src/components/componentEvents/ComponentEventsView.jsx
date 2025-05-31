import React, { useState } from 'react';
import { useEventsView } from '../../shared/hooks/eventsHook/useEventView';
import { useEventDelete } from '../../shared/hooks/eventsHook/useEventDelete';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../settings/Footer';
import { AddReservationEventModal } from '../ReservationEvents/AddReservationEventModal';

export const EventsList = () => {
    const { events, loading, error, total } = useEventsView();
    const { removeEvent, loading: deleting, error: deleteError } = useEventDelete();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const isHotelAdmin = user?.role === "HOTEL_ADMIN";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

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

    return (
        <>
            <div className="min-h-screen bg-gray-100 px-6 py-8 pt-35">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Eventos Disponibles ({total})
                    </h2>

                    {/* Botones acciones admin */}
                    {isHotelAdmin && (
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-full transition"
                                onClick={() => navigate("/agregarEventos")}
                            >
                                Agregar evento
                            </button>
                            <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-full transition"
                                onClick={() => navigate("/editarEventos")}
                            >
                                Editar evento
                            </button>
                            <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-full transition"
                                onClick={() => navigate("/editarServiciosDeEventos")}
                            >
                                Editar servicios
                            </button>
                        </div>
                    )}

                    {/* Estados de carga / error */}
                    {loading ? (
                        <p className="text-center text-gray-500">Cargando eventos...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">Error: {error}</p>
                    ) : events.length === 0 ? (
                        <p className="text-center text-gray-500">No hay eventos registrados.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event) => (
                                <div
                                    key={event._id}
                                    className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                                >
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {event.nameEvent}
                                    </h3>

                                    <p className="text-gray-600 mb-2">{event.description}</p>

                                    {event.typeEvent === "Evento_General" && event.datesEvent && (
                                        <>
                                            <p className="text-sm text-gray-700 mb-1">
                                                <span className="font-medium">Desde:</span>{" "}
                                                {new Date(event.datesEvent.startDate).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-700 mb-1">
                                                <span className="font-medium">Hasta:</span>{" "}
                                                {new Date(event.datesEvent.endDate).toLocaleDateString()}
                                            </p>
                                        </>
                                    )}

                                    {event.keeperHotel && (
                                        <p className="text-sm text-gray-700 mb-1">
                                            <span className="font-medium">Hotel:</span> {event.keeperHotel.nameHotel}
                                        </p>
                                    )}

                                    <p className="text-sm text-gray-700 mb-1">
                                        <span className="font-medium">Tipo de evento:</span> {event.typeEvent}
                                    </p>

                                    <p className="text-sm text-gray-700 mb-2">
                                        <span className="font-medium">Precio del evento:</span> Q{event.priceEvent}
                                    </p>

                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">
                                            Servicios Adicionales:
                                        </h4>
                                        {event.additionalServices && event.additionalServices.length > 0 ? (
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                {event.additionalServices.map((service, index) => (
                                                    <li key={index}>
                                                        <span className="font-medium">{service.typeService}:</span>{" "}
                                                        {service.descriptionServices} (Q{service.priceService})
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-gray-500">No hay servicios adicionales.</p>
                                        )}
                                    </div>

                                    {isHotelAdmin && (
                                        <button
                                            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                                            onClick={() => handleDeleteEvent(event._id)}
                                            disabled={deleting}
                                        >
                                            {deleting ? "Eliminando..." : "Eliminar evento"}
                                        </button>
                                    )}

                                    {/* Botón de reserva visible para todos */}
                                    <button
                                        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
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
            </div>

            {/* Modal para reservar evento */}
            <AddReservationEventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                eventId={selectedEventId}
            />
            <Footer />
        </>
    );
};
