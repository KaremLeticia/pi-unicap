import Image from "next/image"
import logoUnicap from '../assets/logo-branca-unicap 1.png'

export default function AssLayout({children}: any){
  return (
    <main>
      <header className="bg-default w-screen flex justify-center p-6">
        <Image src={logoUnicap} alt="logo unicap"/>
      </header>
      {children}
    </main>
  )
}