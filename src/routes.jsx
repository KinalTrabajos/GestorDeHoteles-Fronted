import { DashboardPage } from "./page/dashboard"
import { Auth } from "./page/auth"
import { HotelPage } from "./page/hotel"
import { ReservationViewPage } from "./page/reports"


const routes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/auth", element: <Auth/>},
  { path: "/hotelPage", element: <HotelPage/>},
  { path: "/reservationViewPage", element: <ReservationViewPage/>}
]
export default routes