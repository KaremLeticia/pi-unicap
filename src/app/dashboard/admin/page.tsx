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
import { useEffect, useState } from "react"
import axios from 'axios';

export default function Admin() {
  const [courseName, setCourseName] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [courseIdForSubject, setCourseIdForSubject] = useState('');
  const [loadingSubject, setLoadingSubject] = useState(false);
  const [errorSubject, setErrorSubject] = useState('');


  const handleSubmitNewCourse = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Sending request to create new course:', { name: courseName, schoolId: schoolId });
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/admin/courses`, {
        name: courseName,
        schoolId: schoolId
      });
      console.log('Response:', response.data);
      // Limpar os campos após o envio bem-sucedido
      setCourseName('');
      setSchoolId('');
      setError('');
    } catch (error) {
      console.error('Error creating course:', error);
      setError('Erro ao criar o curso. Por favor, tente novamente.');
    }
    setLoading(false);
  };

  const handleSubmitNewSubject = async (e: any) => {
    e.preventDefault();
    setLoadingSubject(true);
    try {
      console.log('Sending request to create new subject:', { name: subjectName, courseId: courseIdForSubject });
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/admin/subjects`, {
        name: subjectName,
        courseId: courseIdForSubject
      });
      console.log('Response:', response.data);
      // Limpar os campos após o envio bem-sucedido
      setSubjectName('');
      setCourseIdForSubject('');
      setErrorSubject('');
    } catch (error) {
      console.error('Error creating subject:', error);
      setErrorSubject('Erro ao criar a matéria. Por favor, tente novamente.');
    }
    setLoadingSubject(false);
  };


  return (
    <div className="grid h-screen w-full pl-[56px]">
      <div className="flex flex-col">
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Criar nova escola
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="schoolName">Nome da matéria</Label>
                  <Input disabled id="schoolName" type="text" placeholder="Ex: Centro de Artes Visuais" />
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Adicionar novo curso
                </legend>

                <div className="grid gap-3">
                  <Label htmlFor="schoolId">ID da escola</Label>
                  <Input id="schoolID" type="text" placeholder="Ex: Sistemas para Internet" value={schoolId}
                    onChange={(e: any) => setSchoolId(e.target.value)}
                  />
                  <Label htmlFor="courseName">Nome do curso</Label>
                  <Input id="courseName" type="text" placeholder="Ex: Sistemas para Internet" value={courseName}
                    onChange={(e: any) => setCourseName(e.target.value)}
                  />
                </div>
                <Button onClick={handleSubmitNewCourse} disabled={loading}>
                  {loading ? 'Enviando...' : 'Adicionar Curso'}
                </Button>
                {error && <p className="text-red-500">{error}</p>}
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Adicionar nova matéria
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="courseIdForSubject">ID do Curso</Label>
                  <Input id="courseIdForSubject" type="text" placeholder="Ex: 123456" value={courseIdForSubject}
                    onChange={(e: any) => setCourseIdForSubject(e.target.value)}
                  />
                  <Label htmlFor="subjectName">Nome da matéria</Label>
                  <Input id="subjectName" type="text" placeholder="Ex: Introdução a Programação" value={subjectName}
                    onChange={(e: any) => setSubjectName(e.target.value)}
                  />
                </div>
                <Button onClick={handleSubmitNewSubject} disabled={loadingSubject}>
                  {loadingSubject ? 'Enviando...' : 'Adicionar Matéria'}
                </Button>
                {errorSubject && <p className="text-red-500">{errorSubject}</p>}
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
