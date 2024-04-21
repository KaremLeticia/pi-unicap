import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Badge } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import Link from 'next/link';

interface School {
  name: string;
}

interface User {
  name: string;
  surname: string;
  email: string;
  school: School;
}

export function RecentUsersCard() {
  const [usersTen, setUsersTen] = useState<User[]>([]);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const response = await axios.get<{ users: User[] }>( `${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/admin/getten`,);
        setUsersTen(response.data.users);
      } catch (error) {
        console.error('Error fetching recent users:', error);
      }
    };

    fetchRecentUsers();
  }, []);

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Alunos Cadastrados</CardTitle>
          <CardDescription>Últimos 10 alunos cadastrados</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/dashboard/admin/students">
            Ver todos
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Sobrenome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Escola</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersTen.map((user: User, index: number) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.surname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.school.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
