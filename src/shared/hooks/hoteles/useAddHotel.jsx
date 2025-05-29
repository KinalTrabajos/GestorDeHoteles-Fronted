import { addHoteles as addHotelesRequest} from "../../../services/api";
import { useState } from "react";
import toast from "react-hot-toast";

export const useAddHotel = () => {
    const [isLoading, setIsLoading] = useState(false)
    
    const addhotel = async(nameHotel,hotelAddresss,typeService,description,priceService,typeCategory) => {
        setIsLoading(true)
        const response = await addHotelesRequest({nameHotel,hotelAddresss,typeService,description,priceService,typeCategory})
        setIsLoading(false)
        if (response.error) {
            return toast.error(response.error?.response?.data || 'ocurrio un error al agregar Hotel')
        }

        toast.success('Hote agregado Correctamente')
        window.location.reload();
    }

    return{
        addhotel,
        isLoading
    }
}