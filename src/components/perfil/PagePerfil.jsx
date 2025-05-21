import React from "react";
import { Navbar } from "../Navbars/Navbar"; 

const user = JSON.parse(localStorage.getItem("user"));

export const Perfil = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar /> 
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>
        <div className="bg-gray-100 shadow rounded-lg p-6 space-y-4">
          <p><strong>Nombre:</strong> {user?.name}</p>
          <p><strong>Apellido:</strong> {user?.surname}</p>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>
    </div>
  );
};
