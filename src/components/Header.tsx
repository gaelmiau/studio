export function Header() {
  return (
    <header className="py-3 px-4 md:px-8 border-b-2 border-primary/20 bg-white">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <img src="/icono.png" alt="Logo" className="w-10 h-10 md:w-12 md:h-12" />
        <h1 className="text-2xl md:text-4xl font-bold text-center tracking-tight text-blue-800">
          Lotería Seguridad de la Información
        </h1>
      </div>
    </header>
  );
}

