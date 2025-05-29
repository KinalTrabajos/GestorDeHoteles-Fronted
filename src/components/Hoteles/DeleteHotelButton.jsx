import { useState } from "react";
import { useDeletHotel } from "../../shared/hooks/hoteles";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

export const DeleteHotelButton = ({ hotelId, hotelName }) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const { deleteHotel } = useDeletHotel()

  const handleConfirm = async () => {
    const result = await deleteHotel(hotelId)
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
        Eliminar
      </button>

      <ConfirmDeleteModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        hotelName={hotelName}
        imageUrl="https://static.vecteezy.com/system/resources/previews/005/533/401/non_2x/alert-isolated-icon-which-can-easily-modify-or-edit-vector.jpg"
      />
    </>
  )
}
