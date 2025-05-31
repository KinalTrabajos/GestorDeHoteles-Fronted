import { useEffect, useState } from 'react';
import { useWiewHoteles } from "../../shared/hooks/hoteles";
import { fetchHotelImages } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { DeleteHotelButton } from './DeleteHotelButton';
import { AddHotelModal } from './AddHotelModal';
import { MovingMap } from '../mapa/MovingMap';

export const ViewHotel = () => {
  const { hoteles, isLoading, error } = useWiewHoteles()
  const [imagenes, setImagenes] = useState([])
  const navigate = useNavigate()


  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const role = user.role

  const [showModal, setShowModal] = useState(false)


  useEffect(() => {
    const obtenerImagenes = async () => {
      const imgs = await fetchHotelImages("hotel", 30)
      setImagenes(imgs)
    }
    obtenerImagenes()
  }, [])

  const renderStars = (typeCategory) => {
    const match = typeCategory?.match(/\d/)
    const stars = match ? parseInt(match[0]) : 0
    return "⭐".repeat(stars)
  }

  if (isLoading) return <p className="text-center mt-6">Cargando hoteles...</p>
  if (error) return <p className="text-center text-red-500 mt-6">Error al cargar hoteles</p>

  return (
    <div className="p-1">
      {(role === "HOTEL_ADMIN" || role === "PLATAFORM_ADMIN") && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-600 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-teal-700 transition-all duration-200"
          >
            Agregar 
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {hoteles.map((hotel, index) => (
            <div
              key={hotel._id}
              className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-transform hover:scale-105"
            >
              <img
                src={imagenes[index % imagenes.length]?.src?.medium || "/imagen-no-disponible.jpg"}
                alt="Imagen del hotel"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{hotel.nameHotel}</h2>
                <p className="text-gray-700">{hotel.hotelAddresss}</p>
                <p className="text-yellow-500 mb-2">
                  {renderStars(hotel.keeperCategory?.typeCategory)}
                </p>

                <button
                  onClick={() => navigate(`/hotel/${hotel._id}`)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md mb-2 hover:bg-blue-700 transition"
                >
                  Ver detalles
                </button>
                {(role === "HOTEL_ADMIN" || role === "PLATAFORM_ADMIN") && (
                  <DeleteHotelButton hotelId={hotel._id} hotelName={hotel.nameHotel} />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky top-24 ">
          <MovingMap />
        </div>

      </div>

      <AddHotelModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}