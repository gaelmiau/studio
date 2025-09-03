import { Header } from "@/components/Header";
import { LoteriaGame } from "@/components/game/LoteriaGame";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 flex items-center justify-center">
        <div className="w-full max-w-4xl">
            <Card className="border-2 border-primary/50 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <LoteriaGame />
              </CardContent>
            </Card>
        </div>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm">
        <p>Hecho con ♥ para la Lotería Mexicana</p>
      </footer>
    </div>
  );
}
