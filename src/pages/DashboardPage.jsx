import { ArrowRight, UserRoundPlus, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../components/Badge.jsx';

export default function DashboardPage({ data }) {
  const latestGroups = data.groups.slice(0, 4);
  const membersGroup = data.groups[1] || data.groups[0];

  return (
    <div className="space-y-4">
      <section className="grid gap-3 sm:grid-cols-2">
        <QuickAccess to="/groups" icon={UsersRound} title="Administrar grupos" />
        <QuickAccess to={`/groups/${membersGroup.id}`} icon={UserRoundPlus} title="Administrar miembros" />
      </section>

      <section className="rounded-3xl bg-white p-4 shadow-pill md:p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-black text-lbc-ink">Actividad reciente</h2>
          <span className="text-sm font-bold text-slate-400">Últimos registros</span>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {latestGroups.map((group) => (
            <Link
              key={group.id}
              to={`/groups/${group.id}`}
              className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-lbc-blue/30 hover:bg-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-black text-lbc-ink">{group.name}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{group.monthAffiliations} afiliaciones nuevas este mes</p>
                </div>
                <Badge>{group.policyType}</Badge>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm font-bold text-lbc-blue">
                <span>{group.memberCount} miembros</span>
                <span className="inline-flex items-center gap-1">
                  Ver detalle
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function QuickAccess({ to, icon: Icon, title }) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between rounded-3xl bg-white p-4 shadow-pill transition hover:-translate-y-0.5 hover:shadow-soft md:p-5"
    >
      <span className="inline-flex min-w-0 items-center gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-lbc-blue text-white">
          <Icon className="h-6 w-6" />
        </span>
        <span className="truncate text-lg font-black text-lbc-ink">{title}</span>
      </span>
      <ArrowRight className="h-5 w-5 shrink-0 text-lbc-blue transition group-hover:translate-x-0.5" />
    </Link>
  );
}
