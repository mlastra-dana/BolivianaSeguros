import { Activity, Car, HeartPulse, Home, ShieldCheck, UserCheck, UsersRound } from 'lucide-react';
import Badge from '../components/Badge.jsx';
import StatCard from '../components/StatCard.jsx';
import { formatNumber } from '../utils/format.js';

export default function DashboardPage({ data }) {
  const activeGroups = data.groups.filter((group) => group.status === 'Activo');
  const totalMembers = data.groups.reduce((sum, group) => sum + group.memberCount, 0);
  const policyCount = (type) => data.groups.filter((group) => group.policyType === type).length;
  const monthAffiliations = data.groups.reduce((sum, group) => sum + group.monthAffiliations, 0);

  return (
    <div className="space-y-8">
      <section className="rounded-lg bg-lbc-blue p-6 text-white shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wide text-red-200">Demo comercial LBC</p>
        <h2 className="mt-2 text-3xl font-bold">Gestion centralizada de comunidades asegurables</h2>
        <p className="mt-3 max-w-3xl text-blue-100">Administra grupos, afiliaciones digitales por QR y oportunidades comerciales asociadas a un unico producto asegurador por comunidad.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={UsersRound} label="Total de grupos activos" value={activeGroups.length} detail="Canales comerciales habilitados" />
        <StatCard icon={UserCheck} label="Total de integrantes" value={formatNumber(totalMembers)} detail="Personas afiliadas a grupos" tone="blue" />
        <StatCard icon={Home} label="Polizas de hogar" value={policyCount('Seguro de Hogar')} detail="Grupos con producto hogar" tone="green" />
        <StatCard icon={Car} label="Polizas de auto" value={policyCount('Seguro de Automovil')} detail="Comunidades de conductores" tone="amber" />
        <StatCard icon={HeartPulse} label="Polizas de vida" value={policyCount('Seguro de Vida')} detail="Programas familiares y empresas" />
        <StatCard icon={Activity} label="Nuevas afiliaciones del mes" value={monthAffiliations} detail="Registros digitales recientes" tone="blue" />
        <StatCard icon={ShieldCheck} label="Corredores activos" value={data.brokers.length} detail="Responsables comerciales" tone="green" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
          <h3 className="text-xl font-bold text-lbc-blue">Grupos por volumen de integrantes</h3>
          <div className="mt-6 space-y-4">
            {data.groups.map((group) => (
              <div key={group.id}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-semibold text-slate-700">{group.name}</span>
                  <span className="text-slate-500">{group.memberCount}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-lbc-red" style={{ width: `${Math.max(12, (group.memberCount / 126) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
          <h3 className="text-xl font-bold text-lbc-blue">Actividad reciente</h3>
          <div className="mt-5 space-y-4">
            {data.groups.slice(0, 4).map((group) => (
              <div key={group.id} className="rounded-md border border-slate-100 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-lbc-blue">{group.name}</p>
                  <Badge>{group.policyType}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-500">{group.monthAffiliations} nuevas afiliaciones registradas este mes.</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
