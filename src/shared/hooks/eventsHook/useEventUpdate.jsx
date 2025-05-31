import { useState } from "react";
import { updateEvent } from "../../../services";
import toast from "react-hot-toast";

export const useEventUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const editEvent = async (eventId, data, isPrivate) => {
    setLoading(true);
    setError("");

    try {
      const result = await updateEvent(eventId, data, isPrivate);

      if (!result.success) {
        const msg = result.msg || "Error al actualizar el evento";
        setError(msg);
        toast.error(msg);
      } else {
        toast.success("Evento actualizado correctamente");
      }

      return result;
    } catch (err) {
      const msg = "Error de conexión al servidor";
      setError(msg);
      toast.error(msg);
      return {
        err,
        success: false,
        msg,
      };
    } finally {
      setLoading(false);
    }
  };

  return { editEvent, loading, error };
};