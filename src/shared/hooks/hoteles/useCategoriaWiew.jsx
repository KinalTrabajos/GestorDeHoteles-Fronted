import { useEffect, useState } from "react";
import { wiewCategoria } from "../../../services/api";

export const useCategoriaWiew = () => {
    const [categorias, setCategorias] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchCategorias = async () => {
        setIsLoading(true);
        const response = await wiewCategoria()
        if (response.error) {
            console.error("Error al obtener categorías", response.error)
        } else {
            setCategorias(response.data.category)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchCategorias()
    }, [])

    return { categorias, isLoading }
}