const styles = {
  Activo: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Inactivo: 'bg-slate-100 text-slate-600 ring-slate-200',
  Registrado: 'bg-sky-50 text-sky-700 ring-sky-100',
  Contactado: 'bg-amber-50 text-amber-700 ring-amber-100',
  'En seguimiento': 'bg-indigo-50 text-indigo-700 ring-indigo-100',
  Afiliado: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  'Seguro de Hogar': 'bg-blue-50 text-blue-700 ring-blue-100',
  'Seguro de Automovil': 'bg-red-50 text-red-700 ring-red-100',
  'Seguro de Vida': 'bg-purple-50 text-purple-700 ring-purple-100',
  'Seguro de Accidentes': 'bg-orange-50 text-orange-700 ring-orange-100',
};

export default function Badge({ children }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${styles[children] || 'bg-slate-50 text-slate-700 ring-slate-100'}`}>
      {children}
    </span>
  );
}
