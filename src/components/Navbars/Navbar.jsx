import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const navigation = [
  { name: 'Hoteles', href: '/' },
  { name: 'Habitaciones', href: '/auth' },
  { name: 'Informes', href: '/reportsAndStatistics' },
  { name: 'Reservas', href: '/' },
  { name: 'Eventos', href: '#' },
  { name: 'Reservas de eventos', href: '#' },
];

export const Navbar = () => {
  const location = useLocation();
  const matchHotelId = location.pathname.match(/\/hotel\/([a-f0-9]{24})/);
  const hotelId = matchHotelId ? matchHotelId[1] : null;

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex items-center">
          <span className="text-xl font-bold text-teal-600">Hotel BooKing</span>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => {
            const isInternalLink = item.href.startsWith('/');
            const dynamicHref =
              item.name === 'Reservas' && hotelId ? `/reservationById/${hotelId}` : item.href;

            return isInternalLink ? (
              <Link
                key={item.name}
                to={dynamicHref}
                className="text-sm font-medium text-gray-700 hover:text-teal-600 transition pl-7"
              >
                <span className="mr-2 text-teal-400">🔸</span>
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={dynamicHref}
                className="text-sm font-medium text-gray-700 hover:text-teal-600 transition pl-7"
              >
                <span className="mr-2 text-teal-400">🔸</span>
                {item.name}
              </a>
            );
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/auth"
            className="text-sm font-semibold text-teal-600 hover:text-teal-800 transition"
          >
            Login <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};