import { DashboardPage } from "./page/dashboard"
import { Auth } from "./page/auth"
import { RoomsPage } from "./page/room/RoomsPage"
import { AddRooms } from "./components/componentERooms/ComponentAddRooms"
import { UpdateRooms } from "./components/componentERooms/ComponentUpdateRooms"
import { DeleteRooms } from "./components/componentERooms/ComponentDeleteRooms"
import { BookingsPage } from "./page/booking/BookingsPage"
import { AddReservation } from "./components/componentBookings/ComponentAddBooking"
import { UpdateReservations } from "./components/componentBookings/ComponentUpdateBooking"
import { PageHotelFull } from "./components/Hoteles/PageHotelFull"
import { HotelRoomsList } from "./components/componentERooms/ComponentHotelRooms"
import { EventPage } from "./page/event/EventPage"
import { EventAddForm } from "./components/componentEvents/ComponentEventsAdd"
import { EventEditForm } from "./components/componentEvents/ComponentEventUpdate"
import { EventServicesEditForm } from "./components/componentEvents/ComponentServiceEventUpdate"
import { PagePrincipal } from "./page/ReservationsEvents"
import {InvoicesPage} from "./components/Invoices/InvoicesPage"
import { PerfilPage } from "./page/perfil"
import { ReportsAndStatistics } from "./page/reports"
import { ReservationViewPage } from "./page/reports"
import { StatisticsPage } from "./page/reports"
import { ReservationByIdPage } from "./page/reports";
const routes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/auth", element: <Auth/>},
  /*Rooms*/
  { path: "/habitaciones", element: <RoomsPage/>},
  { path: "/agregarHabitaciones", element: <AddRooms/>},
  { path: "/editarHabitaciones", element: <UpdateRooms/>},
  { path: "/eliminarHabitaciones", element: <DeleteRooms/>},
  { path: "/hotels/:hotelId/rooms", element: <HotelRoomsList/>},
  /*Reservas*/
  { path: "/reservas", element: <BookingsPage/>},
  { path: "/agregarReserva", element: <AddReservation/>},
  { path: "/editarReserva", element: <UpdateReservations/>},
  /*Hoteles */
  { path: "/hotel/:id", element: <PageHotelFull /> },
  /*Eventos */
  { path: "/eventos", element: <EventPage /> },
  { path: "/agregarEventos", element: <EventAddForm /> },
  { path: "/editarEventos", element: <EventEditForm /> },
  { path: "/editarServiciosDeEventos", element: <EventServicesEditForm /> },
  /*Reservaciones de Eventos*/
  { path: "/reservationPage", element: <PagePrincipal/>},
    /*Facturas*/
  { path: "/invoicesPage", element: <InvoicesPage/>},
  /*Perfil*/
  { path: "/perfil", element: <PerfilPage/>},
  /*Reportes*/
  { path: "/reportsAndStatistics", element: <ReportsAndStatistics /> },
  { path: "/reservationViewPage", element: <ReservationViewPage/>},
  { path: "/StatisticsPage", element: <StatisticsPage/>},
  { path: "/reservationById/:hotelId", element: <ReservationByIdPage /> }
]
export default routes