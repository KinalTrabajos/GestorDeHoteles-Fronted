export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textArea
}) => {

    const handleValueChange = (event) => {
        onChangeHandler(event.target.value, field);
    }

    const handleInputBlur = (event) => {
        onBlurHandler(event.target.value, field);
    }

    return (
        <>
            <div className="auth-form-label">
                <span>{label}</span>
            </div>
            <div>
                {textArea ? (
                    <textArea
                        type={type}
                        value={value}
                        onChange={handleValueChange}
                        onBlur={handleInputBlur}
                        row={5}
                        style={{ maxWidth: "400px" }}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={handleValueChange}
                        onBlur={handleInputBlur}
                        className="w-full bg-[#FFE1E0] border border-gray-300 text-gray-800 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"

                    />
                )}
                <span className="auth-form-validation-message">
                    {showErrorMessage && validationMessage}
                </span>
            </div>
        </>
    )
}