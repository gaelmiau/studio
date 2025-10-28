export function Header() {
  return (
    <header
      className="
        relative 
        flex items-center justify-between
        w-full 
        px-[clamp(8px,3vw,24px)] 
        py-[clamp(4px,1vw,8px)]
        bg-[#bfbce2]
        border-b-2 border-primary/20
        overflow-hidden
      "
    >
      {/* Texto principal a la izquierda */}
      <div
        className="
          mx-auto transform -translate-x-[25%] 
        ">
        <h1
          className="
          font-lato font-semibold text-[#172136]
          whitespace-nowrap
          text-[clamp(12px,4vw,24px)]
          leading-[clamp(16px,4.5vw,24px)]
        "
        >
          Lotería de InfoSegura
        </h1>
      </div>


      {/* Pleca de la UV a la derecha */}
      <div
        className="
          absolute right-0 top-0 flex
        ">
        <a
          href="https://uv.mx/"
          target="_blank"
          rel="noopener noreferrer"
          className="
          bg-[#18529D]
          text-white font-sans 
          px-[clamp(6px,1.5vw,12px)] 
          py-[clamp(2px,0.5vw,4px)]
          text-[clamp(10px,2.5vw,14px)]
          whitespace-nowrap
          transition-all duration-200
        "
        >
          Universidad Veracruzana
        </a>
      </div>

    </header>
  );
}
