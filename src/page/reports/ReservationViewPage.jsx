import React from 'react';
import { ReservationReport } from '../../components/reports/ReservationReport';

export const ReservationViewPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <section className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Reporte de Reservas</h1>
          <p className="mt-2 text-gray-600">
            Consulta las reservas agrupadas por hotel. Aquí puedes ver el detalle de cada reserva confirmada.
          </p>
        </header>

        <ReservationReport />
      </section>
    </main>
  );
};