import { useState, useEffect } from 'react';
import perfil from '../../assets/img/perfil.png';

const navigation = [
  { name: 'Hoteles', href: '/' },
  { name: 'Habitaciones', href: '/habitaciones' },
  { name: 'Informes', href: '/reportsAndStatistics' },
  { name: 'Reservas', href: '/reservas' },
  { name: 'Eventos', href: '/eventos' },
  { name: 'Facturas', href: '/invoicesPage' },
  { name: 'Reservas de eventos', href: '/reservationPage' },
];

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-teal-600">Hotel BooKing</span>
        </div>

        {/* Navegación principal */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            item.name === 'Reservas' ? (
              <div key={item.name} className="relative group">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-sm font-medium text-gray-700 hover:text-teal-600 transition flex items-center gap-1"
                >
                  <span className="text-teal-400">🔸</span>{item.name} ▾
                </button>
                {dropdownOpen && (
                  <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md py-2">
                    <a href="/reservas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Todas las reservas</a>
                    <a href="/reservationById/123456789012345678901234" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Por hotel</a>
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-teal-600 transition px-2"
              >
                <span className="mr-2 text-teal-400">🔸</span>
                {item.name}
              </a>
            )
          ))}
        </div>

        {/* Perfil o login */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-6">
          {user ? (
            <div className="flex items-center gap-6">
              <a href="/perfil" className="flex items-center gap-3 text-sm font-semibold text-teal-600">
                <img src={perfil} alt="Perfil" className="w-8 h-8 rounded-full object-cover" />
              </a>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-teal-600 hover:text-teal-800 transition"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <a
              href="/auth"
              className="text-sm font-semibold text-teal-600 hover:text-teal-800 transition"
            >
              Login <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};