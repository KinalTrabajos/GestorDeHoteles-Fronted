import { useState, useEffect } from "react";
import { Input } from "../settings/Input";
import { useAddReservationEvent } from "../../shared/hooks/reservationEvent/";
import { useEventsView } from "../../shared/hooks/eventsHook/useEventView"; // Importamos el hook que obtiene los eventos
import {
  validateNotEmpty,
  validateNotEmptyMessage,
} from "../../shared/validators";

export const AddReservationEventModal = ({ isOpen, onClose, eventId }) => {
  const { events, loading, error } = useEventsView(); // Usamos el hook para obtener los eventos
  const addReservation = useAddReservationEvent();

  const [formState, setFormState] = useState({
    startDate: { value: "", isValid: false, showError: false },
    endDate: { value: "", isValid: false, showError: false },
    services: [], // Servicios seleccionados
  });

  // Filtrar el evento seleccionado
  const selectedEvent = events?.find((event) => event._id === eventId);
  const availableServices = selectedEvent?.additionalServices || []; // Servicios adicionales del evento

  // Handle input value change
  const handleInputValueChange = (value, field) => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
      },
    }));
  };

  // Handle input validation on blur
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

  // Handle checkbox change for services
  const handleServiceChange = (e) => {
    const service = e.target.value;
    setFormState((prev) => {
      const services = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  // Handle form submission
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
      selectedServicesTypes: services, // Servicios seleccionados
    };

    await addReservation(eventId, data);
    onClose();
  };

  // Disable submit button if fields are not valid
  const isSubmitDisabled =
    !eventId || !formState.startDate.isValid || !formState.endDate.isValid;

  if (!isOpen) return null;

  // Manejar estados de carga y error
  if (loading) return <div>Cargando eventos...</div>;
  if (error) return <div>Error al cargar los eventos</div>;

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

          {/* Sección de servicios con checkboxes */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Servicios Adicionales
            </label>
            <div className="space-y-2">
              {availableServices.length > 0 ? (
                availableServices.map((service) => (
                  <div key={service._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={service._id}
                      value={service.typeService}
                      onChange={handleServiceChange}
                      checked={formState.services.includes(service.typeService)}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                    />
                    <label
                      htmlFor={service._id}
                      className="text-sm font-medium text-gray-700"
                    >
                      {service.typeService} - {service.descriptionServices}
                    </label>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No hay servicios disponibles</div>
              )}
            </div>
          </div>

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
}