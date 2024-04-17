"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken'; // Importe jwt para decodificar o token
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrderTableRow } from './order-table-row';
import { OrderTableFilters } from './order-table-filters';
import { Pagination } from '@/components/ui/pagination';
import { format } from 'date-fns';
import { notFound, useRouter } from 'next/navigation';
import { useRole } from '@/contexts/RoleContext';

export default function Orders() {
  const [users, setUsers] = useState<any[]>([]);
  const { role } = useRole();
  const router = useRouter() 

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/admin/getuserdetails`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            'Content-Type': 'application/json'
          }
        });
        setUsers(response.data.users);

        // Decode o token JWT novamente para verificar seu conteúdo
        const token = localStorage.getItem('userToken');
        if (token) {
          const decodedToken = jwt.decode(token);
          console.log('Token decodificado:', decodedToken);
        }
      } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Alunos Cadastrados</h1>
        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">ID</TableHead>
                  <TableHead className="w-[180px]">Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead className="w-[140px]">RA</TableHead>
                  <TableHead className="w-[164px]">Escola</TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => {
                  const formattedCreatedAt = format(new Date(user.createdAt), 'dd/MM/yyyy HH:mm:ss');

                  return (
                    <OrderTableRow
                      key={index}
                      id={user.id}
                      email={user.email}
                      name={user.name}
                      surname={user.surname}
                      studentRegister={user.studentRegister}
                      role={user.role}
                      createdAt={formattedCreatedAt} // Data formatada
                      school={user.school.name}
                      accountAge={user.accountAge}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {/* <Pagination pageIndex={0} totalCount={105} perPage={10} /> */}
        </div>
      </div>
    </>
  );
}
