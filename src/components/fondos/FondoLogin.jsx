import Fondo1 from '../../assets/img/Fondo1.png'

export const FondoLogin = ({ text, children }) => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${Fondo1})` }}
    >
      <div className=" backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4">
        {text && (
          <h2 className="text-2xl font-bold text-center text-indigo-800 mb-4">
            {text}
          </h2>
        )}
        {children}
      </div>
    </div>
  )
}