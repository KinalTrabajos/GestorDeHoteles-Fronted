export const ConfirmReservacionEventModal = ({ isOpen, onClose, onConfirm, nameEvent, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center space-y-4">
        <img src={imageUrl} alt="Confirmación" className="w-32 h-32 object-cover mx-auto rounded" />
        <h2 className="text-xl font-semibold text-gray-800">
          ¿Está seguro de que desea Confirmar la Reservacion <span className="text-green-600">"{nameEvent}"</span>?
        </h2>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-gren-700">
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}