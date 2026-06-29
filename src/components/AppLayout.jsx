import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { BarChart3, LayoutDashboard, LogOut, Menu, Users, UsersRound, X } from 'lucide-react';
import { useState } from 'react';
import BrandMark from './BrandMark.jsx';
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
    <div className="min-h-screen bg-lbc-gray text-lbc-ink">
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-lbc-blue transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-24 items-center justify-between border-b border-white/10 px-5">
          <Link to="/dashboard" className="min-w-0">
            <BrandMark inverse compact />
          </Link>
          <button className="rounded-full p-2 text-white lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-2 p-4">
          {navItems.map((item) => (
            <NavLink
              key={`${item.label}-${item.to}`}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-full px-4 py-3 text-sm font-bold transition ${
                  isActive && item.label !== 'Integrantes'
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
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
          <div className="mb-4 rounded-2xl bg-white/10 p-4">
            <p className="text-sm font-bold text-white">Administrador LBC</p>
            <p className="text-xs text-white/65">admin@lbc.bo</p>
          </div>
          <Button variant="outline" className="w-full" onClick={onLogout}>
            <LogOut className="h-4 w-4" />
            Salir
          </Button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 px-4 py-4 md:px-8">
          <div className="flex min-h-16 items-center justify-between rounded-full bg-white px-4 shadow-pill backdrop-blur md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button className="rounded-full border border-slate-200 p-2 text-lbc-blue lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs font-bold uppercase text-lbc-blue/60">Gestion centralizada de comunidades asegurables</p>
              <h1 className="text-xl font-black text-lbc-ink md:text-2xl">{sectionTitle}</h1>
            </div>
          </div>
          <div className="hidden rounded-full px-4 py-2 text-sm font-bold text-lbc-ink md:block">
            Administrador LBC
          </div>
          </div>
        </header>
        <main className="p-4 pt-2 md:p-8 md:pt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
