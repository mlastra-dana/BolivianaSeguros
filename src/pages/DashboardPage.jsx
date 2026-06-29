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
      <section className="relative overflow-hidden rounded-3xl bg-lbc-blue p-8 text-white shadow-soft md:p-10">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,26,45,0.12),rgba(20,26,45,0.42))]" />
        <div className="relative">
        <p className="text-sm font-bold uppercase tracking-wide text-white/70">Demo comercial LBC</p>
        <h2 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-5xl">Gestion centralizada de comunidades asegurables</h2>
        <div className="mt-5 h-1.5 w-28 rounded-full bg-lbc-green" />
        <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-white/75">Administra grupos, afiliaciones digitales por QR y oportunidades comerciales asociadas a un unico producto asegurador por comunidad.</p>
        </div>
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
        <article className="rounded-3xl bg-white p-6 shadow-pill">
          <h3 className="text-2xl font-black text-lbc-ink">Grupos por volumen de integrantes</h3>
          <div className="mt-6 space-y-4">
            {data.groups.map((group) => (
              <div key={group.id}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-bold text-lbc-ink">{group.name}</span>
                  <span className="text-slate-500">{group.memberCount}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-lbc-green" style={{ width: `${Math.max(12, (group.memberCount / 126) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-3xl bg-white p-6 shadow-pill">
          <h3 className="text-2xl font-black text-lbc-ink">Actividad reciente</h3>
          <div className="mt-5 space-y-4">
            {data.groups.slice(0, 4).map((group) => (
              <div key={group.id} className="rounded-2xl border border-slate-100 p-4">
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
