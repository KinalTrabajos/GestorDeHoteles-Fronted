import { useState, useEffect } from 'react'
import perfil from '../../assets/img/perfil.png'

const navigation = [
  { name: 'Hoteles', href: '/' },
  { name: 'Habitaciones', href: '/auth' },
  { name: 'Informes', href: '#' },
  { name: 'Reservas', href: '#' },
  { name: 'Eventos', href: '#' },
  { name: 'Reservas de eventos', href: '#' },
]

export const Navbar = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex items-center">
          <span className="text-xl font-bold text-teal-600 ">Hotel BooKing</span>
        </div>
        <div className="hidden lg:flex lg:gap-x-8 ">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-teal-600 transition pl-7" 
            >
              <span className="mr-2 text-teal-400">🔸</span>
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <div className="flex items-center gap-4">
              <a href="/perfil" className="flex items-center gap-2 text-sm font-semibold text-teal-600">
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
  )
}
