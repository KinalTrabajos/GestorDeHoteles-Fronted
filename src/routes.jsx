import { DashboardPage } from "./page/dashboard"
import { Auth } from "./page/auth"
import { PrivateRoute } from "./components/PrivateRoute"


const routes = [
  { path: "/", element: <Auth /> },
  { path: "/dashboardPage", element: <PrivateRoute><DashboardPage /></PrivateRoute> },
]
export default routes