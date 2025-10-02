// app/page.tsx

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-700">
          ¡Bienvenido al Sistema de Gestión de Actividades!
        </p>
        <p className="mt-2 text-gray-600">
          Utiliza el menú de la izquierda para navegar entre las secciones de Planificación, Ejecución y Reportes.
        </p>
        {/* Futuro: Aquí podríamos mostrar estadísticas rápidas, como "5 actividades planificadas para esta semana". */}
      </div>
    </div>
  );
}