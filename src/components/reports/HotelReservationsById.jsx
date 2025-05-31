import React from 'react';
import { Loader2 } from 'lucide-react';
import { useReservationsByHotel } from '../../shared/hooks/reports';

export const HotelReservationsById = () => {
    const { reservations, loading, error } = useReservationsByHotel();

    if (loading) {
        return (
            <div className="flex justify-center mt-10 text-purple-600">
                <Loader2 className="animate-spin w-6 h-6 mr-2" />
                Cargando reservas...
            </div>
        );
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500 font-semibold">Error: {error}</p>;
    }

    if (reservations.length === 0) {
        return <p className="text-center mt-10 text-purple-800 font-medium">No hay reservas disponibles para este hotel.</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
            <h2 className="text-3xl font-extrabold text-purple-800 mb-6 border-b-4 border-purple-300 pb-3">
                Reservas del Hotel: {reservations[0]?.keeperRoom?.keeperHotel?.nameHotel}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {reservations.map((res) => (
                    <div
                        key={res._id}
                        className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="space-y-2 text-gray-800 text-sm">
                            <p>
                                <span className="font-semibold text-purple-700">Habitación:</span>{' '}
                                {res.keeperRoom.typeRoom}
                            </p>
                            <p>
                                <span className="font-semibold text-purple-700">Usuario:</span>{' '}
                                {res.keeperUser.username}
                            </p>
                            <p>
                                <span className="font-semibold text-purple-700">Estado:</span>{' '}
                                {res.stateReservation}
                            </p>
                            <p>
                                <span className="font-semibold text-purple-700">Fecha Inicio:</span>{' '}
                                {new Date(res.datesReservation.startDate).toLocaleDateString()}
                            </p>
                            <p>
                                <span className="font-semibold text-purple-700">Fecha Fin:</span>{' '}
                                {new Date(res.datesReservation.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-4">
                                Creada: {new Date(res.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};