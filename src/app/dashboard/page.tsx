"use client"
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import UsersBySchoolChart from "@/app/components/Charts/usersBySchool"
import { useEffect, useState } from "react"
import axios from "axios"
import jwt from 'jsonwebtoken'; // Importe jwt para decodificar o token
import Admin from "../page"
import { useRole } from "@/contexts/RoleContext"
import { notFound, useRouter } from "next/navigation"
import { RevenueChart } from "../components/Charts/Revenue-Chart"
import { StatsBar } from "../components/Charts/StatsBar"
import { CoursePerform } from "../components/Charts/CoursePerform"
import { MetricsTable } from "../components/Charts/MetricsTable"
import { RecentUsersCard } from "../components/Charts/LastTen"
import DownloadPDFButton from "../components/PDFButton"

interface UserWithRatings {
  totalUsersWithRatings: any;
}


export default function Dashboard() {
  const { role } = useRole();
  const [usersTotal, setUsersTotal] = useState<number>(0);
  const [userWithRatings, setUserWithRatings] = useState<UserWithRatings>({ totalUsersWithRatings: 0 });
  const router = useRouter()

  useEffect(() => {
    const fetchUsersTotal = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/admin/totalusers`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            'Content-Type': 'application/json'
          }
        });
        setUsersTotal(response.data.totalUsers);
      } catch (error) {
        console.error('Erro ao buscar o total de usuários:', error);
      }
    };

    const fetchUserWithRatings = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/admin/userwithratings`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            'Content-Type': 'application/json'
          }
        });
        setUserWithRatings(response.data);
      } catch (error) {
        console.error('Erro ao buscar os usuários com avaliações:', error);
      }
    };

    fetchUsersTotal();
    fetchUserWithRatings();
  }, []);

  useEffect(() => {
    console.log('Total de usuários:', usersTotal);
  }, [usersTotal]);

  useEffect(() => {
    console.log('Usuários com avaliações:', userWithRatings);
  }, [userWithRatings]);


  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">

          <Card slot="1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Alunos cadastrados
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usersTotal}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participação Total</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userWithRatings.totalUsersWithRatings}</div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-2">

          <UsersBySchoolChart />
          <RevenueChart />
          <StatsBar />
          <MetricsTable />
          <div>
            <CoursePerform />
            <DownloadPDFButton />
          </div>
          <RecentUsersCard />

        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        </div>
      </main>
    </div>
  )
}