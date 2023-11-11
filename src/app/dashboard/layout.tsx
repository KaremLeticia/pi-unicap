"use client"
import { MobileNavBar } from '@/app/components/MobileNavBar';
import Sidebar from '@/app/components/Sidebar';

export default function Layout({children}: any) {
  const SideBarWidth = 224;
  const SidesMargin = 48;
  const MobileSidesMargin = 12;

  return (
    <>
      <div className="flex max-sm:flex-col bg-bground">
        <MobileNavBar />
        <Sidebar />

        <main
          className={`
          p-5
          w-full
          max-w-6xl my-12 mx-auto
          max-sm:w-[calc(100%_-_${MobileSidesMargin * 2}px)] max-sm:mt-0
          min-[640px]:w-[calc(100%_-_${SidesMargin * 2}px_-_${SideBarWidth}px)]
          `}
        >
          {children}
        </main>
      </div>
    </>
  );
}