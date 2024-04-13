import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
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

        const subjectsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/subjectsbyuser/${userId}`);
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


  return (
<div className=" flex items-center justify-center">

    <div className="flex flex-col bg-muted/40">
        <Text size="2xl" weight="semibold" fontFamily="sans" color="black">
          {userData?.name || 'Usuário'}
        </Text>
        <Text size="xl" weight="normal" fontFamily="sans" color="black">
          {dataFormatada}
         
        </Text>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
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
                            
                            <TableHead className="text-right">Comentário</TableHead>
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

