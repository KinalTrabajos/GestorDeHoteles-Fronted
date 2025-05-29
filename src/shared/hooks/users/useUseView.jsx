import {
    viewUsers as viewUsersRequest,
    updateUser as updateUserRequest,
    passwordUpdate as passwordUpdateRequest,
    deleteUser as deleteUserRequest
} from "../../../services/api";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUseView = () => {
    const [users, setUsers] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const navigate = useNavigate();

    const getUsers = async () => {
        setIsFetching(true);

        const usersData = await viewUsersRequest();

        setIsFetching(false);

        if (usersData?.error) {
            toast.error(usersData.e?.response?.data || 'Error to get users')
            return;
        }

        const usersDataMsg = usersData?.data?.users;

        setUsers(usersDataMsg)
    }

    useEffect(() => {
        getUsers();
    }, [])

    const updateUser = async (userEdit) => {
        const result = await updateUserRequest(userEdit);

        if (result?.error) {
            return toast.error(result.e?.response?.data || 'No se pudo actualizar el usuario')
        }

        toast.success('Usuario actualizado con exito!');

        await getUsers();
    }

    const passwordUpdate = async (newPassword) => {
        const result = await passwordUpdateRequest(newPassword);

        if (result?.error) {
            return toast.error(result?.msg || 'No se pudo actualizar la contraseña')
        }

        toast.success('Contraseña actualizada con exito!');

        await getUsers();
    }

    const deleteUser = async (id, dataConfirm) => {


        const result = await deleteUserRequest(id, dataConfirm);

        if (result?.error) {
            return toast.error(result?.msg || 'No se pudo eliminar el usuario!')
        }

        toast.success('Usuario eliminado con exito!')

        await getUsers();
    }

    return {
        users,
        getUsers,
        updateUser,
        passwordUpdate,
        deleteUser,
        isFetching
    }
}