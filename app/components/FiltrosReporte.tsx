// app/components/FiltrosReporte.tsx
'use client';

import { useState } from "react";

// Definimos la forma de nuestros filtros
interface FiltrosState {
    fechaDesde: string;
    fechaHasta: string;
    tipo: string;
    estado: string;
}

// Definimos los props que recibirá el componente, incluyendo la función para notificar al padre
interface FiltrosReporteProps {
    onGenerarReporte: (filtros: FiltrosState) => void;
}

export default function FiltrosReporte({ onGenerarReporte }: FiltrosReporteProps) {
    const [filtros, setFiltros] = useState<FiltrosState>({
        fechaDesde: '',
        fechaHasta: '',
        tipo: 'Todos',
        estado: 'Todos',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFiltros(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onGenerarReporte(filtros); // Llama a la función del componente padre con los filtros
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Filtros del Reporte</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Desde</label>
                    <input type="date" name="fechaDesde" value={filtros.fechaDesde} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Hasta</label>
                    <input type="date" name="fechaHasta" value={filtros.fechaHasta} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Tipo</label>
                    <select name="tipo" value={filtros.tipo} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                        <option>Todos</option>
                        <option>Institucional</option>
                        <option>Política</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Estado del Proceso</label>
                    <select name="estado" value={filtros.estado} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                        <option>Todos</option>
                        <option value="EN PROCESO">En Proceso</option>
                        <option value="EN TRÁMITE">En Trámite</option>
                        <option value="CONCLUIDO">Concluido</option>
                    </select>
                </div>
            </div>
            <div className="mt-4 text-right">
                <button type="submit" className="bg-green-700 text-white font-bold py-2 px-6 rounded-md hover:bg-green-800">
                    Generar Reporte
                </button>
            </div>
        </form>
    );
}