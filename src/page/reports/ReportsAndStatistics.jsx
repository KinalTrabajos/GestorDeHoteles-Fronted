import React from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, CalendarCheck, ArrowLeftCircle } from 'lucide-react'
import { Footer } from '../../components/settings/Footer'

export const ReportsAndStatistics = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 via-white to-gray-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-100/40 via-white to-transparent opacity-50"></div>

      <main className="flex-grow py-16 px-6 relative z-10">
        <section className="max-w-7xl mx-auto">
          <header className="mb-14 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-teal-700 tracking-tight drop-shadow-sm">
              Reportes y Estadisticas Generales
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
              Accede a los diferentes informes disponibles en el sistema y obtén información clara y útil.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Link to="/reservationViewPage">
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-[1.02] border border-teal-100 hover:border-teal-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-teal-600">Informe de Reservas</h2>
                  <CalendarCheck className="w-8 h-8 text-teal-500 group-hover:rotate-12 transition-transform" />
                </div>
                <p className="text-gray-600">
                  Consulta las reservas agrupadas por hotel y visualiza el estado de cada confirmación.
                </p>
              </div>
            </Link>

            <Link to="/StatisticsPage">
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-[1.02] border border-teal-100 hover:border-teal-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-teal-600">Informe de Hoteles</h2>
                  <BarChart3 className="w-8 h-8 text-teal-500 group-hover:rotate-12 transition-transform" />
                </div>
                <p className="text-gray-600">
                  Visualiza el Informe en forma de estadisticas de Hoteles la cual tiene los hoteles mas solicitados entre otras.
                </p>
              </div>
            </Link>
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-teal-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-teal-700 transition"
            >
              <ArrowLeftCircle className="w-5 h-5" />
              Volver al Inicio
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
