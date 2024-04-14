"use client"
import {
  Bird,
  Book,
  BookMarked,
  BookOpen,
  Bot,
  BriefcaseMedical,
  Code2,
  CornerDownLeft,
  Landmark,
  LifeBuoy,
  Mic,
  Paperclip,
  PenTool,
  Rabbit,
  Rocket,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
  Tv,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import { useRole } from "@/contexts/RoleContext"
import { notFound, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Admin() {
  const { role } = useRole();
  const router = useRouter() 

  useEffect(() => {
    if (role !== 'ADMIN') {
      return notFound()
    }
  }, [role, router]);
  return (
    <div className="grid h-screen w-full pl-[56px]">

      <div className="flex flex-col">

        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Adicionar novo curso
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">Escola</Label>
                  <Select>
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Selecione uma escola" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Icam-tech">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Rocket className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Icam-tech
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="Comunicação">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Tv className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Comunicação
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="Ciências Jurídicas">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <PenTool className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Ciências Jurídicas
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="Educação e Humanidades">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <BookOpen className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Educação e Humanidades
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="Gestão, Economia e Política">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Landmark className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Gestão, Economia e Política
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="Saúde e Ciências da Vida">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <BriefcaseMedical className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Saúde e Ciências da Vida
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="courseName">Nome do curso</Label>
                  <Input id="courseName" type="text" placeholder="Ex: Sistemas para Internet" />
                </div>

              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Adicionar nova matéria
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">Escola</Label>
                  <Select>
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Selecione uma escola" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Icam-tech">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Rocket className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Icam-tech
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="Comunicação">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Tv className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Comunicação
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="Ciências Jurídicas">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <PenTool className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Ciências Jurídicas
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="Educação e Humanidades">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <BookOpen className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Educação e Humanidades
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="Gestão, Economia e Política">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Landmark className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Gestão, Economia e Política
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="Saúde e Ciências da Vida">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <BriefcaseMedical className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Saúde e Ciências da Vida
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="school">Escola</Label>
                  <Select>
                    <SelectTrigger
                      id="course"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Selecione um curso" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Icam-tech">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Rocket className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Icam-tech
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="Comunicação">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Tv className="size-5" />
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              Comunicação
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="courseName">Nome da matéria</Label>
                  <Input id="courseName" type="text" placeholder="Ex: Introdução a Programação" />
                </div>
              </fieldset>

              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Messages
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="You are a..."
                    className="min-h-[9.5rem]"
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <div className="flex-1" />
            <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
