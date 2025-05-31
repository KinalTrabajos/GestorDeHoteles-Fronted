import { useWiewInvoice } from "../../shared/hooks/invoice/useWiewInvoice";
import { Navbar } from "../Navbars/Navbar";
import { Footer } from "../settings/Footer";

export const InvoicesPage = () => {
  const { invoice, isLoading } = useWiewInvoice();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12 px-6 pt-22">
        <h1 className="text-4xl font-bold text-center text-teal-700 mb-10">
          Historial de Facturas
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-500 text-lg">
            Cargando facturas...
          </p>
        ) : invoice.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No hay facturas disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {invoice.map((factura) => (
              <div
                key={factura._id}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {factura.reservationPrivate?.keeperEvent?.nameEvent ||
                    "Sin nombre de evento"}
                </h2>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Tipo:</span>{" "}
                  {factura.reservationPrivate?.keeperEvent?.typeEvent
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
                  {factura.reservationPrivate?.selectedServices?.length > 0 ? (
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
                    <p className="text-gray-500">
                      No hay servicios registrados.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
