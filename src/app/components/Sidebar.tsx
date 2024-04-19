import React from "react";
import Image from "next/image";
import logo from '../assets/navbar1.svg'
import { House, Bell, Info, ChartPieSlice, GearSix, SignOut, GraduationCap, UsersThree, Robot, ChatCenteredText } from "@phosphor-icons/react";
import Link from "next/link";
import jwt, { JwtPayload } from 'jsonwebtoken';

const handleLogOut = () => {
  localStorage.removeItem('userToken');
};


export default function Sidebar() {
  // Verifica se está no lado do cliente antes de acessar o localStorage
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('userToken');
  const decodedToken = isAdmin ? jwt.decode(isAdmin) as JwtPayload : null;
  const isAdminUser = decodedToken?.role === 'ADMIN';

  if (!isAdminUser) {
    return null; // Não renderiza nada se o usuário não for um administrador
  }

  return (<>
    {isAdminUser && (

      <aside
        className="
      flex flex-col items-center bg-default min-h-screen  shrink-0 w-[224px]
      max-sm:hidden
      "
      >
        <div className="flex justify-center m-2 mb-4 p-10">
          <Image src={logo} alt="Logo unicap"/>
        </div>

        <nav className="flex flex-col justify-center items-center space-y-6 mb-80">
          <Link href="/dashboard" className="flex bg-default w-20 h-20 focus:ring focus:ring-white justify-center items-center rounded-md">
            <House className="text-white focus:text-default" size={32} />
          </Link>
          <Link href="/dashboard/admin" className="flex bg-default w-20 h-20 focus:ring focus:ring-white hover:bg-default/40 justify-center items-center rounded-md">
            <UsersThree className="text-white " size={32} />
          </Link>
          <Link href="/dashboard/admin/students" className="flex bg-default w-20 h-20 focus:ring focus:ring-white hover:bg-default/40 justify-center items-center rounded-md">
            <GraduationCap className="text-white" size={32} />
          </Link>
          <Link href="/dashboard/admin/playground" className="flex bg-default w-20 h-20 focus:ring focus:ring-white hover:bg-default/40 justify-center items-center rounded-md">
            <ChatCenteredText className="text-white" size={32} />
          </Link>



        </nav>

        <div className="flex flex-col justify-end space-y-2">
          <Link href="/" className="" onClick={handleLogOut}>
            <SignOut className="text-white" size={32} />
          </Link>
        </div>
      </aside>
    )}
  </>
  );
}
