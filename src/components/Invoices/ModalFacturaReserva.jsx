import { useEffect, useState } from "react";
import { useWiewInvoice } from "../../shared/hooks/invoice/useWiewInvoice";

export const ModalFacturaReserva = ({ idReservation, onClose }) => {
  const { invoice, isLoading } = useWiewInvoice();
  const [factura, setFactura] = useState(null);

  useEffect(() => {
    if (invoice && idReservation) {
      const encontrada = invoice.find(
        (fact) => fact.reservationPrivate?._id === idReservation
      );
      setFactura(encontrada);
    }
  }, [invoice, idReservation]);

  if (!idReservation) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">
          Factura de Reservación
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-500 text-lg">
            Cargando factura...
          </p>
        ) : !factura ? (
          <p className="text-center text-gray-500 text-lg">
            No se encontró la factura para esta reservación.
          </p>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {factura?.reservationPrivate?.keeperEvent?.nameEvent ||
                "Sin nombre de evento"}
            </h2>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Tipo:</span>{" "}
              {factura?.reservationPrivate?.keeperEvent?.typeEvent
                ? factura.reservationPrivate.keeperEvent.typeEvent.replace(
                    "_",
                    " "
                  )
                : "Sin tipo"}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Fecha inicio:</span>{" "}
              {new Date(
                factura.reservationPrivate.datesReservation.startDate
              ).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Fecha fin:</span>{" "}
              {new Date(
                factura.reservationPrivate.datesReservation.endDate
              ).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Total pagado:</span> Q
              {factura.reservationPrivate.totalCost}
            </p>

            <div className="bg-gray-50 mt-4 p-3 rounded-md border">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Servicios:
              </h3>
              {factura.reservationPrivate.selectedServices?.length > 0 ? (
                factura.reservationPrivate.selectedServices.map(
                  (serv, index) => (
                    <div key={index} className="text-sm text-gray-600 mb-1">
                      <p>
                        <span className="font-medium">Tipo:</span>{" "}
                        {serv.typeService}
                      </p>
                      <p>
                        <span className="font-medium">Descripción:</span>{" "}
                        {serv.descriptionServices}
                      </p>
                      <p>
                        <span className="font-medium">Precio:</span> Q
                        {serv.priceService}
                      </p>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-500">No hay servicios registrados.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
