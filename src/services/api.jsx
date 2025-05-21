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

export const register = async(data) =>{
    try {
        return await apiHotel.post('/auth/register', data);
    } catch (e) {
        return{
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

export const updateDateAvailableRoom = async (id, data) => {
  try {
    const response = await apiHotel.put(`/rooms/updateDateAvailableRoom/${id}`, data);
    return response.data;
  } catch (e) {
    return {
      success: false,
      msg: e.response?.data?.msg || "Error al actualizar fecha disponible",
      error: e.message
    };
  }
};


export const deleteRoom = async (id) => {
    try {
        const response = await apiHotel.delete(`/rooms/deleteRoom/${id}`);
        return response.data;
    } catch (e) {
        return {
            success: false,
            msg: e.response?.data?.msg || "Error al eliminar habitación",
            error: e.message
        };
    }
};

export const wiewHoteles = async() =>{
    try {
        return await apiHotel.get('/hotels/viewHotels')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}