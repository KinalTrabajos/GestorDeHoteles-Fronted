import React from 'react';
import { useReservationView } from '../../shared/hooks/reports/useReservationView';
import { Loader2 } from 'lucide-react';

export const ReservationReport = () => {
    const { groupedReservations, loading, error } = useReservationView();

    if (loading) {
        return (
            <div className="flex justify-center mt-10 text-blue-500">
                <Loader2 className="animate-spin w-6 h-6 mr-2" />
                Cargando reservas...
            </div>
        );
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500 font-medium">Error: {error}</p>;
    }

    const hotelNames = Object.keys(groupedReservations);

    if (hotelNames.length === 0) {
        return <p className="text-center mt-10 text-gray-700 font-semibold">No hay reservas disponibles.</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-14">
            {hotelNames.map((hotelName) => (
                <div key={hotelName}>
                    <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b-2 border-blue-200 pb-2">
                        {hotelName}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {groupedReservations[hotelName].map((res) => (
                            <div
                                key={res._id}
                                className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="space-y-2 text-gray-700 text-sm">
                                    <p>
                                        <span className="font-semibold text-blue-600">Habitación:</span>{' '}
                                        {res.keeperRoom?.typeRoom}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-blue-600">Usuario:</span>{' '}
                                        {res.keeperUser?.username}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-blue-600">Estado:</span>{' '}
                                        {res.stateReservation}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-blue-600">Fecha Inicio:</span>{' '}
                                        {new Date(res.datesReservation.startDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-blue-600">Fecha Fin:</span>{' '}
                                        {new Date(res.datesReservation.endDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-4">
                                        Creada: {new Date(res.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};