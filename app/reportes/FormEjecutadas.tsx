// app/reportes/page.tsx
'use client'
import { useState } from "react";

// (Aquí importaremos los componentes de Filtros y Resultados que crearemos a continuación)

export default function ReportesPage() {
    // Aquí vivirá la lógica para buscar datos y pasarlos a la tabla de resultados
    const handleGenerarReporte = (filtros: any) => {
        console.log("Generando reporte con los filtros:", filtros);
        // Próximamente: Llamar a Supabase con estos filtros
    }

    return (
        <main className="bg-gray-100 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Módulo de Reportes
                </h1>

                {/* 1. Componente de Filtros (Lo crearemos ahora) */}
                {/* <FiltrosReporte onGenerarReporte={handleGenerarReporte} /> */}

                {/* 2. Componente con los Resultados y el botón de exportar (Lo crearemos después) */}
                {/* <ResultadosReporte data={...} /> */}

                <p className="text-center text-gray-500 mt-8">
                    Módulo de reportes en construcción.
                </p>
            </div>
        </main>
    );
}