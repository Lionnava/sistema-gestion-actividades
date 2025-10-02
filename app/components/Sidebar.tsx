'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FilePlus, CheckSquare, BarChart2 } from 'lucide-react';

const navLinks = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Planificación', href: '/planificacion', icon: FilePlus },
  { name: 'Ejecución', href: '/ejecucion', icon: CheckSquare },
  { name: 'Reportes', href: '/reportes', icon: BarChart2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white p-4 flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold">SGA</h2>
        <p className="text-sm text-gray-400">Gestión de Actividades</p>
      </div>
      <nav className='flex-grow'>
        <ul>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center p-3 my-1 rounded-md transition-colors ${
                    isActive
                      ? 'bg-red-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <link.icon className="w-5 h-5 mr-3" />
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}