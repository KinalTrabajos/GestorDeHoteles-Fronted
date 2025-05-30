import { useState } from "react";
import { ConfirmDeleteModalReservas } from "./ConfirmDeleteModal";
import { useDeletReservastionEvent } from "../../shared/hooks/reservationEvent";

export const DeleteHotelButton = ({ _id, nameEvent }) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const { deletReservationEvent } = useDeletReservastionEvent()

  const handleConfirm = async () => {
    const result = await deletReservationEvent(_id)
    if (!result.error) {
      setShowConfirm(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="bg-red-600 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-red-700 transition-all duration-200"
      >
        Cancelar Reserva
      </button>

      <ConfirmDeleteModalReservas
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        nameEvent={nameEvent}
        imageUrl="https://static.vecteezy.com/system/resources/previews/005/533/401/non_2x/alert-isolated-icon-which-can-easily-modify-or-edit-vector.jpg"
      />
    </>
  )
}
