import { DashboardPage } from "./page/dashboard"
import { Auth } from "./page/auth"


const routes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/auth", element: <Auth/>},
]
export default routes