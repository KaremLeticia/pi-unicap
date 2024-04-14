import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { RoleProvider } from "@/contexts/RoleContext";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Sistema de Avaliação • UNICAP ",
  description: "",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-ground ${inter.className}`}>
        <UserProvider>
          <RoleProvider>
                      {children}
          </RoleProvider>
        </UserProvider>
      </body>
    </html>
  );
}
