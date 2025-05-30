const navigation = [
  { name: 'Hoteles', href: '/' },
  { name: 'Habitaciones', href: '/habitaciones' },
  { name: 'Informes', href: '#' },
  { name: 'Reservas', href: '/reservas' },
  { name: 'Eventos', href: '/eventos' },
  { name: 'Reservas de eventos', href: '/reservationPage' },
]

export const Navbar = () => {

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
          <a
            href="/auth"
            className="text-sm font-semibold text-teal-600 hover:text-teal-800 transition"
          >
            Login <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
