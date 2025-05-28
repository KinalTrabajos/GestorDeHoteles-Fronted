import { useParams } from "react-router-dom";
import { useWiewHoteles } from "../../shared/hooks/hoteles";
import { useEffect, useState } from "react";
import { fetchHotelImages } from "../../services/api";

import { Navbar } from "../Navbars/Navbar";

export const PageHotelFull = () => {
  const { id } = useParams()
  const { hoteles } = useWiewHoteles()
  const [imagenes, setImagenes] = useState([])

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const role = user.role


  useEffect(() => {
    const fetchImages = async () => {
      const imgs = await fetchHotelImages("hotel", 10)
      setImagenes(imgs)
    }
    fetchImages()
  }, [])

  const hotel = hoteles.find(h => h._id === id)

  if (!hotel) {
    return <p className="text-center mt-6">Hotel no encontrado</p>
  }

  const renderStars = (typeCategory) => {
    const match = typeCategory?.match(/\d/)
    const stars = match ? parseInt(match[0]) : 0
    return "⭐".repeat(stars)
  }

  return (
    <>
      <Navbar/>

      <div className="max-w-4xl mx-auto p-6 mt-13">
      <h1 className="text-4xl font-bold mb-4">{hotel.nameHotel}</h1>

      <img
        src={imagenes[0]?.src?.original || "/imagen-no-disponible.jpg"}
        alt="Imagen del hotel"
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <p className="mb-2 text-gray-700 text-lg">
        <strong>Dirección:</strong> {hotel.hotelAddresss}
      </p>

      <p className="mb-2 text-yellow-600">
        <strong>Categoría:</strong> {renderStars(hotel.keeperCategory?.typeCategory)}
      </p>

      <p className="mb-2 text-gray-700">
        <strong>Administrador:</strong> {hotel.keeperAdmin?.name}
      </p>

      {hotel.services && hotel.services.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Servicios</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {hotel.services.map((servicio) => (
              <li key={servicio._id} className="mb-2">
                <strong>{servicio.typeService}:</strong> {servicio.description} (Q{servicio.priceService})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
          <h2 className="text-2xl font-semibold mb-2">Habitaciones</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
              Ver Habitaciones
          </button>

      </div> 

      {hotel.keeperEvents && hotel.keeperEvents.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Eventos</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {hotel.keeperEvents.map((event) => (
              <li key={event._id} className="mb-2">
                <strong>{event.nameEvent}</strong> - {event.descriptionEvent}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 p-4 bg-white rounded-xl shadow-md border border-gray-200">
        {(role === "HOTEL_ADMIN" || role === "PLATAFORM_ADMIN") && (
          <>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Opciones del Hotel</h2>
            <div className="flex flex-wrap gap-4">
              <button className="bg-yellow-500 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-yellow-600 transition-all duration-200">
                Editar hoteles
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  )
}
