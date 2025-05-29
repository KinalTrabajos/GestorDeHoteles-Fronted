import { useAddHotel, useCategoriaWiew } from "../../shared/hooks/hoteles";
import { useState } from "react";
import { Input } from "../settings/Input";
import {
  validateNotEmpty,
  validateNegativo,
  validateNotEmptyMessage,
  negativoValidationMessage,
} from "../../shared/validators";

export const AddHotelModal = ({ isOpen, onClose }) => {
  const { addhotel, isLoading } = useAddHotel();
  const { categorias, isLoading: loadingCategorias } = useCategoriaWiew()

  const [formState, setFormState] = useState({
    nameHotel: { 
      value: "", 
      isValid: false, 
      showError: false 
    },
    hotelAddresss: { 
      value: "", 
      isValid: false, 
      showError: false 
    },
    typeService: { 
      value: "", 
      isValid: false, 
      showError: false 
    },
    description: 
    { value: "", 
      isValid: false, 
      showError: false 
    },
    priceService: { 
      value: "", 
      isValid: false, 
      showError: false 
    },
    typeCategory: { 
      value: "", 
      isValid: false, 
      showError: false },
  })

  const handleInputValueChange = (value, field) => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
      },
    }))
  }

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false
    switch (field) {
      case "priceService":
        isValid = validateNegativo(value)
        break;
      default:
        isValid = validateNotEmpty(value)
        break;
    }

    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      nameHotel,
      hotelAddresss,
      typeService,
      description,
      priceService,
      typeCategory,
    } = formState;

    addhotel(
      nameHotel.value,
      hotelAddresss.value,
      typeService.value,
      description.value,
      priceService.value,
      typeCategory.value
    )
    onClose()
  }

  const isSubmitDisabled =
    isLoading ||
    !formState.nameHotel.isValid ||
    !formState.hotelAddresss.isValid ||
    !formState.typeService.isValid ||
    !formState.description.isValid ||
    !formState.priceService.isValid ||
    !formState.typeCategory.isValid;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#71C0BB] p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4">Agregar Hotel</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            field="nameHotel"
            label="Nombre del Hotel"
            value={formState.nameHotel.value}
            onChangeHandler={handleInputValueChange}
            onBlurHandler={handleInputValidationOnBlur}
            type="text"
            showErrorMessage={formState.nameHotel.showError}
            validationMessage={validateNotEmptyMessage}
          />
          <Input
            field="hotelAddresss"
            label="Dirección del Hotel"
            value={formState.hotelAddresss.value}
            onChangeHandler={handleInputValueChange}
            onBlurHandler={handleInputValidationOnBlur}
            type="text"
            showErrorMessage={formState.hotelAddresss.showError}
            validationMessage={validateNotEmptyMessage}
          />
          <Input
            field="typeService"
            label="Tipo de Servicio"
            value={formState.typeService.value}
            onChangeHandler={handleInputValueChange}
            onBlurHandler={handleInputValidationOnBlur}
            type="text"
            showErrorMessage={formState.typeService.showError}
            validationMessage={validateNotEmptyMessage}
          />
          <Input
            field="description"
            label="Descripción del Servicio"
            value={formState.description.value}
            onChangeHandler={handleInputValueChange}
            onBlurHandler={handleInputValidationOnBlur}
            type="text"
            showErrorMessage={formState.description.showError}
            validationMessage={validateNotEmptyMessage}
          />
          <Input
            field="priceService"
            label="Precio del Servicio"
            value={formState.priceService.value}
            onChangeHandler={handleInputValueChange}
            onBlurHandler={handleInputValidationOnBlur}
            type="number"
            showErrorMessage={formState.priceService.showError}
            validationMessage={negativoValidationMessage}
          />
          <div>
            <label className="block font-semibold mb-1">Categoría</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={formState.typeCategory.value}
              onChange={(e) =>
                handleInputValueChange(e.target.value, "typeCategory")
              }
              onBlur={(e) =>
                handleInputValidationOnBlur(e.target.value, "typeCategory")
              }
            >
              <option value="">Seleccionar categoría</option>
              {!loadingCategorias &&
                categorias.map((cat) => (
                  <option key={cat._id} value={cat.typeCategory}>
                    {cat.typeCategory}
                  </option>
                ))}
            </select>
            {formState.typeCategory.showError && (
              <p className="text-red-500 text-sm mt-1">
                {validateNotEmptyMessage}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4">
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
              {isLoading ? "Agregando..." : "Agregar Hotel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
