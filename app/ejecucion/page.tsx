// app/ejecucion/page.tsx
'use client'; // Necesitamos que sea un componente de cliente para usar estado y efectos

import { useState, useEffect } from 'react';
import FormEjecutadas from '../components/FormEjecutadas';
import TablaEjecutadas, { ActividadEjecutada } from '../components/TablaEjecutadas';
import { supabase } from '../../lib/supabaseClient';

export default function EjecucionPage() {
  const [actividades, setActividades] = useState<ActividadEjecutada[]>([]);
  const [loading, setLoading] = useState(true);

  // FIX: Esta función buscará los datos cuando la página cargue o cuando se le pida.
  const fetchActividades = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('actividades_ejecutadas')
      .select('id, fecha, proceso_actividad, lugar, responsable_nombre, proceso_administrativo_status, cantidad_participantes')
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error fetching data:', error);
      setActividades([]);
    } else {
      setActividades(data || []);
    }
    setLoading(false);
  };

  // Pedimos los datos solo la primera vez que la página carga.
  useEffect(() => {
    fetchActividades();
  }, []);

  // FIX: Esta es la función que pasaremos al formulario.
  // Cuando el formulario termine, llamará a esta función para recargar los datos.
  const handleActivityAdded = () => {
    fetchActividades();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Registro de Actividades Ejecutadas</h1>
      
      {/* Le pasamos la función al formulario */}
      <FormEjecutadas onActivityAdded={handleActivityAdded} />
      
      {/* Le pasamos los datos y el estado de carga a la tabla */}
      <TablaEjecutadas data={actividades} loading={loading} />
    </div>
  );
}