// app/components/TablaEjecutadas.tsx
'use client';

// FIX: Ya no necesitamos useState ni useEffect aquí

export interface ActividadEjecutada {
  id: string;
  fecha: string;
  proceso_actividad: string;
  lugar: string | null;
  responsable_nombre: string | null;
  proceso_administrativo_status: string | null;
  cantidad_participantes: number | null;
}

// FIX: Definimos las props que el componente recibirá desde la página padre.
interface TablaEjecutadasProps {
  data: ActividadEjecutada[];
  loading: boolean;
}

export default function TablaEjecutadas({ data: actividades, loading }: TablaEjecutadasProps) {
  
  // FIX: Ya no hay una función fetchActividades. La lógica ahora vive en la página.
  
  if (loading) return <p className="text-center mt-8">Cargando actividades...</p>;

  const getStatusColor = (status: string | null) => {
    // ... (esta función no cambia) ...
    switch (status) {
      case 'CONCLUIDO': return 'bg-green-100 text-green-800';
      case 'EN TRÁMITE': return 'bg-yellow-100 text-yellow-800';
      case 'EN PROCESO': default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Historial de Actividades Ejecutadas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm">
          {/* ... (la estructura de la tabla no cambia) ... */}
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
            {actividades.length === 0 ? (
                <tr><td colSpan={5} className="py-4 px-4 text-center text-gray-500">No hay actividades ejecutadas para mostrar.</td></tr>
            ) : (
                actividades.map((act) => (
                  <tr key={act.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4">{act.fecha}</td>
                    <td className="py-2 px-4">{act.proceso_actividad}</td>
                    <td className="py-2 px-4">{act.responsable_nombre}</td>
                    <td className="py-2 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full font-semibold text-xs ${getStatusColor(act.proceso_administrativo_status)}`}>
                        {act.proceso_administrativo_status?.replace('_', ' ')}
                      </span>
                    </td>
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