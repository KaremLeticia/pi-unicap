"use client"

import Image from "next/image"
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import axios from "axios"
import { Card } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRole } from "@/contexts/RoleContext"
import Text from "@/app/components/Text"
import { LoaderCircle } from "lucide-react"



export default function PlaygroundPage() {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [comentario, setComentario] = useState('');

  const [resultado, setResultado] = useState([]);
  const { role } = useRole();
  const router = useRouter()

  const handleSubmit = async (comentario: string) => {
    try {
      setLoading(true);
      const response = await axios.post('https://apiia-production.up.railway.app/analise', { comentario });
      setLoading(false);
      console.log('Resposta da API:', response.data);
      if (response.status === 200) {
        setAlertMessage("CADASTRADO");
        setResultado(response.data.resultado);
      }
    } catch (error) {
      setLoading(false);
      console.error('Erro ao enviar os dados para a API:', error);
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (comentario.trim() === '') {
      console.error('Por favor, escreva um comentário.');
      return;
    }
    handleSubmit(comentario);
  };

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/playground-light.png"
          width={1280}
          height={916}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/playground-dark.png"
          width={1280}
          height={916}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Playground</h2>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                <div className="grid gap-2">
                </div>
                <Text weight="semibold" size="lg">Resultado: </Text>
                <Card className="p-2 bg-white shadow-lg">
                  {loading ? (
                    <LoaderCircle className="mx-auto mt-4 animate-spin" size={40} />
                  ) : (
                    resultado && (
                      <div>
                        {resultado.map((item: any, index: number) => (
                          <div key={index}>
                            <p>
                              <span className="text-black font-bold">{item.label}</span>
                              <br />
                              <span className="text-black font-bold">Score:</span>
                              <span> {item.score}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </Card>
              </div>
              <div className="md:order-1">
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <Textarea
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      placeholder="Escreva seu comentário aqui..."
                      className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                    />

                    <div className="flex items-center space-x-2">
                      <Button onClick={handleFormSubmit}>Submit</Button>
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="insert" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                      <Textarea
                        placeholder="We're writing to [inset]. Congrats from OpenAI!"
                        className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                      />
                      <div className="rounded-md border bg-muted"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button>Submit</Button>
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="edit" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full gap-6 lg:grid-cols-2">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-1 flex-col space-y-2">
                          <Label htmlFor="input">Input</Label>
                          <Textarea
                            id="input"
                            placeholder="We is going to the market."
                            className="flex-1 lg:min-h-[580px]"
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="instructions">Instructions</Label>
                          <Textarea
                            id="instructions"
                            placeholder="Fix the grammar."
                          />
                        </div>
                      </div>
                      <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button>Submit</Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>

          </div>
        </Tabs>
      </div>
    </>
  )
}