"use client"
import logo from '../assets/logo-branca-unicap 1.png'
import Image from 'next/image';


export default function Layout({ children }: any) {
  return (
    <>
      <header className="bg-default w-screen h-24 sm:h-20 md:h-24 lg:h-28 xl:h-32 flex  justify-center">
      <div className="flex justify-center mb-8 mt-8">
          <Image src={logo} alt="Logo unicap" className='p-1 self-center' />
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