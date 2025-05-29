import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomsView } from "../../shared/hooks/roomsHook/useRoomsView";
import { useRoomUpdate } from "../../shared/hooks/roomsHook/useRoomsUpdate";
import { useHotelsView } from "../../shared/hooks/hotelHook/useHotelView";

export const UpdateRooms = () => {
    const navigate = useNavigate();
    const { rooms, loading: roomsLoading, error: roomsError } = useRoomsView();
    const { hoteles, loading: hotelsLoading, error: hotelsError } = useHotelsView();
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
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl">
            <h2 className="text-xl font-bold mb-4">Editar Habitación</h2>

            <div className="mb-4">
                <label className="block mb-1 font-medium">Seleccionar Habitación</label>
                {roomsLoading ? (
                    <p>Cargando habitaciones...</p>
                ) : (
                    <select
                        className="w-full px-3 py-2 border rounded-md"
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
                {roomsError && <p className="text-red-500 text-sm">{roomsError}</p>}
            </div>

            {selectedRoomId && (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Tipo de Habitación</label>
                        <input
                            type="text"
                            name="typeRoom"
                            value={formData.typeRoom}
                            onChange={handleChange}
                            required
                            maxLength={25}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Descripción</label>
                        <textarea
                            name="descriptionRoom"
                            value={formData.descriptionRoom}
                            onChange={handleChange}
                            required
                            maxLength={200}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Capacidad</label>
                        <input
                            type="number"
                            name="capacityRoom"
                            value={formData.capacityRoom}
                            onChange={handleChange}
                            required
                            min={1}
                            max={10}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Precio</label>
                        <input
                            type="number"
                            name="priceRoom"
                            value={formData.priceRoom}
                            onChange={handleChange}
                            required
                            min={1}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Numero de Habitación</label>
                        <input
                            type="number"
                            name="numberRoom"
                            value={formData.numberRoom}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Nombre del Hotel</label>
                        {hotelsLoading ? (
                            <p className="text-sm text-gray-500">Cargando hoteles...</p>
                        ) : (
                            <select
                                name="nameHotel"
                                value={formData.nameHotel}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="">Seleccione un hotel</option>
                                {hoteles.map(hotel => (
                                    <option key={hotel._id} value={hotel.nameHotel}>
                                        {hotel.nameHotel}
                                    </option>
                                ))}
                            </select>
                        )}
                        {hotelsError && <p className="text-red-500 text-sm">{hotelsError}</p>}
                    </div>

                    {updateError && <p className="text-red-500 text-sm">{updateError}</p>}
                    {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                    >
                        {updating ? "Actualizando..." : "Actualizar Habitación"}
                    </button>
                </form>
            )}

            <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={() => navigate("/habitaciones")}
            >
                Cancelar
            </button>
        </div>
    );
};
