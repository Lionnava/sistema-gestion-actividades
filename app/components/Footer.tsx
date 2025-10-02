export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-200 text-center p-4 border-t border-gray-300">
      <p className="text-sm text-gray-600">
        Sistema desarrollado por <strong>LionellNava21</strong>.
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Contacto: lionnava@gmail.com | Teléfono: [+412 0945594]
      </p>
      <p className="text-xs text-gray-500 mt-1">
        © {currentYear} Todos los derechos reservados.
      </p>
    </footer>
  );
}