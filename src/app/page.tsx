import { Header } from "@/components/Header";
import { AIBoardGenerator } from "@/components/ai/AIBoardGenerator";
import { LoteriaGame } from "@/components/game/LoteriaGame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto bg-card border">
            <TabsTrigger value="game">Juego de Lotería</TabsTrigger>
            <TabsTrigger value="ai-generator">Generador de Tablas IA</TabsTrigger>
          </TabsList>
          <TabsContent value="game" className="mt-6">
            <Card className="border-2 border-primary/50 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <LoteriaGame />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ai-generator" className="mt-6">
            <Card className="border-2 border-primary/50 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <AIBoardGenerator />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm">
        <p>Hecho con ♥ para la Lotería Mexicana</p>
      </footer>
    </div>
  );
}
