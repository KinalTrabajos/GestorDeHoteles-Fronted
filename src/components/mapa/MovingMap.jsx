import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { useEffect } from 'react'

const AnimateMap = () => {
  const map = useMap()

  useEffect(() => {
    const interval = setInterval(() => {
      const center = map.getCenter()
      map.panTo([center.lat + 0.001, center.lng + 0.001])
    }, 1000)

    return () => clearInterval(interval)
  }, [map])

  return null
}

export const MovingMap = () => {
  return (
    <div className="h-[1000px] w-[550px] rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[14.6349, -90.5069]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AnimateMap />
      </MapContainer>
    </div>
  );
}
