import { DashboardPage } from "./page/dashboard"
import { Auth } from "./page/auth"
import { RoomsPage } from "./page/room/RoomsPage"
import { AddRooms } from "./components/componentERooms/ComponentAddRooms"
import { UpdateRooms } from "./components/componentERooms/ComponentUpdateRooms"
import { UpdateDateRooms } from "./components/componentERooms/ComponentUpdateDateRooms"
import { DeleteRooms } from "./components/componentERooms/ComponentDeleteRooms"

const routes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/auth", element: <Auth/>},
  /*Rooms*/
  { path: "/habitaciones", element: <RoomsPage/>},
  { path: "/agregarHabitaciones", element: <AddRooms/>},
  { path: "/editarHabitaciones", element: <UpdateRooms/>},
  { path: "/eliminarHabitaciones", element: <DeleteRooms/>},
  { path: "/editarFecha", element: <UpdateDateRooms/>},
]
export default routes