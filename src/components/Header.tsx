
export function Header() {
  return (
    <header className="
      relative py-1 px-4 md:px-8 border-b-2 border-primary/20 
      bg-[#bfbce2]
      min-h-[clamp(10px,8vw,0px)]
      flex flex-col justify-center">
      {/* Pleca arriba a la derecha */}
      <div className="
          absolute top-0 right-0 flex 
          items-center justify-center
          px-[clamp(8px,2vw,24px)] py-[clamp(2px,0.7vw,8px)] 
          font-sans
          text-white
          whitespace-nowrap
          z-10
          md:text-[clamp(12px,2vw,18px)]
          text-[clamp(10px,4vw,16px)]
          "
        style={{
          background: '#18529D',
          fontSize: 'clamp(9px,5vw,18px)',
          height: 'clamp(22px,7vw,32px)',
          minWidth: 'clamp(100px,20vw,220px)',
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
        <div className="flex items-center transform -translate-x-[80%] pt-[clamp(28px,7vw,38px)]">
          <h1 className="font-lato font-semibold text-[#172136] text-left md:text-left text-center w-full whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: 'clamp(16px,6vw,28px)', lineHeight: 'clamp(22px,7vw,40px)', }}>
            Lotería de InfoSegura
          </h1>
        </div>
      </div>
    </header>
  );
}
