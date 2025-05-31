import { useViewReservationEvent } from "../../shared/hooks/reservationEvent";
import { ConfirmReservationButton } from "./ConfirReservacionEvent";
import { DeleteHotelButton } from "./DeleteReservationEvent";

export const ReservationEvent = () => {
  const { reservaEvento, isLoading } = useViewReservationEvent()
  
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const role = user.role

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 pt-22">
      <h1 className="text-3xl font-bold text-center text-teal-700 mb-10">
        Reservaciones de Eventos
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Cargando reservaciones...</p>
      ) : reservaEvento.length === 0 ? (
        <p className="text-center text-gray-500">No hay reservaciones disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservaEvento.map((reserva) => (
            <div
              key={reserva._id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {reserva.keeperEvent.nameEvent}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Tipo de evento:</span> {reserva.keeperEvent.typeEvent.replace("_", " ")}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Usuario:</span> {reserva.keeperUser?.username}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Fecha de inicio:</span> {new Date(reserva.datesReservation.startDate).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Fecha de fin:</span> {new Date(reserva.datesReservation.endDate).toLocaleString()}
              </p>

              <div className="bg-gray-50 p-3 rounded-md border mt-3">
                <h3 className="text-md font-semibold text-gray-700 mb-1">Servicios seleccionados:</h3>
                {reserva.selectedServices.map((servicio) => (
                  <div key={servicio._id} className="mb-2">
                    <p className="text-sm text-gray-700"><span className="font-medium">Tipo:</span> {servicio.typeService}</p>
                    <p className="text-sm text-gray-700"><span className="font-medium">Descripción:</span> {servicio.descriptionServices}</p>
                    <p className="text-sm text-gray-700"><span className="font-medium">Precio:</span> Q{servicio.priceService}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-right">
                <span className="inline-block px-3 py-1 text-sm rounded-full font-medium bg-yellow-100 text-yellow-800">
                  Estado: {reserva.stateReservation}
                </span>
              </div>

                {(role === "HOTEL_ADMIN") && (
                  <div className="mt-10">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Opciones
                      </h2>
                      <div className="flex flex-wrap gap-4">
                        <ConfirmReservationButton
                          _id={reserva._id}
                          nameEvent={reserva.keeperEvent.nameEvent}
                        />
                        <DeleteHotelButton
                          _id={reserva._id}
                          nameEvent={reserva.keeperEvent.nameEvent}
                        />
                      </div>
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
