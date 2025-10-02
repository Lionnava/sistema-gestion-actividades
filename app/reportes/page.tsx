// app/reportes/page.tsx
'use client';
import { useState } from "react";
import FiltrosReporte from "../components/FiltrosReporte";
import ResultadosReporte from "../components/ResultadosReporte";
import { supabase } from "../../lib/supabaseClient";
import { ActividadEjecutada } from "../components/TablaEjecutadas";

// Definimos la forma de los filtros aquí para que sea clara
interface FiltrosState {
    fechaDesde: string;
    fechaHasta: string;
    tipo: string;
    estado: string;
}

export default function ReportesPage() {
    const [resultados, setResultados] = useState<ActividadEjecutada[]>([]);
    const [loading, setLoading] = useState(false);

    // Corregimos el 'any' con el tipo específico 'FiltrosState'
    const handleGenerarReporte = async (filtros: FiltrosState) => {
        setLoading(true);
        
        let query = supabase
            .from('actividades_ejecutadas')
            .select('id, fecha, proceso_actividad, lugar, responsable_nombre, proceso_administrativo_status, cantidad_participantes');

        if (filtros.fechaDesde) {
            query = query.gte('fecha', filtros.fechaDesde);
        }
        if (filtros.fechaHasta) {
            query = query.lte('fecha', filtros.fechaHasta);
        }
        if (filtros.tipo && filtros.tipo !== 'Todos') {
            query = query.eq('tipo', filtros.tipo);
        }
        if (filtros.estado && filtros.estado !== 'Todos') {
            query = query.eq('proceso_administrativo_status', filtros.estado);
        }

        const { data, error } = await query.order('fecha', { ascending: false });

        if (error) {
            console.error("Error al generar reporte:", error);
            alert("Hubo un error al generar el reporte.");
        } else {
            setResultados(data || []);
        }

        setLoading(false);
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Módulo de Reportes</h1>
            
            <FiltrosReporte onGenerarReporte={handleGenerarReporte} />
            
            <ResultadosReporte data={resultados} loading={loading} />
        </div>
    );
}