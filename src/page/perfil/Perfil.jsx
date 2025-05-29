import { Navbar } from "../../components/Navbars/Navbar";
import { Perfil } from "../../components/perfil/PagePerfil";

export const PerfilPage = () => {
  return (
    <div>
      <Navbar/>
      <div className="mt-8">
        <Perfil />
      </div>
    </div>
  );
};
