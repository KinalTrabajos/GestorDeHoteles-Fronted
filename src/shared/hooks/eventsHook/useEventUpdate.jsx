import { useState } from "react";
import { updateEvent } from "../../../services";

export const useEventUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const editEvent = async (eventId, data, isPrivate) => {
    setLoading(true);
    setError("");
    const result = await updateEvent(eventId, data, isPrivate);
    setLoading(false);

    if (!result.success) {
      setError(result.msg);
    }

    return result;
  };

  return { editEvent, loading, error };
};
