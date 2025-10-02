// app/planificacion/page.tsx
import FormPlanificacion from '../components/FormPlanificacion';
import TablaPlanificadas from '../components/TablaPlanificadas';

export default function PlanificacionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Planificación de Actividades</h1>
      <FormPlanificacion />
      <TablaPlanificadas />
    </div>
  );
}