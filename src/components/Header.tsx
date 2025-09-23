export function Header() {
  return (
    <header className="relative py-1 px-4 md:px-8 border-b-2 border-primary/20 bg-white">
      {/* Pleca arriba a la derecha */}
      <div className="absolute top-0 right-0 flex items-center justify-center px-4 py-2 hidden lg:flex"
           style={{
             background: 'linear-gradient(90deg, #17529C 0%, #0b1b74 70%)',
             padding: '5px 9px',
           }}>
        <a
          href="https://uv.mx/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          Universidad Veracruzana
        </a>
      </div>

      {/* Contenido principal: logo + título */}
      <div className="container mx-auto flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-4">
          <img src="/icono.png" alt="Logo" className="w-10 h-10 md:w-12 md:h-12" />
          <h1 className="text-2xl md:text-4xl font-bold text-center tracking-tight text-blue-800">
            Lotería Seguridad de la Información
          </h1>
        </div>
      </div>
    </header>
  );
}
