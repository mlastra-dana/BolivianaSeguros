import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { BarChart3, LayoutDashboard, LogOut, Menu, Users, UsersRound, X } from 'lucide-react';
import { useState } from 'react';
import Button from './Button.jsx';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/groups', label: 'Grupos', icon: UsersRound },
  { to: '/groups', label: 'Integrantes', icon: Users },
  { to: '/reports', label: 'Reportes', icon: BarChart3 },
];

const titles = {
  '/dashboard': 'Dashboard',
  '/groups': 'Grupos',
  '/reports': 'Reportes',
};

export default function AppLayout({ onLogout }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const sectionTitle = location.pathname.startsWith('/groups/') ? 'Detalle de grupo' : titles[location.pathname] || 'Plataforma';

  return (
    <div className="min-h-screen bg-lbc-gray">
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
          <Link to="/dashboard" className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-wide text-lbc-red">La Boliviana Ciacruz</p>
            <p className="truncate text-base font-bold text-lbc-blue">Seguros para toda la vida</p>
          </Link>
          <button className="rounded-md p-2 text-slate-500 lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={`${item.label}-${item.to}`}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition ${
                  isActive && item.label !== 'Integrantes'
                    ? 'bg-red-50 text-lbc-red'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-lbc-blue'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 p-4">
          <div className="mb-4 rounded-lg bg-slate-50 p-3">
            <p className="text-sm font-bold text-lbc-blue">Administrador LBC</p>
            <p className="text-xs text-slate-500">admin@lbc.bo</p>
          </div>
          <Button variant="outline" className="w-full" onClick={onLogout}>
            <LogOut className="h-4 w-4" />
            Salir
          </Button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button className="rounded-md border border-slate-200 p-2 text-lbc-blue lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Gestion centralizada de comunidades asegurables</p>
              <h1 className="text-xl font-bold text-lbc-blue md:text-2xl">{sectionTitle}</h1>
            </div>
          </div>
          <div className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 md:block">
            Administrador LBC
          </div>
        </header>
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
