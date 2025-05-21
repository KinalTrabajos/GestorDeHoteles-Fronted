import axios from "axios";

const PEXELS_API_KEY = 'YvFAJgeMvrxqYTnNfHpILWtKYoh3kXZoPoDVN8djXIyBsw3fuNnDi16F'
const PEXELS_API_URL = 'https://api.pexels.com/v1/search'

export const fetchHotelImages = async (query = 'hotel', perPage = 10) => {
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
    console.error('Error al obtener imágenes de hoteles:', error)
    return []
  }
}


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

export const wiewCategoria = async() => {
    try {
        return await apiHotel.get('/categories/viewCategories')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

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