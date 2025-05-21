import { useEffect, useState } from "react";
import { wiewHoteles } from "../../../services/api";

export const useWiewHoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchWiewHoteles = async () => {
    setIsLoading(true)
    const response = await wiewHoteles()

    if(response.error){
        console.error("Error al obtener Hoteles",response.e)
    } else {
        setHoteles(response.data.hotels)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchWiewHoteles()
  }, [])

  return{
    hoteles,
    isLoading,
    fetchWiewHoteles
  }
}
