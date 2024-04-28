import Image from "next/image"
import Link from "next/link"
import {
  LogOut,
  Router
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Subject } from "@mui/icons-material"
import React, { Suspense, useEffect, useState } from "react"
import axios from "axios"
import Loading from "./loading"
import FeedbackModal from "../FeedbackModal"
import formatarDataHora from "@/app/utils/Date"
import Text from "../Text"
import logo from '../../assets/logo.svg'
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface SchoolData {
  name: string;
  course: string;
}

interface SubjectData {
  Subject: any;
  name: any;
  id: any;
}

interface CourseData {
  subjects: SubjectData[];
  name: any;
  // Outras propriedades do curso, se houver
}

interface UserData {
  id: string;
  name: string;
  email: string;
  // Outras propriedades do usuário, se houver
  school: SchoolData;
  course: CourseData[];
}


export default function ReviewDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userSubjects, setUserSubjects] = useState<SubjectData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<SubjectData | null>(null);
  const [commentContent, setCommentContent] = useState('');
  const router = useRouter()

  const dataAtual = new Date();
  const dataFormatada = formatarDataHora(dataAtual);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        });
        const user = response.data.user;
        setUserData(user);

        const userId = user.id;

        if (!userId) {
          console.error("Erro: ID do usuário não encontrado.");
          return;
        }

        // const subjectsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/subjectsbyuser/${userId}`);
        const subjectsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/subjects-filtered-by-order/${userId}`);
        const userSubjectsData: SubjectData[] = subjectsResponse.data;
        setUserSubjects(userSubjectsData);
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleOpenModal = (subject: SubjectData) => {
    setCurrentSubject(subject);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentSubject(null);
    setModalOpen(false);
  };

  if (!userData) {
    return <Loading />;
  }

  const handleLogOut = () => {
    localStorage.removeItem('userToken');
  };


  const handleSubmitComment = async (subjectId: any) => {
    try {
      console.log('User ID:', userData.id);
      console.log('Subject ID:', subjectId);

      // Envio do comentário para o backend
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/comments`,
        {
          content: commentContent,
          subjectId: subjectId,
          userId: userData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // Fechar o modal após o envio bem-sucedido
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao enviar o comentário:', error);
      // Tratar erros, se necessário
    }
  }


  return (
    <div className=" flex items-center justify-center">
      <div className="flex flex-col bg-muted/40 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-full xl:max-w-screen-xl">
        <div className="flex justify-between">
          <div>
            <Text size="2xl" weight="semibold" fontFamily="sans" color="black">
              Olá, {userData?.name || 'Usuário'}!

            </Text>
            <Text size="xl" weight="normal" fontFamily="sans" color="black">
              {dataFormatada}
            </Text>
          </div>
          <Link href="/" onClick={handleLogOut}>
            <LogOut />
          </Link>
        </div>

        <div className="bg-white mx-auto lg:max-w-screen-lg">
          {userData && (
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">

                </div>
                <Tabs defaultValue="week">
                  <div className="flex items-center">

                    <div className="ml-auto flex items-center gap-2">

                    </div>
                  </div>
                  <TabsContent value="week">

                    <Card className="bg-white">
                      <CardHeader className="px-7">
                        <CardTitle>Avaliações</CardTitle>
                        <CardDescription>
                          Últimas avaliações disponíveis
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Matéria</TableHead>
                              <TableHead className="hidden md:table-cell">
                                Curso
                              </TableHead>
                              <TableHead className="hidden md:table-cell">Avalie</TableHead>
                              <div>
                                <TableHead className="text-right flex flex-col">
                                  Comentário
                                  <span className="opacity-60">(opcional)</span>
                                </TableHead>
                              </div>

                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            {userSubjects.map((subjectGroup, index) => (
                              <React.Fragment key={index}>
                                {subjectGroup.Subject.map((subject: any, subIndex: any) => (
                                  <TableRow key={subIndex}>
                                    <TableCell>{subject.name}</TableCell>
                                    <TableCell>{subject.id}</TableCell>
                                    <TableCell>
                                      <Button className="bg-default hover:bg-default/90 text-white" onClick={() => handleOpenModal(subject)}>
                                        Nova avaliação
                                      </Button>
                                      <FeedbackModal
                                        open={modalOpen && currentSubject?.id === subject.id}
                                        onClose={handleCloseModal}
                                        onSubmit={(scores) => console.log('Feedback data:', { subjectId: subject.id, userId: userData.id, scores })}
                                        title={`Avaliação de ${subject.name}`}
                                        subjectId={subject.id}
                                        userId={userData.id}
                                      />
                                    </TableCell>
                                    <TableCell>

                                      <AlertDialog >
                                        <AlertDialogTrigger>
                                          <Button>
                                            Comentar
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-white">
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Deixe seu comentário</AlertDialogTitle>
                                            <AlertDialogDescription>
                                            Por favor, mantenha o respeito ao escrever sua mensagem abaixo. Comunicação saudável e respeitosa é fundamental para construir relacionamentos positivos e produtivos. Vamos manter um ambiente onde todos se sintam valorizados e ouvidos. Obrigado!
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <textarea
                                            className="border border-gray-300 rounded-md p-2 w-full h-24 focus:outline-none focus:ring focus:border-blue-300"
                                            placeholder="Digite seu comentário..."
                                            onChange={(e) => setCommentContent(e.target.value)}
                                          />
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction className="bg-default hover:bg-default/90 text-white" onClick={() => handleSubmitComment(subject.id)}>Enviar</AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>

                                    </TableCell>
                                  </TableRow>
                                ))}
                              </React.Fragment>
                            ))}
                          </TableBody>

                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

            </main>
          )}
        </div>
      </div>
    </div>
  )
}

