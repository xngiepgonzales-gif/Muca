import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import FloatingCartButton from "@/components/FloatingCartButton";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] });

export const metadata = {
  title: "Muca - Componentes Electrónicos",
  description: "Tienda online de componentes electrónicos y más. Envíos a todo el Perú. Calidad garantizada.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`} >
        <Toaster />
        <AppContextProvider>
          {children}
          <FloatingCartButton />
        </AppContextProvider>
      </body>
    </html>
  );
}