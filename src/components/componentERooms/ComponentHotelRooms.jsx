import { useParams, useNavigate } from "react-router-dom";
import { useRoomsByHotel } from "../../shared/hooks/roomsHook/useRoomsByIdHotel";
import { Navbar } from "../Navbars/Navbar";
import { Footer } from "../settings/Footer";

export const HotelRoomsList = () => {
  const { hotelId } = useParams();
  const { rooms, loading } = useRoomsByHotel(hotelId);
  const navigate = useNavigate()

  if (loading) return <p className="p-4 text-gray-500">Cargando habitaciones...</p>;

  if (!Array.isArray(rooms) || rooms.length === 0) {
    return <p className="p-4 text-gray-500">Este hotel no tiene habitaciones registradas.</p>;
  }

  return (
    <>
    <Navbar/>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">
          Habitaciones del hotel ({rooms.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div key={room._id} className="border rounded-lg shadow-md p-4 bg-white">
              <h3 className="text-xl font-semibold text-blue-700">{room.typeRoom}</h3>
              <p className="text-gray-600">{room.descriptionRoom}</p>
              <p><strong>Capacidad:</strong> {room.capacityRoom} personas</p>
              <p><strong>Precio:</strong> Q{room.priceRoom}</p>
              <p><strong>Número de habitación:</strong> {room.numberRoom}</p>

              {room.keeperHotel && (
                <p><strong>Hotel:</strong> {room.keeperHotel.nameHotel}</p>
              )}
              {room.keeperAdmin && (
                <p><strong>Administrador:</strong> {room.keeperAdmin.name}</p>
              )}
            </div>
          ))}
        </div>
        <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={() => navigate(`/hotel/${hotelId}`)}
            >
                Regresar
            </button>
      </div>
      <Footer />
    </>
  );
};
