import { DashboardPage } from "./page/dashboard"
import { Auth } from "./page/auth"
import { HotelPage } from "./page/hotel"



const routes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/auth", element: <Auth/>},
  { path: "/hotelPage", element: <HotelPage/>}
]
export default routes