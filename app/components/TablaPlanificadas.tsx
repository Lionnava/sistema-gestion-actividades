// app/components/TablaPlanificadas.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

// PASO 1: Definir la forma de una actividad planificada.
// Los nombres de las propiedades deben coincidir EXACTAMENTE con los nombres de las columnas en tu tabla de Supabase.
// 'string | null' significa que el valor puede ser un texto o puede no existir (ser nulo).
export interface ActividadPlanificada {
  id: string; // Supabase usa uuid, que es un string
  created_at: string;
  proceso_actividad: string;
  tipo: string | null;
  fecha: string; // El tipo 'date' de SQL llega como string
  hora: string | null;
  responsable: string | null;
  lugar: string | null;
  observacion: string | null;
  direccion_id: string | null;
}

export default function TablaPlanificadas() {
  // PASO 2: Le decimos a useState que contendrá un array de 'ActividadPlanificada'.
  const [actividades, setActividades] = useState<ActividadPlanificada[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActividades = async () => {
      setLoading(true);
      setError(null);

      // PASO 3: Al hacer la consulta, le indicamos a Supabase qué tipo de datos esperamos.
      // Esto le da a 'data' el tipo 'ActividadPlanificada[] | null'.
      const { data, error: fetchError } = await supabase
        .from('actividades_planificadas')
        .select('*')
        .order('fecha', { ascending: false });

      if (fetchError) {
        console.error('Error fetching data:', fetchError);
        setError(`No se pudieron cargar las actividades: ${fetchError.message}`);
      } else {
        // Si 'data' no es nulo, lo asignamos. Si es nulo, asignamos un array vacío.
        setActividades(data || []);
      }
      setLoading(false);
    };

    fetchActividades();
  }, []);

  if (loading) return <p className="text-center mt-8">Cargando actividades...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Actividades Planificadas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-red-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Fecha</th>
              <th className="py-2 px-4 text-left">Actividad</th>
              <th className="py-2 px-4 text-left">Tipo</th>
              <th className="py-2 px-4 text-left">Responsable</th>
              <th className="py-2 px-4 text-left">Lugar</th>
              {/* Podríamos añadir un campo de acciones aquí en el futuro */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {actividades.length === 0 ? (
                <tr>
                    <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                        No hay actividades planificadas para mostrar.
                    </td>
                </tr>
            ) : (
                actividades.map((act) => (
                  <tr key={act.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4">{act.fecha}</td>
                    <td className="py-2 px-4">{act.proceso_actividad}</td>
                    <td className="py-2 px-4">{act.tipo}</td>
                    <td className="py-2 px-4">{act.responsable}</td>
                    <td className="py-2 px-4">{act.lugar}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}