
export function Header() {
  return (
    <header className="relative py-1 px-4 md:px-8 border-b-2 border-primary/20 bg-[#bfbce2]
      h-[clamp(20px,12vw,60px)]
      transition-all
      duration-300">
      {/* Pleca arriba a la derecha */}
      <div className="absolute top-0 right-0 flex items-center justify-center px-4 py-2 px-[clamp(8px,2vw,24px)] py-[clamp(2px,0.7vw,8px)] font-sans"
        style={{
          background: '#18529D',
          fontSize: 'clamp(9px,5vw,18px)',
          fontWeight: 'normal',
          height: 'clamp(22px,10vw,18px)',
          padding: '5px 5px',
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
      <div className="container mx-auto flex flex-col items-center h-full relative">
        <div className="flex items-center justify-center gap-4 transform -translate-x-[80%]">
          <h1 className="font-lato font-semibold text-[#172136] text-left w-full whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: 'clamp(18px,5vw,25px)', lineHeight: 'clamp(24px,6vw,40px)', }}>
            Lotería de InfoSegura
          </h1>
        </div>
      </div>
    </header>
  );
}
