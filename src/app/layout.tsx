import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserProvider";
import { AuthProvider } from "@/contexts/AuthContext";

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
          <AuthProvider>
                      {children}
          </AuthProvider>
        </UserProvider>
      </body>
    </html>
  );
}
