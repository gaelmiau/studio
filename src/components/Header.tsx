import { AztecSunIcon } from "@/components/icons";

export function Header() {
  return (
    <header className="py-6 px-4 md:px-8 border-b-2 border-primary/20 bg-card/50">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <AztecSunIcon className="w-8 h-8 md:w-10 md:h-10 text-primary animate-spin [animation-duration:15s]" />
        <h1 className="text-3xl md:text-5xl font-headline font-bold text-center tracking-tight text-primary-foreground">
          Lotería Seguridad de la Información
        </h1>
        <AztecSunIcon className="w-8 h-8 md:w-10 md:h-10 text-primary animate-spin [animation-duration:15s] [animation-direction:reverse]" />
      </div>
    </header>
  );
}
