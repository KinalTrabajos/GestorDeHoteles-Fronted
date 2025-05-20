import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services"
import toast from "react-hot-toast";

export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const login = async (username, password) => {

        setIsLoading(true)

        const response = await loginRequest({username,password})

        setIsLoading(false)

        if(response.error){
            return toast.error(response?.error?.response?.data?.message || 'Ocurrió un error al iniciar sesión')
        }

        const { userDetails } = response.data

        localStorage.setItem('user', JSON.stringify(userDetails));

        toast.success("Seción iniciada correctamente")

        navigate('/')
    }
    return {
        login,
        isLoading
    }
}