// app/components/ResultadosReporte.tsx
'use client';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ActividadEjecutada } from './TablaEjecutadas'; // Reutilizamos la interfaz
import { Download } from 'lucide-react';

interface ResultadosReporteProps {
  data: ActividadEjecutada[];
  loading: boolean;
}

export default function ResultadosReporte({ data, loading }: ResultadosReporteProps) {
 const handleExportPDF = () => {
     const doc = new jsPDF();
     
     doc.setFontSize(18);
     doc.text("Reporte de Actividades Ejecutadas", 14, 22);

     autoTable(doc, {
         startY: 30,
         head: [['Fecha', 'Actividad', 'Responsable', 'Status', 'Participantes']],
         body: data.map(item => [
             item.fecha,
             item.proceso_actividad,
             item.responsable_nombre ?? 'N/A',
             item.proceso_administrativo_status ?? 'N/A',
             item.cantidad_participantes?.toString() ?? '0'
         ]),
         headStyles: { fillColor: [189, 3, 3] } // Color rojo de la cabecera
     });

     doc.save('reporte_actividades.pdf');
 };

  if (loading) {
    return <p className="text-center mt-8">Generando reporte...</p>;
  }

  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Resultados</h2>
        {data.length > 0 && (
         <button 
             onClick={handleExportPDF}
             className="bg-red-700 text-white font-bold py-2 px-4 rounded-md hover:bg-red-800 flex items-center gap-2"
         >
             <Download size={18} />
             Exportar a PDF
         </button>
        )}
      </div>
      <div className="overflow-x-auto">
         {/* Aquí reutilizamos la tabla de ejecutadas para mostrar los resultados */}
         {/* O creamos una nueva tabla específica para el reporte */}
         <table className="min-w-full bg-white text-sm">
             {/* ... (puedes copiar la estructura de la tabla de TablaEjecutadas.tsx) ... */}
             <thead className="bg-gray-700 text-white">
                 <tr>
                 <th className="py-2 px-4 text-left">Fecha</th>
                 <th className="py-2 px-4 text-left">Actividad</th>
                 <th className="py-2 px-4 text-left">Responsable</th>
                 <th className="py-2 px-4 text-center">Status</th>
                 <th className="py-2 px-4 text-center">Participantes</th>
                 </tr>
             </thead>
             <tbody className="divide-y divide-gray-200">
                 {data.length === 0 ? (
                     <tr>
                         <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                             No hay resultados para los filtros seleccionados.
                         </td>
                     </tr>
                 ) : (
                     data.map((act) => (
                     <tr key={act.id} className="hover:bg-gray-50">
                         <td className="py-2 px-4">{act.fecha}</td>
                         <td className="py-2 px-4">{act.proceso_actividad}</td>
                         <td className="py-2 px-4">{act.responsable_nombre}</td>
                         <td className="py-2 px-4 text-center">{act.proceso_administrativo_status}</td>
                         <td className="py-2 px-4 text-center">{act.cantidad_participantes ?? 'N/A'}</td>
                     </tr>
                     ))
                 )}
             </tbody>
         </table>
      </div>
    </div>
  );
}