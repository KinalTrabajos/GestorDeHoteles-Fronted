import axios from "axios";

const apiHotel = axios.create({
    baseURL: "http://localhost:3001/gestorHoteles/v1",
    timeout: 5000,
    headers: { "Cache-Control": "no-cache, no-store, must-revalidate" }
});

apiHotel.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user')
        if (user) {
            const token = JSON.parse(user).token
            config.headers['x-token'] = token
        }
        return config
    },
    (e) => Promise.reject(e)
)

export const login = async (data) => {
    try {
        return await apiHotel.post('/auth/login', data);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const register = async (data) => {
    try {
        return await apiHotel.post('/auth/register', data);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getRooms = async () => {
    try {
        const response = await apiHotel.get('/rooms/viewRooms');
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: "Error al obtener los cuartos",
            error: e.message || e
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
            error: e.message
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
            error: e.message
        };
    }
};

export const deleteRoom = async (id) => {
    try {
        const response = await apiHotel.delete(`/rooms/deleteRoom/${id}`, {
            data: { confirm: true } // Aquí envías el body
        });
        return response.data;
    } catch (e) {
        console.log("Error al eliminar habitación:", e.response?.data);
        return {
            success: false,
            msg: e.response?.data?.msg || "Error al eliminar habitación",
            error: e.message
        };
    }
};

export const wiewHoteles = async () => {
    try {
        return await apiHotel.get('/hotels/viewHotels')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

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
        const response = await apiHotel.get(`/reservations/viewReservationsByHotel/${idHotel}`);
        return response.data;
    } catch (e) {
        return {
            success: true,
            msg: "Error al obtener las reservaciones de este hotel",
            error: e.message || e
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
            error: e.message || e
        };
    }
};

export const cancelBooking = async (id) => {
    try {
        const response = await apiHotel.delete(`/reservations/cancelReservation/${id}`, {
            data: { confirm: true }
        });
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: "Error al cancelar la reserva",
            error: e.response?.data?.msg || e.message || e
        };
    }
};

export const addReservation = async (roomId, data) => {
    try {
        const response = await apiHotel.post(`/reservations/addReservation/${roomId}`, data);
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: "Error al crear la reserva",
            error: e.response?.data?.msg || e.message || e
        };
    }
};

export const updateReservation = async (id, data) => {
    try {
        const response = await apiHotel.put(`/reservations/updateReservation/${id}`, data);
        return response.data;
    } catch (error) {
        return {
            success: false,
            msg: "Error al actualizar la reserva",
            error: error.message || error
        };
    }
};
