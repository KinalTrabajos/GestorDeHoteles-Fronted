import { DashboardPage } from "./page/dashboard"
import { Auth } from "./page/auth"
import { PageHotelFull } from "./components/Hoteles/PageHotelFull"
import { PerfilPage } from "./page/perfil"



const routes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/auth", element: <Auth/>},
  { path: "/hotel/:id", element: <PageHotelFull /> },
  { path: "/perfil", element: <PerfilPage/>}
]
export default routes