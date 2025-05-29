import { ViewHotel } from "../Hoteles/ViewHotel";
import { Navbar } from "../Navbars/Navbar";
import { Footer } from "../settings/Footer";

export const PagePrincipal = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
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

        <section id="hoteles" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-[5px]">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Nuestros Hoteles</h2>
            <ViewHotel />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}