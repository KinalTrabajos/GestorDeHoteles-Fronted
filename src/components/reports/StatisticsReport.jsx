import React from "react";
import { useMostRequestedHotels } from "../../shared/hooks/reports";
import { useMonthlyOccupancy } from "../../shared/hooks/reports";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";

export const StatisticsReport = () => {
    const {
        mostRequestedHotels,
        loading: loadingRequested,
        error: errorRequested,
    } = useMostRequestedHotels();

    const {
        monthlyOccupancy,
        loading: loadingOccupancy,
        error: errorOccupancy,
    } = useMonthlyOccupancy();

    const top5RequestedHotels = mostRequestedHotels.slice(0, 5);
    const top5MonthlyOccupancy = monthlyOccupancy.slice(0, 5);

    if (loadingRequested || loadingOccupancy) {
        return <p className="text-center mt-4 text-lg">Cargando estadísticas...</p>;
    }

    if (errorRequested || errorOccupancy) {
        return (
            <p className="text-center mt-4 text-red-600">
                Error al cargar las estadísticas.
            </p>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                📊 Reporte de Estadísticas de Hoteles
            </h1>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-blue-800">
                    🏨 Hoteles más solicitados
                </h2>
                <div className="bg-white rounded-xl shadow p-6">
                    {top5RequestedHotels.length === 0 ? (
                        <p>No hay datos disponibles.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={top5RequestedHotels}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hotelName" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="totalReservations"
                                    fill="#3b82f6"
                                    name="Reservas"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-green-800">
                    📅 Porcentaje de ocupación mensual
                </h2>
                <div className="bg-white rounded-xl shadow p-6">
                    {top5MonthlyOccupancy.length === 0 ? (
                        <p>No hay datos disponibles.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={top5MonthlyOccupancy}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hotelName" />
                                <YAxis unit="%" />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="occupancyPercentage"
                                    fill="#10b981"
                                    name="Ocupación %"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </section>
        </div>
    );
};
