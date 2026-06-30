import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { BarChart3, LayoutDashboard, LogOut, Menu, UsersRound, X } from 'lucide-react';
import { useState } from 'react';
import BrandMark from './BrandMark.jsx';
import Button from './Button.jsx';

const navItems = [
  { to: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { to: '/groups', label: 'Grupos', icon: UsersRound },
  { to: '/reports', label: 'Reportes', icon: BarChart3 },
];

const titles = {
  '/dashboard': 'Inicio',
  '/groups': 'Grupos',
  '/reports': 'Reportes',
};

export default function AppLayout({ onLogout }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const sectionTitle = location.pathname.startsWith('/groups/') ? 'Detalle de grupo' : titles[location.pathname] || 'Plataforma';

  return (
    <div className="min-h-screen bg-lbc-gray text-lbc-ink">
      <aside className={`fixed inset-y-0 left-0 z-40 w-56 bg-lbc-blue transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <Link to="/dashboard" className="min-w-0">
            <BrandMark inverse size="sm" />
          </Link>
          <button className="rounded-full p-2 text-white lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1.5 p-3">
          {navItems.map((item) => (
            <NavLink
              key={`${item.label}-${item.to}`}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                  isActive
                    ? 'bg-white text-lbc-ink shadow-sm'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-3">
          <div className="mb-3 rounded-2xl bg-white/10 p-3">
            <p className="text-sm font-bold text-white">Administrador</p>
            <p className="text-xs text-white/65">administrador</p>
          </div>
          <Button variant="outline" className="w-full" onClick={onLogout}>
            <LogOut className="h-4 w-4" />
            Salir
          </Button>
        </div>
      </aside>

      <div className="min-w-0 lg:pl-56">
        <header className="sticky top-0 z-30 px-3 py-3 lg:hidden">
          <div className="flex min-h-12 items-center justify-between rounded-full bg-white px-4 shadow-pill backdrop-blur">
            <div className="flex min-w-0 items-center gap-3">
              <button className="rounded-full border border-slate-200 p-2 text-lbc-blue" onClick={() => setOpen(true)} aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="truncate text-lg font-black text-lbc-ink">{sectionTitle}</h1>
            </div>
          </div>
        </header>
        <main className="min-w-0 p-3 pt-3 md:p-4 lg:pt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
