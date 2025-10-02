// app/ejecucion/page.tsx
import FormEjecutadas from '../components/FormEjecutadas';
import TablaEjecutadas from '../components/TablaEjecutadas'; // Importamos la tabla

export default function EjecucionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Registro de Actividades Ejecutadas</h1>
      <FormEjecutadas />
      <TablaEjecutadas /> {/* Añadimos la tabla */}
    </div>
  );
}