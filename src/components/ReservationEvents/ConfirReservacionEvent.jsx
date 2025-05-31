import { useState } from "react";
import { useConfirReservacionEvent } from "../../shared/hooks/reservationEvent";
import { ConfirmReservacionEventModal } from "./ConfirmReservacionEventModal";

export const ConfirmReservationButton = ({ _id, nameEvent }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { confirReservationEvent } = useConfirReservacionEvent();

  const handleConfirm = async () => {
    const result = await confirReservationEvent(_id);
    if (!result.error) {
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-green-600 transition-all duration-200"
      >
        Confirmar Reservas
      </button>

      <ConfirmReservacionEventModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        nameEvent={nameEvent}
        imageUrl="https://cdn-icons-png.flaticon.com/512/190/190411.png"
      />
    </>
  );
};
