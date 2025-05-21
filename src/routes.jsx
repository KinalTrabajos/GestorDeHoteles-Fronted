import { DashboardPage } from "./page/dashboard"
import { Auth } from "./page/auth"
import { PageHotelFull } from "./components/Hoteles/PageHotelFull"



const routes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/auth", element: <Auth/>},
  { path: "/hotel/:id", element: <PageHotelFull /> }
]
export default routes