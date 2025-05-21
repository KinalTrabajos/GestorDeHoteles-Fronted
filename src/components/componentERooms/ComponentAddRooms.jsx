import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomAdd } from "../../shared/hooks/roomsHook/useRoomsAdd";
import { useHotelsView  } from "../../shared/hooks/hotelHook/useHotelView";

export const AddRooms = () => {
    const [formData, setFormData] = useState({
        typeRoom: "",
        descriptionRoom: "",
        capacityRoom: "",
        priceRoom: "",
        date: "",
        nameHotel: ""
    });

    const navigate = useNavigate()

    const { createRoom, loading, error } = useRoomAdd();
    const [successMsg, setSuccessMsg] = useState(null);

    const { hoteles, loading: hotelsLoading, error: hotelsError } = useHotelsView();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg(null);

        const response = await createRoom(formData);

        if (response.success) {
            setSuccessMsg("Habitación agregada con éxito.");
            setFormData({
                typeRoom: "",
                descriptionRoom: "",
                capacityRoom: "",
                priceRoom: "",
                date: "",
                nameHotel: ""
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl">
            <h2 className="text-xl font-bold mb-4">Agregar Habitación</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    ></textarea>
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
                    <label className="block mb-1 font-medium">Fecha Disponible</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
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
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    {loading ? "Agregando..." : "Agregar Habitación"}
                </button>
            </form>

            <button
                className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => navigate("/habitaciones")}
            >
                Cancelar
            </button>
        </div>
    );
};
