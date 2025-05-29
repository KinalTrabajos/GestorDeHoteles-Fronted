import React from 'react';
import { ReservationReport } from '../../components/reports/ReservationReport';
import { ArrowLeftCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/settings/Footer';

export const ReservationViewPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
      <main className="flex-grow py-16 px-6 relative z-10">
        <section className="max-w-7xl mx-auto">
          <header className="mb-14 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 tracking-tight drop-shadow-sm">
              Reporte de Reservas
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Consulta las reservas agrupadas por hotel. Aquí puedes ver el detalle de cada reserva confirmada.
            </p>
          </header>

          <ReservationReport />

          <div className="mt-16 flex justify-center">
            <Link
              to="/reportsAndStatistics"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
            >
              <ArrowLeftCircle className="w-5 h-5" />
              Volver a Reportes
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};