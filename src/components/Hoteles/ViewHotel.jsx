import { useEffect, useState } from 'react';
import { useWiewHoteles } from "../../shared/hooks/hoteles";
import { fetchHotelImages } from "../../services/api";
import { useNavigate } from "react-router-dom";

export const ViewHotel = () => {
  const { hoteles, isLoading, error } = useWiewHoteles()
  const [imagenes, setImagenes] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerImagenes = async () => {
      const imgs = await fetchHotelImages("hotel", 30)
      setImagenes(imgs);
    }
    obtenerImagenes()
  }, [])

  const renderStars = (typeCategory) => {
    const match = typeCategory?.match(/\d/)
    const stars = match ? parseInt(match[0]) : 0
    return "⭐".repeat(stars)
  };

  if (isLoading) return <p className="text-center mt-6">Cargando hoteles...</p>
  if (error) return <p className="text-center text-red-500 mt-6">Error al cargar hoteles</p>

  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
    {hoteles.map((hotel, index) => (
          <div
            key={hotel._id}
            onClick={() => navigate(`/hotel/${hotel._id}`)}
            className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-transform hover:scale-105 cursor-pointer"
          >
          <img
            src={imagenes[index % imagenes.length]?.src?.medium || "/imagen-no-disponible.jpg"}
            alt="Imagen del hotel"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{hotel.nameHotel}</h2>
          <p className="text-gray-700 mb-1">{hotel.hotelAddresss}</p>
          <p className="text-yellow-500 mb-1">
            {renderStars(hotel.keeperCategory?.typeCategory)}
          </p>
        </div>
      ))}
    </div>
  )
}
