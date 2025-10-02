// app/components/FormPlanificacion.tsx
'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

// PASO 1: Definir la "forma" de nuestros datos con una interfaz.
// Esto le dice a TypeScript qué campos tiene nuestro formulario y de qué tipo son.
interface PlanificacionFormState {
  proceso_actividad: string;
  tipo: string;
  fecha: string;
  hora: string;
  responsable: string;
  lugar: string;
  observacion: string;
}

export default function FormPlanificacion() {
  // PASO 2: Le decimos a useState que usará la "forma" que definimos.
  const [formData, setFormData] = useState<PlanificacionFormState>({
    proceso_actividad: '',
    tipo: 'Institucional',
    fecha: '',
    hora: '',
    responsable: '',
    lugar: '',
    observacion: '',
  });
  const [message, setMessage] = useState<string>('');

  // PASO 3: Añadimos tipos a los eventos del formulario.
  // Esto nos da autocompletado para 'e.target.name', 'e.target.value', etc.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    // Gracias a TypeScript, Supabase también puede inferir los tipos aquí.
    const { error } = await supabase
      .from('actividades_planificadas')
      .insert([formData]);

    if (error) {
      console.error('Error al guardar:', error);
      setMessage(`Error al guardar la actividad: ${error.message}`);
    } else {
      setMessage('¡Actividad planificada guardada con éxito!');
      // Resetear el formulario
      setFormData({
        proceso_actividad: '',
        tipo: 'Institucional',
        fecha: '',
        hora: '',
        responsable: '',
        lugar: '',
        observacion: '',
      });
    }
  };

  return (
    // El JSX (la parte HTML) no cambia en absoluto.
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-700">Planificar Nueva Actividad</h2>
      
      <div>
        <label htmlFor="proceso_actividad" className="block text-sm font-medium text-gray-600">Proceso / Actividad</label>
        <input type="text" name="proceso_actividad" value={formData.proceso_actividad} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-600">Tipo</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option>Institucional</option>
                <option>Política</option>
            </select>
        </div>
        <div>
            <label htmlFor="responsable" className="block text-sm font-medium text-gray-600">Responsable</label>
            <input type="text" name="responsable" value={formData.responsable} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-600">Fecha</label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div>
            <label htmlFor="hora" className="block text-sm font-medium text-gray-600">Hora</label>
            <input type="time" name="hora" value={formData.hora} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
      </div>

      <div>
        <label htmlFor="lugar" className="block text-sm font-medium text-gray-600">Lugar</label>
        <input type="text" name="lugar" value={formData.lugar} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
      </div>

      <div>
        <label htmlFor="observacion" className="block text-sm font-medium text-gray-600">Observación</label>
        <textarea name="observacion" value={formData.observacion} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
      </div>

      <button type="submit" className="w-full bg-red-700 text-white font-bold py-2 px-4 rounded-md hover:bg-red-800">
        Guardar Planificación
      </button>

      {message && <p className="text-center mt-4 text-sm font-medium">{message}</p>}
    </form>
  );
}