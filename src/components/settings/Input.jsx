export const Input = ({
  field,
  label,
  value,
  onChangeHandler,
  type = "text",
  showErrorMessage,
  validationMessage,
  onBlurHandler,
  textArea = false
}) => {

  const handleValueChange = (event) => {
    onChangeHandler(event.target.value, field)
  }

  const handleInputBlur = (event) => {
    onBlurHandler(event.target.value, field)
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {textArea ? (
        <textarea
          value={value}
          onChange={handleValueChange}
          onBlur={handleInputBlur}
          rows={4}
        />
      ) : (
        <input
            type={type}
            value={value}
            onChange={handleValueChange}
            onBlur={handleInputBlur}
            className="w-full bg-slate-100 border border-gray-300 text-gray-800 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
      )}
      {showErrorMessage && (
        <p className="mt-1 text-sm text-red-500">{validationMessage}</p>
      )}
    </div>
  )
}