import { useEffect, useState } from 'react';
import { fetchHotelImages } from '../../services/api';

const VerHotele = () => {
  const [images, setImages] = useState([])

  useEffect(() => {
    const getImages = async () => {
      const hotelImages = await fetchHotelImages()
      setImages(hotelImages)
    };
    getImages()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {images.map((image) => (
        <div key={image.id} className="bg-white shadow-lg rounded-2xl p-4 border hover:scale-105 transition-transform">
          <img
            src={image.src.medium}
            alt={image.alt}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-700 mb-1">Foto por {image.photographer}</p>
        </div>
      ))}
    </div>
  )
}

export default VerHotele
