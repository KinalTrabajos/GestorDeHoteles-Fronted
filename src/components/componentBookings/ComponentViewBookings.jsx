import React, { useState } from 'react';
import { useBookingsView } from '../../shared/hooks/bookingsHook/useBookingsView';
import { useBookingsByHotel } from '../../shared/hooks/bookingsHook/useBookingsByHotelView';
import { useWiewHoteles } from '../../shared/hooks/hoteles/useWiewHoteles';
import { useConfirmBooking } from '../../shared/hooks/bookingsHook/useConfirmBooking';
import { useCancelBooking } from '../../shared/hooks/bookingsHook/useCancelBooking';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../settings/Footer';

export const BookingsList = () => {
    const [selectedHotelId, setSelectedHotelId] = useState('');
    const { bookings, loading: loadingAll, error: errorAll, total, refetch } = useBookingsView();
    const { hoteles } = useWiewHoteles();
    const { reservations, loading: loadingByHotel, error: errorByHotel, total: totalByHotel } = useBookingsByHotel(selectedHotelId);
    const { confirm, loading: confirming, error: confirmError } = useConfirmBooking();
    const { cancel, loading: canceling, error: cancelError } = useCancelBooking();
    const navigate = useNavigate();

    const handleHotelChange = (e) => {
        setSelectedHotelId(e.target.value);
    };

    const handleConfirm = async (id) => {
        const updated = await confirm(id);
        if (updated) {
            refetch();
        }
    };

    const handleCancel = async (id) => {
        const result = await cancel(id);
        if (result) {
            refetch();
        }
    };

    const isLoading = selectedHotelId ? loadingByHotel : loadingAll;
    const error = selectedHotelId ? errorByHotel : errorAll;
    const data = selectedHotelId ? reservations : bookings;
    const totalToShow = selectedHotelId ? totalByHotel : total;

    return (
        <>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Reservas actuales ({totalToShow})</h2>

                <div className="mb-4">
                    <label htmlFor="hotelSelect" className="block font-medium mb-2">Filtrar por hotel:</label>
                    <select
                        id="hotelSelect"
                        value={selectedHotelId}
                        onChange={handleHotelChange}
                        className="border rounded px-4 py-2 w-full md:w-1/2"
                    >
                        <option value="">todas las reservas</option>
                        {hoteles.map((hotel) => (
                            <option key={hotel._id} value={hotel._id}>
                                Reservas en: {hotel.nameHotel}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 🔘 Botón para agregar habitación */}
                <button
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => navigate("/agregarReserva")}
                >
                    Agregar reserva
                </button>
                <button
                    className="mb-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => navigate("/editarReserva")}
                >
                    Editar reserva
                </button>

                {isLoading ? (
                    <p>Cargando reservas...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <>
                        {Array.isArray(data) && data.length === 0 ? (
                            <p>No hay reservas registradas.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {data.map((booking) => (
                                    <div key={booking._id} className="border rounded-lg shadow-md p-4 bg-white">
                                        <h3 className="text-xl font-semibold">Reserva #{booking._id}</h3>
                                        <p><strong>Cliente:</strong> {booking.keeperUser?.username}</p>
                                        <p><strong>Habitación:</strong> {booking.keeperRoom?.typeRoom}</p>
                                        <p><strong>Hotel:</strong> {booking.keeperRoom?.keeperHotel?.nameHotel}</p>
                                        <p><strong>Fecha de entrada:</strong> {new Date(booking.datesReservation?.startDate).toLocaleString()}</p>
                                        <p><strong>Fecha de salida:</strong> {new Date(booking.datesReservation?.endDate).toLocaleString()}</p>
                                        <p><strong>Estado:</strong> {booking.stateReservation}</p>


                                        {booking.stateReservation !== "Confirmada" && (
                                            <button
                                                onClick={() => handleConfirm(booking._id)}
                                                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                                disabled={confirming}
                                            >
                                                {confirming ? "Confirmando..." : "Confirmar"}
                                            </button>
                                        )}

                                        {confirmError && (
                                            <p className="text-red-500 text-sm mt-1">{confirmError}</p>
                                        )}

                                        {booking.stateReservation !== "Cancelada" && (
                                            <button
                                                onClick={() => handleCancel(booking._id)}
                                                className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                disabled={canceling}
                                            >
                                                {canceling ? "Cancelando..." : "Cancelar"}
                                            </button>
                                        )}

                                        {cancelError && (
                                            <p className="text-red-500 text-sm mt-1">{cancelError}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};
