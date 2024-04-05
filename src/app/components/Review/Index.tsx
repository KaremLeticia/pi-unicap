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
import { ReviewSheet } from "../ReviewSheet"

interface SchoolData {
  name: string;
  course: string;
}

interface SubjectData {
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
  const [userSubjects, setUserSubjects] = useState<any[]>([]); // Inicialize com um array vazio

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtém os dados do usuário
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        });
        const user = response.data.user;
        setUserData(user);
  
        // Armazena o ID do usuário
        const userId = user.id;
  
        // Certifique-se de que userId não está vazio
        if (!userId) {
          console.error("Erro: ID do usuário não encontrado.");
          return;
        }
  
        // Obtém os subjects do usuário usando o ID armazenado
        const subjectsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/subjectsbyuser/${userId}`);
        const userSubjectsData = subjectsResponse.data; // Renomeie a variável para evitar conflito de nome
        console.log(userSubjectsData); // Verifique se os dados estão sendo retornados corretamente

        // Atualize o estado com os subjects obtidos
        setUserSubjects(userSubjectsData);
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };
  
    fetchUserData();
  }, []);
    
  if (!userData) {
    return <Loading />
  }

  

  return (
    
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
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
                            <TableHead className="text-right">Avalie</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">{userData.school.name}</div>
                              <ReviewSheet />
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                liam@example.com
                              </div>
                            </TableCell>                  
                            <TableCell className="hidden sm:table-cell">
                    
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge className="text-xs" variant="secondary">
                                {userData.email}
                              </Badge>
                            </TableCell>

                          </TableRow>
                        </TableBody>
                        <TableBody>
  {userSubjects.map((subjectGroup, index) => (
    <React.Fragment key={index}>
      {subjectGroup.Subject.map((subject: any, subIndex: any) => (
        <TableRow key={subIndex}>
          <TableCell>{subject.name}</TableCell>
          <TableCell>{subject.courseId}</TableCell>

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
            <div>
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Order ID: Oe31b70H
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy Order ID</span>
                      </Button>
                    </CardTitle>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                      <Truck className="h-3.5 w-3.5" />
                      <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                        Track Order
                      </span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline" className="h-8 w-8">
                          <MoreVertical className="h-3.5 w-3.5" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Trash</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">Order Details</div>
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Glimmer Lamps x <span>2</span>
                        </span>
                        <span>$250.00</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Aqua Filters x <span>1</span>
                        </span>
                        <span>$49.00</span>
                      </li>
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>$299.00</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>$5.00</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>$25.00</span>
                      </li>
                      <li className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">Total</span>
                        <span>$329.00</span>
                      </li>
                    </ul>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <div className="font-semibold">Shipping Information</div>
                      <address className="grid gap-0.5 not-italic text-muted-foreground">
                        <span>Liam Johnson</span>
                        <span>1234 Main St.</span>
                        <span>Anytown, CA 12345</span>
                      </address>
                    </div>
                    <div className="grid auto-rows-max gap-3">
                      <div className="font-semibold">Billing Information</div>
                      <div className="text-muted-foreground">
                        Same as shipping address
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Customer Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Customer</dt>
                        <dd>Liam Johnson</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Email</dt>
                        <dd>
                          <a href="mailto:">liam@acme.com</a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Phone</dt>
                        <dd>
                          <a href="tel:">+1 234 567 890</a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Payment Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <CreditCard className="h-4 w-4" />
                          Visa
                        </dt>
                        <dd>**** **** **** 4532</dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                  </div>
                </CardFooter>
              </Card>
            </div>
          </main>
        )}
      </div>
    </div>
     )
  }

