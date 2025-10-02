// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer'; // 1. IMPORTAMOS EL FOOTER

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistema de Gestión de Actividades',
  description: 'Aplicación para planificar y reportar actividades.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />

          {/* 2. ENVOLVEMOS EL CONTENIDO PRINCIPAL Y EL FOOTER */}
          <div className="flex flex-col flex-grow">
            <main className="flex-grow p-8 bg-gray-100">
              {children} {/* El contenido de la página se renderiza aquí */}
            </main>

            {/* 3. AÑADIMOS EL COMPONENTE FOOTER AL FINAL */}
            <Footer />
          </div>
          
        </div>
      </body>
    </html>
  );
}