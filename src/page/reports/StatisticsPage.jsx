import React from "react";
import { StatisticsReport } from "../../components/reports/StatisticsReport";
import { ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/settings/Footer";

export const StatisticsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-100">
      <main className="flex-grow py-16 px-6 relative z-10">
        <section className="max-w-7xl mx-auto">
          <header className="mb-14 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 tracking-tight drop-shadow-sm">
              Reporte de Estadísticas
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Visualiza los hoteles más solicitados y el porcentaje de ocupación mensual.
            </p>
          </header>

          <StatisticsReport />

          <div className="mt-16 flex justify-center">
            <Link
              to="/reportsAndStatistics"
              className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-green-700 transition"
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
