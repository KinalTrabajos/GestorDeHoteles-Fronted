import { DashboardPage } from "./page/dashboard"
import { Auth } from "./page/auth"
import { PageHotelFull } from "./components/Hoteles/PageHotelFull"
import { ReportsAndStatistics } from "./page/reports"
import { ReservationViewPage } from "./page/reports"
import { StatisticsPage } from "./page/reports"
import { ReservationByIdPage } from "./page/reports";


const routes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/auth", element: <Auth/>},
  { path: "/hotel/:id", element: <PageHotelFull /> },
  { path: "/reportsAndStatistics", element: <ReportsAndStatistics /> },
  { path: "/reservationViewPage", element: <ReservationViewPage/>},
  { path: "/StatisticsPage", element: <StatisticsPage/>},
  { path: "/reservationById/:hotelId", element: <ReservationByIdPage /> },

]
export default routes