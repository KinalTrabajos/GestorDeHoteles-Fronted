import { Navbar } from "../Navbars/Navbar"

export const PagePrincipal = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <section className="relative pt-24 bg-[url('https://img2.wallspic.com/crops/9/7/7/5/85779/85779-area_urbana-nueva_york-urbe-hito-paisaje_urbano-3840x2160.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="relative z-10 px-6 py-32 text-center text-white sm:py-48 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-6xl">Bienvenido a HotelBooking</h1>
          <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
            Tu lugar ideal para gestionar reservas, habitaciones, eventos y más de forma rápida y sencilla.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a
              href="#reservas"
              className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold shadow hover:bg-indigo-500"
            >
              Hacer una Reserva
            </a>
            <a
              href="#hoteles"
              className="rounded-md border border-white px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-black"
            >
              Ver Hoteles
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">¿Qué puedes hacer aquí?</h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {[
              { title: "Hoteles", desc: "Explora y gestiona la información de tus hoteles.", icon: "🏨" },
              { title: "Habitaciones", desc: "Administra habitaciones disponibles, precios y más.", icon: "🛏️" },
              { title: "Reservas", desc: "Realiza, edita o cancela reservaciones fácilmente.", icon: "📅" },
              { title: "Eventos", desc: "Organiza y visualiza eventos especiales en tu hotel.", icon: "🎉" },
              { title: "Informes", desc: "Consulta estadísticas y reportes detallados.", icon: "📊" },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
