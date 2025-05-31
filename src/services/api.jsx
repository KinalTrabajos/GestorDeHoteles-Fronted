import axios from "axios";

const PEXELS_API_KEY =
    "YvFAJgeMvrxqYTnNfHpILWtKYoh3kXZoPoDVN8djXIyBsw3fuNnDi16F";
const PEXELS_API_URL = "https://api.pexels.com/v1/search";

export const fetchHotelImages = async (query = "hotel", perPage = 10) => {
    try {
        const response = await axios.get(PEXELS_API_URL, {
            headers: {
                Authorization: PEXELS_API_KEY,
            },
            params: {
                query,
                per_page: perPage,
            },
        });
        return response.data.photos;
    } catch (error) {
        console.error("Error al obtener imágenes de hoteles:", error);
        return [];
    }
};

const apiHotel = axios.create({
    baseURL: "http://localhost:3001/gestorHoteles/v1",
    timeout: 5000,
    headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
});

apiHotel.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem("user");
        if (user) {
            const token = JSON.parse(user).token;
            config.headers["x-token"] = token;
        }
        return config;
    },
    (e) => Promise.reject(e)
);

export const login = async (data) => {
    try {
        return await apiHotel.post("/auth/login", data);
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const register = async (data) => {
    try {
        return await apiHotel.post("/auth/register", data);
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const getRooms = async () => {
    try {
        const response = await apiHotel.get("/rooms/viewRooms");
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: "Error al obtener los cuartos",
            error: e.message || e,
        };
    }
};

export const getRoomsByHotel = async (hotelId) => {
    try {
        const response = await apiHotel.get(`/rooms/getRoomsByHotel/${hotelId}`);
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: "Error al obtener los cuartos de este hotel",
            error: e.message || e,
        };
    }
};

export const addRoom = async (data) => {
    try {
        const response = await apiHotel.post("/rooms/addRoom", data);
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: e.response?.data?.msg || "Error al crear habitación",
            error: e.message,
        };
    }
};

export const updateRoom = async (id, data) => {
    try {
        const response = await apiHotel.put(`/rooms/updateRoom/${id}`, data);
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: e.response?.data?.msg || "Error al actualizar habitación",
            error: e.message,
        };
    }
};

export const deleteRoom = async (id) => {
    try {
        const response = await apiHotel.delete(`/rooms/deleteRoom/${id}`, {
            data: { confirm: true },
        });
        return response.data;
    } catch (e) {
        console.log("Error al eliminar habitación:", e.response?.data);
        return {
            success: false,
            msg: e.response?.data?.msg || "Error al eliminar habitación",
            error: e.message,
        };
    }
};

export const wiewCategoria = async () => {
    try {
        return await apiHotel.get("/categories/viewCategories");
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const wiewHoteles = async () => {
    try {
        return await apiHotel.get("/hotels/viewHotels");
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const addHoteles = async (data) => {
    try {
        return await apiHotel.post("/hotels/addHotel", data);
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const delethoteles = async (id) => {
    try {
        return await apiHotel.delete(`/hotels/deleteHotel/${id}?confirm=true`);
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const updateHoteles = async (id, data) => {
    try {
        return await apiHotel.put(`/hotels/updateHotel/${id}`, data);
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const getBookings = async () => {
    try {
        const response = await apiHotel.get('/reservations/viewReservations');
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: "Error al obtener las reservaciones",
            error: e.message || e
        };
    }
};

export const getBookingsByHotel = async (idHotel) => {
    try {
        const response = await apiHotel.get(
            `/reservations/viewReservationsByHotel/${idHotel}`
        );
        return response.data;
    } catch (e) {
        return {
            success: true,
            msg: "Error al obtener las reservaciones de este hotel",
            error: e.message || e,
        };
    }
};

export const confirmBooking = async (id) => {
    try {
        const response = await apiHotel.put(
            `/reservations/confirmReservation/${id}`,
            { ConfirmReservation: true }
        );
        return response.data;
    } catch (e) {
        return {
            success: true,
            msg: "Error al confirmar la reserva",
            error: e.message || e,
        };
    }
};

export const cancelBooking = async (id) => {
    try {
        const response = await apiHotel.delete(
            `/reservations/cancelReservation/${id}`,
            {
                data: { confirm: true },
            }
        );
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: "Error al cancelar la reserva",
            error: e.response?.data?.msg || e.message || e,
        };
    }
};

export const addReservation = async (roomId, data) => {
    try {
        const response = await apiHotel.post(
            `/reservations/addReservation/${roomId}`,
            data
        );
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: "Error al crear la reserva",
            error: e.response?.data?.msg || e.message || e,
        };
    }
};

export const updateReservation = async (id, data) => {
    try {
        const response = await apiHotel.put(
            `/reservations/updateReservation/${id}`,
            data
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            msg: "Error al actualizar la reserva",
            error: error.message || error,
        };
    }
};

export const getEvents = async () => {
    try {
        const response = await apiHotel.get("/events/viewEvents");
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: "Error al obtener los eventos",
            error: e.message || e,
        };
    }
};

// Agregar evento general
export const addEventGeneral = async (data) => {
    try {
        const response = await apiHotel.post("/events/addEventGeneral", data);
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: "Error al crear el evento general",
            error: e.response?.data?.msg || e.message || e,
        };
    }
};

// Agregar evento privado
export const addEventPrivate = async (data) => {
    try {
        const response = await apiHotel.post("/events/addEventPrivate", data);
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: "Error al crear el evento privado",
            error: e.response?.data?.msg || e.message || e,
        };
    }
};

export const updateEvent = async (id, data, isPrivate) => {
    try {
        const endpoint = isPrivate
            ? `/events/updateEventPrivate/${id}`
            : `/events/updateEventGeneral/${id}`;

        const response = await apiHotel.put(endpoint, data);
        return response.data;
    } catch (error) {
        return {
            success: false,
            msg: "Error al actualizar el evento",
            error: error.message || error,
        };
    }
};

export const updateServicesEvent = async (id, data) => {
    try {
        const response = await apiHotel.put(
            `/events/updateServicesEvent/${id}`,
            data
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            msg: "Error al actualizar los servicios del evento",
            error: error.message || error,
        };
    }
};

export const deleteEvent = async (id) => {
    try {
        const response = await apiHotel.delete(`/events/deleteEvent/${id}`);
        return response.data;
    } catch (error) {
        return {
            success: false,
            msg: "Error al eliminar el evento",
            error: error.response?.data?.msg || error.message || error,
        };
    }
};

export const viewReservationEvento = async () => {
    try {
        return await apiHotel.get(`/reservations/viewReservationsEvent`);
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const addReservationEvento = async (id, data) => {
    try {
        return await apiHotel.post(`/reservations/addReservationEvent/${id}`, data);
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const cancelarReservationEvent = async (id) => {
    try {
        const response = await apiHotel.delete(
            `/reservations/cancelEventReservation/${id}`,
            {
                data: { confirm: true },
            }
        );
        return response.data;
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const confirmReservationEvent = async (id) => {
    try {
        const response = await apiHotel.put(
            `/reservations/confirmReservationEvent/${id}`,
            {
                ConfirmReservation: true,
            }
        );
        return response.data;
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const viewHistorialinvoices = async () => {
    try {
        return await apiHotel.get(`/invoices/viewInvoices`);
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const viewUsers = async () => {
    try {
        return await apiHotel.get("/users/usersView");
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const updateUser = async (data) => {
    try {
        return await apiHotel.put(`/users/updateUser`, data);
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const passwordUpdate = async (data) => {
    try {
        return await apiHotel.put("/users/passwordUpdate", data);
    } catch (e) {
        const msg = e.response?.data?.msg || "Unknow error";
        return {
            error: true,
            msg,
            e,
        };
    }
};

export const deleteUser = async (id, data) => {
    try {
        return await apiHotel.delete(`/users/userDelete/${id}`, { data });
    } catch (e) {
        const msg = e.response?.data?.msg || "Unknow error";
        return {
            error: true,
            msg,
            e,
        };
    }
};

export const viewReservations = async () => {
    try {
        const response = await apiHotel.get("/reservations/viewReservations");
        return response.data;
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const getMostRequestedHotels = async () => {
    try {
        const response = await apiHotel.get("/statistics/mostRequestedHotels");
        return response.data;
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const getMonthlyOccupancy = async () => {
    try {
        const response = await apiHotel.get("/statistics/monthlyOccupancy");
        return response.data;
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const getReservationsByHotel = async (hotelId) => {
    try {
        const response = await apiHotel.get(
            `/reservations/viewReservationsByHotel/${hotelId}`
        );
        return response.data.reservations;
    } catch (e) {
        console.error("Error al obtener reservas por hotel:", e);
        return {
            error: true,
            e,
        };
    }
};
