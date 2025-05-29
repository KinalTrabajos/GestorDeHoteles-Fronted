import { useParams } from "react-router-dom"
import { useWiewHoteles, useCategoriaWiew, useUpdateHotel } from "../../shared/hooks/hoteles"
import { useEffect, useState } from "react"
import { Input } from "../settings/Input"
import {
  validateNotEmpty,
  validateNegativo,
  validateNotEmptyMessage,
} from "../../shared/validators"

export const UpdateHotelModal = ({ isOpen, onClose }) => {
  const { id } = useParams()
  const { hoteles } = useWiewHoteles()
  const { categorias, isLoading: loadingCategorias } = useCategoriaWiew()
  const updateHotel = useUpdateHotel()

  const hotel = hoteles.find(h => h._id === id)

  const [formState, setFormState] = useState({
    nameHotel: { value: "", isValid: false, showError: false },
    hotelAddresss: { value: "", isValid: false, showError: false },
    typeCategory: { value: "", isValid: false, showError: false },
  })

  useEffect(() => {
    if (hotel) {
      setFormState({
        nameHotel: { value: hotel.nameHotel || "", isValid: true, showError: false },
        hotelAddresss: { value: hotel.hotelAddresss || "", isValid: true, showError: false },
        typeCategory: { value: hotel.keeperCategory?.typeCategory || "", isValid: true, showError: false },
      })
    }
  }, [hotel])

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
    if (field === "priceService") {
      isValid = validateNegativo(value)
    } else {
      isValid = validateNotEmpty(value)
    }

    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        isValid,
        showError: !isValid,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      nameHotel: formState.nameHotel.value,
      hotelAddresss: formState.hotelAddresss.value,
      typeCategory: formState.typeCategory.value,
    }

    await updateHotel(id, data)
    onClose()
  }

  const isSubmitDisabled = !Object.values(formState).every(f => f.isValid)

  if (!isOpen || !hotel) return null

  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4">Editar Hotel</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input field="nameHotel" label="Nombre del Hotel"
            value={formState.nameHotel.value}
            onChangeHandler={handleInputValueChange}
            onBlurHandler={handleInputValidationOnBlur}
            type="text"
            showErrorMessage={formState.nameHotel.showError}
            validationMessage={validateNotEmptyMessage}
          />
          <Input field="hotelAddresss" label="Dirección del Hotel"
            value={formState.hotelAddresss.value}
            onChangeHandler={handleInputValueChange}
            onBlurHandler={handleInputValidationOnBlur}
            type="text"
            showErrorMessage={formState.hotelAddresss.showError}
            validationMessage={validateNotEmptyMessage}
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
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Actualizar Hotel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
