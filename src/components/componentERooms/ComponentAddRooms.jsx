import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomAdd } from "../../shared/hooks/roomsHook/useRoomsAdd";
import { useWiewHoteles } from "../../shared/hooks/hoteles/useWiewHoteles";
import { BedDouble, Hotel, Info, Landmark, BadgePlus, XCircle } from "lucide-react";

export const AddRooms = () => {
    const [formData, setFormData] = useState({
        typeRoom: "",
        descriptionRoom: "",
        capacityRoom: "",
        priceRoom: "",
        numberRoom: "",
        nameHotel: ""
    });

    const navigate = useNavigate();
    const { createRoom, loading, error } = useRoomAdd();
    const { hoteles, loading: hotelsLoading, error: hotelsError } = useWiewHoteles();
    const [successMsg, setSuccessMsg] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                numberRoom: "",
                nameHotel: ""
            });
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10 border">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6 flex items-center justify-center gap-2">
                <BedDouble className="w-6 h-6" /> Nueva Habitación
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-semibold text-sm">Tipo de Habitación</label>
                    <div className="relative">
                        <Landmark className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            name="typeRoom"
                            value={formData.typeRoom}
                            onChange={handleChange}
                            required
                            maxLength={25}
                            className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-sm">Descripción</label>
                    <div className="relative">
                        <Info className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        <textarea
                            name="descriptionRoom"
                            value={formData.descriptionRoom}
                            onChange={handleChange}
                            required
                            maxLength={200}
                            className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ></textarea>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-semibold text-sm">Capacidad</label>
                        <input
                            type="number"
                            name="capacityRoom"
                            value={formData.capacityRoom}
                            onChange={handleChange}
                            required
                            min={1}
                            max={10}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-sm">Precio (Q)</label>
                        <input
                            type="number"
                            name="priceRoom"
                            value={formData.priceRoom}
                            onChange={handleChange}
                            required
                            min={1}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-sm">Número de Habitación</label>
                    <input
                        type="number"
                        name="numberRoom"
                        value={formData.numberRoom}
                        onChange={handleChange}
                        required
                        min={1}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-sm">Nombre del Hotel</label>
                    {hotelsLoading ? (
                        <p className="text-sm text-gray-500">Cargando hoteles...</p>
                    ) : (
                        <div className="relative">
                            <Hotel className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                            <select
                                name="nameHotel"
                                value={formData.nameHotel}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Seleccione un hotel</option>
                                {hoteles.map(hotel => (
                                    <option key={hotel._id} value={hotel.nameHotel}>
                                        {hotel.nameHotel}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {hotelsError && <p className="text-red-500 text-sm mt-1">{hotelsError}</p>}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                        <BadgePlus className="w-5 h-5" />
                        {loading ? "Agregando..." : "Agregar Habitación"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/habitaciones")}
                        className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition flex items-center justify-center gap-2"
                    >
                        <XCircle className="w-5 h-5" />
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};