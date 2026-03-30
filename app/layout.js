import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import FloatingCartButton from "@/components/FloatingCartButton";
import AuroraBackground from "@/components/AuroraBackground";
import FloatingBrand from "@/components/FloatingBrand"
import FloatingBrandcopy from "@/components/FloatingBrandcopy"
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300","400","500"]
});

export const metadata = {
  title: "Muca - Componentes Electrónicos",
  description: "Tienda online de componentes electrónicos"
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${outfit.className} relative`}>

        {/* BACKGROUND */}
        <AuroraBackground />

        {/* CONTENIDO */}
         
        <div className="relative z-10">

          <Toaster />
            <FloatingBrand />
            <FloatingBrandcopy />
          <AppContextProvider>

            {children}
            
   
            
            <FloatingCartButton />

          </AppContextProvider>

        </div>

      </body>
    </html>
  );
}