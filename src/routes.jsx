import { DashboardPage } from "./page/dashboard"
import { Auth } from "./page/auth"
import { PerfilPage } from "./page/perfil"


const routes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/auth", element: <Auth/>},
  { path: "/perfil", element: <PerfilPage/>}
]
export default routes