'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface PlanificacionFormState {
  proceso_actividad: string;
  tipo: string;
  fecha: string;
  hora: string;
  responsable: string;
  lugar: string;
  observacion: string;
}

const initialState: PlanificacionFormState = {
  proceso_actividad: '',
  tipo: 'Institucional',
  fecha: '',
  hora: '',
  responsable: '',
  lugar: '',
  observacion: '',
};

export default function FormPlanificacion() {
  const [formData, setFormData] = useState<PlanificacionFormState>(initialState);
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('Guardando...');

    const { error } = await supabase
      .from('actividades_planificadas')
      .insert([formData]);

    if (error) {
      console.error('Error al guardar:', error);
      setMessage(`Error al guardar la actividad: ${error.message}`);
    } else {
      setMessage('¡Actividad planificada guardada con éxito!');
      setFormData(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-gray-700">Planificar Nueva Actividad</h2>
      <div>
        <label className="block text-sm font-medium text-gray-600">Proceso / Actividad</label>
        <input type="text" name="proceso_actividad" value={formData.proceso_actividad} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-gray-600">Tipo</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option>Institucional</option>
                <option>Política</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600">Responsable</label>
            <input type="text" name="responsable" value={formData.responsable} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-gray-600">Fecha</label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600">Hora</label>
            <input type="time" name="hora" value={formData.hora} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Lugar</label>
        <input type="text" name="lugar" value={formData.lugar} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Observación</label>
        <textarea name="observacion" value={formData.observacion} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
      </div>
      <button type="submit" className="w-full bg-red-700 text-white font-bold py-2 px-4 rounded-md hover:bg-red-800">
        Guardar Planificación
      </button>
      {message && <p className="text-center mt-4 p-2 bg-gray-100 rounded-md text-sm font-medium">{message}</p>}
    </form>
  );
}