import React, { useState, useEffect } from "react";
import { Navbar } from "../Navbars/Navbar";
import { useUseView } from "../../shared/hooks/users/useUseView";
import { Toaster, toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));
const role = user?.role;

export const Perfil = () => {
  const { users, getUsers, updateUser, passwordUpdate, deleteUser, isFetching } = useUseView();
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [yaCargado, setYaCargado] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    surname: user?.surname || "",
    username: user?.username || ""
  });

  const [dataPassword, setDataPassword] = useState({
    passwordOld: "",
    passwordNew: ""
  });

  const toggleUsuarios = () => {
    if (!yaCargado) {
      getUsers();
      setYaCargado(true);
    }
    setMostrarUsuarios((prev) => !prev);
  };

  const toggleFormulario = () => {
    setMostrarFormulario((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setDataPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
      toast.success("Datos actualizados correctamente");
      location.reload();
    } catch (error) {
      toast.error("Error al actualizar datos");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await passwordUpdate(dataPassword);
      setDataPassword({ oldPassword: "", newPassword: "" });
      toast.success("Contraseña actualizada correctamente");
    } catch (error) {
      toast.error("Error al actualizar la contraseña");
      setDataPassword({ oldPassword: "", newPassword: "" });
    }
  };

  const handleDeleteUser = async () => {
    if (!confirmPassword) {
      toast.error("Por favor, introduce tu contraseña para confirmar");
      return;
    }

    try {
      const wasDeleted = await deleteUser(user?._id, {
        confirmDeletion: true,
        password: confirmPassword
      });
      if (!wasDeleted) {
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error al eliminar la cuenta");
    }
  };


  return (
    <div className="bg-white min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>
        <div className="bg-gray-100 shadow rounded-lg p-6 space-y-4">
          <p><strong>Nombre:</strong> {user?.name}</p>
          <p><strong>Apellido:</strong> {user?.surname}</p>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>

          <div className="mt-6 flex justify-between items-center flex-wrap gap-2">
            {role === "HOTEL_ADMIN" && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded transition-all duration-300"
                onClick={toggleUsuarios}
              >
                {mostrarUsuarios ? "Ocultar usuarios" : "Ver todos los usuarios"}
              </button>
            )}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded transition-all duration-300 ml-auto"
              onClick={toggleFormulario}
            >
              {mostrarFormulario ? "Cancelar edición" : "Editar información"}
            </button>
          </div>

          <div className={`transition-all duration-500 overflow-hidden ${mostrarFormulario ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
            <form className="mt-4 space-y-4" onSubmit={handleUpdate}>
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Apellido</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Guardar cambios
              </button>
            </form>

            <form className="mt-6 space-y-4" onSubmit={handleUpdatePassword}>
              <h2 className="text-xl font-semibold">Actualizar contraseña</h2>
              <div>
                <label className="block text-sm font-medium">Contraseña actual</label>
                <input
                  type="password"
                  name="passwordOld"
                  value={dataPassword.passwordOld}
                  onChange={handleChangePassword}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Nueva contraseña</label>
                <input
                  type="password"
                  name="passwordNew"
                  value={dataPassword.passwordNew}
                  onChange={handleChangePassword}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Cambiar contraseña
              </button>
            </form>

            <div className="mt-6 space-y-2">
              <h2 className="text-xl font-semibold text-red-600">Eliminar cuenta</h2>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <FaTrash />
                Eliminar cuenta
              </button>
            </div>

            {isDeleteModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                  <h2 className="text-lg font-bold mb-4 text-red-600">¿Estás seguro?</h2>
                  <p className="mb-4">Esta acción no se puede deshacer. ¿Deseas eliminar tu cuenta?</p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteUser();
                        setIsDeleteModalOpen(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {role === "HOTEL_ADMIN" && (
            <div className={`transition-all duration-500 overflow-hidden ${mostrarUsuarios ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
              {isFetching ? (
                <p>Cargando...</p>
              ) : (
                <ul className="mt-2 list-disc pl-5">
                  {users.map((user) => (
                    <li key={user._id}>
                      {user.name + " " + user.surname}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
