// app/components/FormEjecutadas.tsx
'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

// Definimos la "forma" de los datos del formulario de ejecución
interface EjecutadasFormState {
  proceso_actividad: string;
  tipo: string;
  fecha: string;
  hora: string;
  lugar: string;
  responsable_area: string;
  responsable_nombre: string;
  responsable_telefono: string;
  proceso_administrativo_status: 'EN PROCESO' | 'EN TRÁMITE' | 'CONCLUIDO';
  acuerdos_desarrollos: string;
  entes_participantes: string;
  cantidad_participantes: number | ''; // Puede ser número o un string vacío al inicio
}

const initialState: EjecutadasFormState = {
  proceso_actividad: '',
  tipo: 'Institucional',
  fecha: '',
  hora: '',
  lugar: '',
  responsable_area: '',
  responsable_nombre: '',
  responsable_telefono: '',
  proceso_administrativo_status: 'EN PROCESO',
  acuerdos_desarrollos: '',
  entes_participantes: '',
  cantidad_participantes: '',
};

export default function FormEjecutadas() {
  const [formData, setFormData] = useState<EjecutadasFormState>(initialState);
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Manejar el campo de número
    const val = type === 'number' ? (value === '' ? '' : parseInt(value, 10)) : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    const { error } = await supabase
      .from('actividades_ejecutadas')
      .insert([formData]);

    if (error) {
      console.error('Error al guardar:', error);
      setMessage(`Error al guardar la actividad: ${error.message}`);
    } else {
      setMessage('¡Actividad ejecutada guardada con éxito!');
      setFormData(initialState); // Limpiar el formulario
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-700">Registrar Actividad Ejecutada</h2>

      {/* ... (resto de los campos del formulario) ... */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna Izquierda */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Proceso / Actividad</label>
            <input type="text" name="proceso_actividad" value={formData.proceso_actividad} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Fecha</label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Lugar</label>
            <input type="text" name="lugar" value={formData.lugar} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Responsable (Área)</label>
            <input type="text" name="responsable_area" value={formData.responsable_area} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Responsable (Teléfono)</label>
            <input type="tel" name="responsable_telefono" value={formData.responsable_telefono} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Acuerdos y Desarrollos</label>
            <textarea name="acuerdos_desarrollos" value={formData.acuerdos_desarrollos} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Tipo</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Institucional</option>
              <option>Política</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Hora</label>
            <input type="time" name="hora" value={formData.hora} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Status del Proceso</label>
            <select name="proceso_administrativo_status" value={formData.proceso_administrativo_status} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="EN PROCESO">En Proceso</option>
              <option value="EN TRÁMITE">En Trámite</option>
              <option value="CONCLUIDO">Concluido</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Responsable (Nombre y Apellido)</label>
            <input type="text" name="responsable_nombre" value={formData.responsable_nombre} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Cantidad de Participantes</label>
            <input type="number" name="cantidad_participantes" value={formData.cantidad_participantes} onChange={handleChange} min="0" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Entes / Instituciones / Comunidades</label>
            <textarea name="entes_participantes" value={formData.entes_participantes} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
          </div>
        </div>
      </div>
      
      <button type="submit" className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-800 mt-6">
        Guardar Ejecución
      </button>

      {message && <p className="text-center mt-4 text-sm font-medium">{message}</p>}
    </form>
  );
}