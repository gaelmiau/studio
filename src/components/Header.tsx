
export function Header() {
  return (
    <header className="relative py-1 px-4 md:px-8 border-b-2 border-primary/20 bg-[#bfbce2]">
      {/* Pleca arriba a la derecha */}
      <div className="absolute top-0 right-0 flex items-center justify-center px-4 py-2 hidden lg:flex font-family: 'Gill Sans'"
           style={{
             background: '#18529D',
             padding: '3px 5px',
             fontSize: '18px',
             fontWeight: 'normal',
             
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
          <h1 className="text-[32px] font-bold text-center tracking-tight text-[#172136] font-lato">
            Lotería Seguridad de la Información
          </h1>
        </div>
      </div>
    </header>
  );
}
