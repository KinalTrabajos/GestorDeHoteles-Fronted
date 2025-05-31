import { useEffect, useState } from "react";
import { viewHistorialinvoices } from "../../../services/api";

export const useWiewInvoice = () => {
  const [invoice, setInvoice] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchInvoice = async () => {
    setIsLoading(true)
    const response = await viewHistorialinvoices()

    if (response.error) {
      console.error("Error al obtener las Facturas")
    } else {
      setInvoice(response.data.invoices)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchInvoice()
  }, [])

  return { invoice, isLoading }
}