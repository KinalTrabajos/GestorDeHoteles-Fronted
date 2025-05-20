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
        const response = await apiHotel.get('/viewRooms');
        return response.data; 
    } catch (e) {
        return {
            success: false,
            msg: "Error al obtener los cuartos",
            error: e.message || e
        };
    }
};