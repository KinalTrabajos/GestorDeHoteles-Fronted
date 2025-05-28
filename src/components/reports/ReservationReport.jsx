import React from 'react';
import { useReservationView } from '../../shared/hooks/reports/useReservationView';

export const ReservationReport = () => {
    const { groupedReservations, loading, error } = useReservationView();

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Cargando reservas...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
    }

    const hotelNames = Object.keys(groupedReservations);

    if (hotelNames.length === 0) {
        return <p className="text-center mt-10 text-gray-700">No hay reservas disponibles.</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
            {hotelNames.map((hotelName) => (
                <div key={hotelName}>
                    <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b pb-2">
                        {hotelName}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {groupedReservations[hotelName].map((res) => (
                            <div
                                key={res._id}
                                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="space-y-2 text-gray-700">
                                    <p>
                                        <span className="font-semibold">Habitación:</span> {res.keeperRoom.typeRoom}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Usuario:</span> {res.keeperUser.username}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Estado:</span> {res.stateReservation}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Fecha Inicio:</span>{' '}
                                        {new Date(res.datesReservation.startDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Fecha Fin:</span>{' '}
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
