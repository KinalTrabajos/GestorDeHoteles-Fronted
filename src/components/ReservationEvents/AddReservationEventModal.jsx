import { useState } from "react";
import { Input } from "../settings/Input";
import { useAddReservationEvent } from "../../shared/hooks/reservationEvent/";
import {
  validateNotEmpty,
  validateNotEmptyMessage,
} from "../../shared/validators";

export const AddReservationEventModal = ({ isOpen, onClose, eventId }) => {
  const addReservation = useAddReservationEvent();

  const [formState, setFormState] = useState({
    startDate: { value: "", isValid: false, showError: false },
    endDate: { value: "", isValid: false, showError: false },
    services: [],
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    const isValid = validateNotEmpty(value);
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { startDate, endDate, services } = formState;

    if (!eventId || !startDate.isValid || !endDate.isValid) {
      alert("Por favor llena todos los campos.");
      return;
    }

    const data = {
      startDate: startDate.value,
      endDate: endDate.value,
      selectedServicesTypes: services,
    };

    await addReservation(eventId, data);
    onClose();
  };

  const isSubmitDisabled =
    !eventId || !formState.startDate.isValid || !formState.endDate.isValid;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-[#71C0BB] p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4">
          Agregar Reservación del Evento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            field="startDate"
            label="Fecha de Inicio"
            type="datetime-local"
            value={formState.startDate.value}
            onChangeHandler={handleInputValueChange}
            onBlurHandler={handleInputValidationOnBlur}
            showErrorMessage={formState.startDate.showError}
            validationMessage={validateNotEmptyMessage}
          />

          <Input
            field="endDate"
            label="Fecha de Finalización"
            type="datetime-local"
            value={formState.endDate.value}
            onChangeHandler={handleInputValueChange}
            onBlurHandler={handleInputValidationOnBlur}
            showErrorMessage={formState.endDate.showError}
            validationMessage={validateNotEmptyMessage}
          />

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`px-4 py-2 rounded text-white ${
                isSubmitDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Reservar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
