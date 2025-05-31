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
  const { hoteles, isLoading: loadingHoteles } = useWiewHoteles();
  const { reservations, loading: loadingByHotel, error: errorByHotel, total: totalByHotel } = useBookingsByHotel(selectedHotelId);
  const { confirm, loading: confirming } = useConfirmBooking();
  const { cancel, loading: canceling } = useCancelBooking();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isHotelAdmin = user?.role === "HOTEL_ADMIN";

  const handleConfirm = async (id) => {
    const updated = await confirm(id);
    if (updated) refetch();
  };

  const handleCancel = async (id) => {
    const result = await cancel(id);
    if (result) refetch();
  };

  const isLoading = selectedHotelId ? loadingByHotel : loadingAll;
  const error = selectedHotelId ? errorByHotel : errorAll;
  const data = selectedHotelId ? reservations : bookings;
  const totalToShow = selectedHotelId ? totalByHotel : total;

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-6 py-8 pt-35">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Reservas actuales ({totalToShow})
          </h2>

          {/* Selector de hoteles */}
          <div className="mb-6 flex flex-col items-center">
            {loadingHoteles ? (
              <p className="text-gray-500">Cargando hoteles...</p>
            ) : (
              <select
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={selectedHotelId}
                onChange={(e) => setSelectedHotelId(e.target.value)}
              >
                <option value="">Todas las reservas</option>
                {hoteles.map((hotel) => (
                  <option key={hotel._id} value={hotel._id}>
                    Reservas en: {hotel.nameHotel}
                  </option>
                ))}
              </select>
            )}
          </div>

          {(
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-full transition"
                onClick={() => navigate("/agregarReserva")}
              >
                Agregar reserva
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-full transition"
                onClick={() => navigate("/editarReserva")}
              >
                Editar reserva
              </button>
            </div>
          )}

          {/* Lista de reservas */}
          {isLoading ? (
            <p className="text-center text-gray-500">Cargando reservas...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : data.length === 0 ? (
            <p className="text-center text-gray-500">No hay reservas registradas.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data
                .filter((booking) => isHotelAdmin || booking.keeperUser?.uid === user?._id)
                .map((booking) => (
                  console.log('Usuario dueño:', booking.keeperUser),
                  console.log('Usuario logueado:', user),
                  <div
                    key={booking._id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Reserva #{booking._id.slice(-6)}
                    </h3>
                    <p className="text-gray-600 mb-2">{booking.keeperRoom?.descriptionRoom}</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li><span className="font-medium">Cliente:</span> {booking.keeperUser?.username}</li>
                      <li><span className="font-medium">Habitación:</span> {booking.keeperRoom?.typeRoom}</li>
                      <li><span className="font-medium">Hotel:</span> {booking.keeperRoom?.keeperHotel?.nameHotel}</li>
                      <li><span className="font-medium">Entrada:</span> {new Date(booking.datesReservation?.startDate).toLocaleDateString()}</li>
                      <li><span className="font-medium">Salida:</span> {new Date(booking.datesReservation?.endDate).toLocaleDateString()}</li>
                      <li><span className="font-medium">Estado:</span> {booking.stateReservation}</li>
                    </ul>

                    {/* Botones de acción */}
                    {/* Botón confirmar solo para admin */}
                    {isHotelAdmin && booking.stateReservation !== "Confirmada" && (
                      <button
                        onClick={() => handleConfirm(booking._id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                        disabled={confirming}
                      >
                        {confirming ? "Confirmando..." : "Confirmar"}
                      </button>
                    )}

                    {/* Botón cancelar solo para el usuario dueño */}
                    {(isHotelAdmin || booking.keeperUser?.uid === user?._id) && booking.stateReservation !== "Cancelada" && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                        disabled={canceling}
                      >
                        {canceling ? "Cancelando..." : "Cancelar"}
                      </button>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};