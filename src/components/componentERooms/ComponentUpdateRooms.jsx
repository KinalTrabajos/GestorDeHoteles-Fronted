import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomsView } from "../../shared/hooks/roomsHook/useRoomsView";
import { useRoomUpdate } from "../../shared/hooks/roomsHook/useRoomsUpdate";
import { useWiewHoteles } from "../../shared/hooks/hoteles/useWiewHoteles";
import { Hotel, BedDouble, LoaderCircle, ArrowLeft } from "lucide-react";

export const UpdateRooms = () => {
  const navigate = useNavigate();
  const { rooms, loading: roomsLoading, error: roomsError } = useRoomsView();
  const { hoteles, loading: hotelsLoading, error: hotelsError } = useWiewHoteles();
  const { editRoom, loading: updating, error: updateError } = useRoomUpdate();

  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [formData, setFormData] = useState({
    typeRoom: "",
    descriptionRoom: "",
    capacityRoom: "",
    priceRoom: "",
    numberRoom: "",
    nameHotel: ""
  });

  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    if (selectedRoomId) {
      const selectedRoom = rooms.find(room => room._id === selectedRoomId);
      if (selectedRoom) {
        setFormData({
          typeRoom: selectedRoom.typeRoom,
          descriptionRoom: selectedRoom.descriptionRoom,
          capacityRoom: selectedRoom.capacityRoom,
          priceRoom: selectedRoom.priceRoom,
          numberRoom: selectedRoom.numberRoom,
          nameHotel: selectedRoom.nameHotel
        });
      }
    }
  }, [selectedRoomId, rooms]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccessMsg(null);

    const response = await editRoom(selectedRoomId, formData);
    if (response.success) {
      setSuccessMsg("Habitación actualizada con éxito.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10">
      <div className="flex items-center gap-3 mb-6">
        <BedDouble className="text-green-600 w-6 h-6" />
        <h2 className="text-2xl font-bold text-gray-800">Editar Habitación</h2>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Seleccionar Habitación</label>
        {roomsLoading ? (
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <LoaderCircle className="animate-spin h-4 w-4" /> Cargando habitaciones...
          </p>
        ) : (
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200"
            value={selectedRoomId}
            onChange={(e) => setSelectedRoomId(e.target.value)}
          >
            <option value="">Seleccione una habitación</option>
            {rooms.map(room => (
              <option key={room._id} value={room._id}>
                {room.typeRoom} - {room.nameHotel}
              </option>
            ))}
          </select>
        )}
        {roomsError && <p className="text-red-600 text-sm mt-1">{roomsError}</p>}
      </div>

      {selectedRoomId && (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Tipo de Habitación</label>
            <input
              type="text"
              name="typeRoom"
              value={formData.typeRoom}
              onChange={handleChange}
              maxLength={25}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              name="descriptionRoom"
              value={formData.descriptionRoom}
              onChange={handleChange}
              maxLength={200}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Capacidad</label>
              <input
                type="number"
                name="capacityRoom"
                value={formData.capacityRoom}
                onChange={handleChange}
                min={1}
                max={10}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                name="priceRoom"
                value={formData.priceRoom}
                onChange={handleChange}
                min={1}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Número de Habitación</label>
            <input
              type="number"
              name="numberRoom"
              value={formData.numberRoom}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 flex items-center gap-1">
              <Hotel className="w-4 h-4 text-green-600" /> Hotel Asociado
            </label>
            {hotelsLoading ? (
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <LoaderCircle className="animate-spin h-4 w-4" /> Cargando hoteles...
              </p>
            ) : (
              <select
                name="nameHotel"
                value={formData.nameHotel}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
              >
                <option value="">Seleccione un hotel</option>
                {hoteles.map(hotel => (
                  <option key={hotel._id} value={hotel.nameHotel}>
                    {hotel.nameHotel}
                  </option>
                ))}
              </select>
            )}
            {hotelsError && <p className="text-red-600 text-sm mt-1">{hotelsError}</p>}
          </div>

          {updateError && <p className="text-red-600 text-sm">{updateError}</p>}
          {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {updating ? "Actualizando..." : "Actualizar Habitación"}
          </button>
        </form>
      )}

      <button
        onClick={() => navigate("/habitaciones")}
        className="mt-6 flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Cancelar
      </button>
    </div>
  );
};