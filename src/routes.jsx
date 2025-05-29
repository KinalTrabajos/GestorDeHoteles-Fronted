import { DashboardPage } from "./page/dashboard"
import { Auth } from "./page/auth"
import { RoomsPage } from "./page/room/RoomsPage"
import { AddRooms } from "./components/componentERooms/ComponentAddRooms"
import { UpdateRooms } from "./components/componentERooms/ComponentUpdateRooms"
import { DeleteRooms } from "./components/componentERooms/ComponentDeleteRooms"
import { BookingsPage } from "./page/booking/BookingsPage"
import { AddReservation } from "./components/componentBookings/ComponentAddBooking"
import { UpdateReservations } from "./components/componentBookings/ComponentUpdateBooking"

const routes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/auth", element: <Auth/>},
  /*Rooms*/
  { path: "/habitaciones", element: <RoomsPage/>},
  { path: "/agregarHabitaciones", element: <AddRooms/>},
  { path: "/editarHabitaciones", element: <UpdateRooms/>},
  { path: "/eliminarHabitaciones", element: <DeleteRooms/>},
  /*Reservas*/
  { path: "/reservas", element: <BookingsPage/>},
  { path: "/agregarReserva", element: <AddReservation/>},
  { path: "/editarReserva", element: <UpdateReservations/>},
]
export default routes