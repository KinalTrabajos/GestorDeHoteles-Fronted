import { useEffect, useState } from "react";
import { viewReservationEvento } from "../../../services/api";

export const useViewReservationEvent = () => {
    const [reservaEvento, setreservaEvento] = useState([])
    const [isLoading,setIsLoading] =  useState(true)

    const fetchViewReservationEvent = async () => {
        setIsLoading(true)
        const response = await viewReservationEvento()

        if(response.error){
            console.error("Error al obtener el Evento", response.e)
        } else {
            setreservaEvento(response.data.reservations)
        }

        setIsLoading(false)
    }

    useEffect(()=> {
        fetchViewReservationEvent()
    },[])

    return{
        reservaEvento,
        isLoading
    }
}