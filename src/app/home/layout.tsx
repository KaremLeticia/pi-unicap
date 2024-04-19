"use client"
import logo from '../assets/navbar1.svg'
import Image from 'next/image';


export default function Layout({ children }: any) {
  return (
    <>
      <header className="bg-default w-full h-24 sm:h-20 md:h-24 lg:h-28 xl:h-32 flex justify-center">
      <div className="flex justify-center p-2">
          <Image src={logo} alt="Logo unicap" />
        </div>
      </header>

      <div className="flex max-sm:flex-col bg-muted/40">
        <main
          className={`
          p-5
          w-full
          max-w-6xl my-12 mx-auto
          `}
        >
          {children}
        </main>
      </div>
    </>
  );
}