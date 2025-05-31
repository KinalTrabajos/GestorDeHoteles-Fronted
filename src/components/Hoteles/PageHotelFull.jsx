import { useParams } from "react-router-dom";
import { useWiewHoteles } from "../../shared/hooks/hoteles";
import { useEffect, useState } from "react";
import { fetchHotelImages } from "../../services/api";
import { Navbar } from "../Navbars/Navbar";
import { UpdateHotelModal } from "./UpdateHotelModal";
import { Footer } from "../settings/Footer";
import { useNavigate } from "react-router-dom";

export const PageHotelFull = () => {
  const { id } = useParams()
  const { hoteles } = useWiewHoteles()
  const [imagenes, setImagenes] = useState([])
  const [isEditOpen, setIsEditOpen] = useState(false)
  const navigate = useNavigate();

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

  const handleVerHabitaciones = () => {
    navigate(`/hotels/${hotel._id}/rooms`);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-7 pt-19 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          {hotel.nameHotel}
        </h1>

        <div className="rounded-2xl overflow-hidden shadow-md mb-8">
          <img
            src={imagenes[0]?.src?.original || "/imagen-no-disponible.jpg"}
            alt="Imagen del hotel"
            className="w-full h-80 object-cover"
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border border-gray-100">
          <div className="text-lg text-gray-700">
            <span className="font-semibold text-gray-800">Dirección:</span>{" "}
            {hotel.hotelAddresss}
          </div>

          <div className="text-lg text-yellow-600">
            <span className="font-semibold">Categoría:</span>{" "}
            {renderStars(hotel.keeperCategory?.typeCategory)}
          </div>

          <div className="text-lg text-gray-700">
            <span className="font-semibold text-gray-800">Administrador:</span>{" "}
            {hotel.keeperAdmin?.name}
          </div>

          {hotel.services?.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Servicios</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {hotel.services.map((servicio) => (
                  <li key={servicio._id}>
                    <span className="font-semibold">{servicio.typeService}:</span>{" "}
                    {servicio.description}
                    <span className="text-sm text-green-600">(Q{servicio.priceService})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Habitaciones</h2>
            <button onClick={handleVerHabitaciones} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition duration-200">
              Ver Habitaciones
            </button>
          </div>

          {hotel.keeperEvents?.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Eventos</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {hotel.keeperEvents.map((event) => (
                  <li key={event._id}>
                    <span className="font-semibold">{event.nameEvent}</span> - {event.descriptionEvent}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {(role === "HOTEL_ADMIN" || role === "PLATAFORM_ADMIN") && (
          <div className="mt-10">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Opciones del Hotel
              </h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="bg-yellow-500 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-yellow-600 transition"
                >
                  Editar hotel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      <Footer />
      <UpdateHotelModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </>
  )
}