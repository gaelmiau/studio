import { AztecSunIcon } from "@/components/icons";

export function Header() {
  return (
    <header className="py-6 px-4 md:px-8 border-b-2 border-primary/20 bg-white">
      <div className="container mx-auto flex items-center justify-center gap-4">
        {/* Imagen a la izquierda */}
        <img src="/icono.png" alt="Logo" className="w-12 h-12 md:w-16 md:h-16"></img>

        {/* Título */}
        <h1 className="text-3xl md:text-5xl font-headline font-bold text-center tracking-tight text-blue-800">
          Lotería Seguridad de la Información
        </h1>
      </div>
    </header>


  );
}

