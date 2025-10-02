// app/components/TablaEjecutadas.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

// Definimos la forma de una actividad ejecutada
export interface ActividadEjecutada {
  id: string;
  fecha: string;
  proceso_actividad: string;
  lugar: string | null;
  responsable_nombre: string | null;
  proceso_administrativo_status: string | null;
  cantidad_participantes: number | null;
}

export default function TablaEjecutadas() {
  const [actividades, setActividades] = useState<ActividadEjecutada[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActividades = async () => {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('actividades_ejecutadas')
        .select('id, fecha, proceso_actividad, lugar, responsable_nombre, proceso_administrativo_status, cantidad_participantes')
        .order('fecha', { ascending: false });

      if (fetchError) {
        console.error('Error fetching data:', fetchError);
        setError(`No se pudieron cargar las actividades ejecutadas: ${fetchError.message}`);
      } else {
        setActividades(data || []);
      }
      setLoading(false);
    };

    fetchActividades();
  }, []);

  if (loading) return <p className="text-center mt-8">Cargando actividades...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

  // Función para dar estilo al status
  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'CONCLUIDO':
        return 'bg-green-100 text-green-800';
      case 'EN TRÁMITE':
        return 'bg-yellow-100 text-yellow-800';
      case 'EN PROCESO':
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };


  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Historial de Actividades Ejecutadas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm">
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
                <tr>
                    <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                        No hay actividades ejecutadas para mostrar.
                    </td>
                </tr>
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