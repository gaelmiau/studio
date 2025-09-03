"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generatePersonalizedBoard } from '@/ai/flows/personalized-loteria-boards';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Wand2 } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  imageFeature: z.string().min(1, 'Por favor, selecciona un tema.'),
});

export function AIBoardGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [boardDataUri, setBoardDataUri] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageFeature: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setBoardDataUri(null);
    try {
      const result = await generatePersonalizedBoard(values);
      setBoardDataUri(result.boardDataUri);
    } catch (e) {
      console.error(e);
      setError('Hubo un error al generar la tabla. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Wand2 className="text-primary" />
            Crea tu Tabla Personalizada
          </CardTitle>
          <CardDescription>
            Usa el poder de la IA para generar una tabla de Lotería única basada en un tema de tu elección.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="imageFeature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Elige un tema para tu tabla</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tema..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="people">Personas y Personajes</SelectItem>
                        <SelectItem value="landscapes">Paisajes y Lugares</SelectItem>
                        <SelectItem value="artifacts">Objetos y Artefactos</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Generando...' : 'Generar Tabla Mágica'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div>
        <h3 className="font-headline text-xl text-center mb-2">Resultado</h3>
        <Card className="aspect-[1/1] w-full bg-muted/30 flex items-center justify-center p-4">
          {loading && <Skeleton className="w-full h-full" />}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {boardDataUri && (
            <div className="relative w-full h-full rounded-md overflow-hidden shadow-lg">
                <Image
                    src={boardDataUri}
                    alt="Tabla de Lotería generada por IA"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
          )}
          {!loading && !error && !boardDataUri && (
             <p className="text-muted-foreground text-center">Aquí aparecerá tu tabla generada.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
