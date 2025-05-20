import { useState } from "react";
import {Input} from "./Input";
import {
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateUsernameMessage,
    emailValidationMessage,
    validatePasswordMessage,
    passwordConfirmationMessage
} from '../../shared/validators'
import { useRegister } from "../../shared/hooks"
import { FondoRegister } from "../fondos/FondoRegister";


export const Register = ({switchAuthHandler}) =>{
    const {register, isLoading} = useRegister()

    const [formState, setFormState] = useState({
        name:{
            value: '',
            isValid: false,
            showError: false
        },
        surname:{
            value: '',
            isValid: false,
            showError: false
        },
        username:{
            value: '',
            isValid: false,
            showError: false
        },
        email:{
            value: '',
            isValid: false,
            showError: false
        },
        password:{
            value:'',
            isValid: false,
            showError: false
        },
        passwordConfir: {
            value: '',
            isValid: false,
            showError: false
        }

    });

    const handleInputValueChange = (value,field) =>{
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }))
    }

    const handleInputValidationOnBlur = (value,field) => {
        let isValid = false;
        switch (field) {
            case 'name':
                isValid = validateUsername(value);
                break;
            case 'surname':
                isValid = validateUsername(value);
                break;
            case 'username':
                isValid = validateUsername(value);
                break;
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            case 'passwordConfir':
                isValid = validateConfirmPassword(formState.password.value,value);
                break;
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }));   
    }


    const handleRegister = (event) => {
        event.preventDefault()
        register(formState.name.value, formState.surname.value, formState.username.value, formState.email.value, formState.password.value)
    }

    const isSubmitButtonDisabled = isLoading || 
        !formState.name.isValid ||
        !formState.surname.isValid ||
        !formState.username.isValid ||
        !formState.email.isValid ||
        !formState.password.isValid ||
        !formState.passwordConfir.isValid;
    return (
      <FondoRegister>
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">Crear Cuenta</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
                    field='name'
                    label='Name'
                    value={formState.name.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.name.showError}
                    validationMessage={validateUsernameMessage}
                />
                <Input
                    field='surname'
                    label='Surname'
                    value={formState.surname.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.surname.showError}
                    validationMessage={validateUsernameMessage}
                />
                <Input
                    field='username'
                    label='Username'
                    value={formState.username.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.username.showError}
                    validationMessage={validateUsernameMessage}
                />
                <Input
                    field='email'
                    label='Email'
                    value={formState.email.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.email.showError}
                    validationMessage={emailValidationMessage}
                />
                <Input
                    field='password'
                    label='Password'
                    value={formState.password.value}
                    onChangeHandler={handleInputValueChange}
                    type='password'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.password.showError}
                    validationMessage={validatePasswordMessage}
                />
                <Input
                    field='passwordConfir'
                    label='Password Confirmation'
                    value={formState.passwordConfir.value}
                    onChangeHandler={handleInputValueChange}
                    type='password'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.passwordConfir.showError}
                    validationMessage={passwordConfirmationMessage}
                />
          </form>
          <button
            onClick={handleRegister}
            disabled={isSubmitButtonDisabled}
            className="mt-6 w-full bg-indigo-700 text-white py-2 rounded-xl hover:bg-indigo-800 transition duration-300 disabled:opacity-50"
          >
            Registrarse
          </button>
          <p
            onClick={switchAuthHandler}
            className="mt-4 text-center text-sm text-indigo-700 hover:underline cursor-pointer"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </p>
        </div>
      </FondoRegister>
    )

}
