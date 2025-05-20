import { useState } from "react";
import { Input } from "./Input";
import {
     validateNotEmptyMessage,
     validateNotEmpty,
     validatePasswordMessage,
     validatePassword
} from "../../shared/validators";
import { useLogin } from "../../shared/hooks"
import { FondoLogin } from "../fondos/FondoLogin";

 
export const Login = ({ switchAuthHandler }) => {
     
    const { login, isLoading } = useLogin()

    const [formState, setFormState] = useState({
        username: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        }
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }))
    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch(field) {
            case 'username':
                isValid = validateNotEmpty(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            default:
                break;
        }
        setFormState((prevState) =>({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }));
    }

    const handleLogin = (event) => {
        event.preventDefault()
        login(formState.username.value, formState.password.value)
    }

    const isSubmitButtonDisabled = isLoading || !formState.username.isValid || !formState.password.isValid;

    return (
        <FondoLogin>    
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">Iniciar Sesión</h2>
            <form className="space-y-5">
              <Input
                field="username"
                label="Usuario"
                value={formState.username.value}
                onChangeHandler={handleInputValueChange}
                type="text"
                onBlurHandler={handleInputValidationOnBlur}
                showErrorMessage={formState.username.showError}
                validationMessage={validateNotEmptyMessage}
              />
              <Input
                field="password"
                label="Contraseña"
                value={formState.password.value}
                onChangeHandler={handleInputValueChange}
                type="password"
                onBlurHandler={handleInputValidationOnBlur}
                showErrorMessage={formState.password.showError}
                validationMessage={validatePasswordMessage}
              />
              <button
                onClick={handleLogin}
                disabled={isSubmitButtonDisabled}
                className="w-full bg-indigo-700 text-white py-2 rounded-xl hover:bg-indigo-800 transition duration-300 disabled:opacity-50"
              >
                Iniciar Sesión
              </button>
            </form>
            <p
              onClick={switchAuthHandler}
              className="mt-4 text-center text-sm text-indigo-700 hover:underline cursor-pointer"
            >
              ¿No tienes cuenta? Regístrate aquí
            </p>
          </div>
        </FondoLogin>
    )
} 