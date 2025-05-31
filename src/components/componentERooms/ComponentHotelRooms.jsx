import { useParams, useNavigate } from "react-router-dom";
import { useRoomsByHotel } from "../../shared/hooks/roomsHook/useRoomsByIdHotel";
import { Navbar } from "../Navbars/Navbar";
import { Footer } from "../settings/Footer";

export const HotelRoomsList = () => {
  const { hotelId } = useParams();
  const { rooms, loading } = useRoomsByHotel(hotelId);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-6 py-8 pt-35">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Habitaciones del Hotel
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Cargando habitaciones...</p>
          ) : !Array.isArray(rooms) || rooms.length === 0 ? (
            <p className="text-center text-gray-500">Este hotel no tiene habitaciones registradas.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {room.typeRoom}
                  </h3>
                  <p className="text-gray-600 mb-2">{room.descriptionRoom}</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li><span className="font-medium">Capacidad:</span> {room.capacityRoom} personas</li>
                    <li><span className="font-medium">Precio:</span> Q{room.priceRoom}</li>
                    <li><span className="font-medium">Habitación:</span> {room.numberRoom}</li>
                    {room.keeperHotel && (
                      <li><span className="font-medium">Hotel:</span> {room.keeperHotel.nameHotel}</li>
                    )}
                    {room.keeperAdmin && (
                      <li><span className="font-medium">Admin:</span> {room.keeperAdmin.name}</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-full transition"
              onClick={() => navigate(`/hotel/${hotelId}`)}
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};