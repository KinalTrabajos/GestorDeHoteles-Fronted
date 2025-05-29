export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">HotelBooking</h3>
            <p className="text-sm text-gray-400">
              Plataforma para gestionar reservas y hoteles de forma eficiente.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Enlaces útiles</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li><a href="#hoteles" className="hover:underline">Jose</a></li>
              <li><a href="#reservas" className="hover:underline">rosas</a></li>
              <li><a href="#contacto" className="hover:underline">Jeremy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Contacto</h3>
            <p className="text-sm text-gray-400">
              Dirección: Ciudad de Guatemala<br />
              Correo: contacto@hotelbooking.com<br />
              Teléfono: +502 1234 5678
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} HotelBooking. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
