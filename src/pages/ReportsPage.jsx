import { BarChart3, Lock, LogOut, Settings, Target, TrendingUp, UsersRound } from 'lucide-react';
import { formatNumber } from '../utils/format.js';

const chartColors = ['#59D5F8', '#2FDB74', '#FF77BD', '#FFC64D'];

export default function ReportsPage({ data }) {
  const activeGroups = data.groups.filter((group) => group.status === 'Activo').length;
  const totalMembers = data.groups.reduce((sum, group) => sum + group.memberCount, 0);
  const monthAffiliations = data.groups.reduce((sum, group) => sum + group.monthAffiliations, 0);
  const conversion = Math.round(data.groups.reduce((sum, group) => sum + group.conversion, 0) / data.groups.length);
  const maxMembers = Math.max(...data.groups.map((group) => group.memberCount), 1);
  const maxAffiliations = Math.max(...data.groups.map((group) => group.monthAffiliations), 1);
  const totalLoadedMembers = Object.values(data.membersByGroup).flat();

  const policies = ['Seguro de Hogar', 'Seguro de Automovil', 'Seguro de Vida', 'Seguro de Accidentes']
    .map((policy, index) => ({
      label: policy.replace('Seguro de ', ''),
      value: data.groups.filter((group) => group.policyType === policy).length,
      color: chartColors[index],
    }))
    .filter((item) => item.value > 0);

  const funnel = ['Registrado', 'Contactado', 'Interesado', 'Convertido'].map((status, index) => ({
    label: status,
    value: totalLoadedMembers.filter((member) => member.status === status).length,
    color: chartColors[index],
  }));

  const topGroups = [...data.groups].sort((a, b) => b.memberCount - a.memberCount).slice(0, 4);
  const donutBackground = buildDonut(policies);

  return (
    <div className="min-w-0">
      <section className="overflow-hidden rounded-[24px] bg-[#25292B] p-3 text-white shadow-pill md:p-4">
        <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#454C55] text-sm font-black shadow-soft">LBC</div>
            <div className="flex min-h-9 items-center gap-2 rounded-full bg-[#454C55] px-4 text-sm font-black">
              <BarChart3 className="h-4 w-4 text-[#59D5F8]" />
              Reportes
            </div>
            <ToolbarIcon icon={Settings} />
            <ToolbarIcon icon={Lock} />
          </div>
          <button className="inline-flex min-h-9 items-center gap-2 rounded-full bg-[#454C55] px-4 text-xs font-black text-white">
            <LogOut className="h-4 w-4" />
            Salir
          </button>
        </header>

        <div className="grid gap-3 xl:grid-cols-[190px_minmax(0,1fr)_190px]">
          <Panel className="min-h-[116px]">
            <p className="text-xs font-bold text-white/70">Afiliaciones</p>
            <div className="mt-3 flex h-16 items-end gap-2">
              {data.groups.map((group) => (
                <div key={group.id} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-white/80"
                    style={{ height: `${Math.max(12, (group.monthAffiliations / maxAffiliations) * 58)}px` }}
                  />
                  <span className="text-[10px] font-bold text-white/55">{group.monthAffiliations}</span>
                </div>
              ))}
            </div>
          </Panel>

          <div className="grid gap-3 md:grid-cols-3">
            <Metric icon={UsersRound} label="Integrantes" value={formatNumber(totalMembers)} accent="#59D5F8" />
            <Metric icon={TrendingUp} label="Afiliaciones" value={monthAffiliations} accent="#2FDB74" />
            <Metric icon={Target} label="Conversion" value={`${conversion}%`} accent="#FF77BD" />
          </div>

          <Panel className="min-h-[116px]">
            <p className="text-xs font-bold text-white/70">Grupos activos</p>
            <p className="mt-3 text-4xl font-black">{activeGroups}</p>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#2FDB74]" style={{ width: `${(activeGroups / data.groups.length) * 100}%` }} />
            </div>
          </Panel>
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-[190px_minmax(0,1fr)]">
          <Panel>
            <p className="text-xs font-black text-white">Mix de polizas</p>
            <div className="mt-3 grid place-items-center">
              <div
                className="relative rounded-full"
                style={{
                  width: 98,
                  height: 98,
                  background: donutBackground,
                }}
              >
                <div className="absolute inset-5 grid place-items-center rounded-full bg-[#25292B] text-center">
                  <div>
                    <p className="text-xl font-black">{data.groups.length}</p>
                    <p className="text-[10px] font-bold text-white/55">grupos</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 grid gap-1.5">
              {policies.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-white/70">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.label}
                  </span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-black text-white">Volumen por grupo</p>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-white/70">Mes actual</span>
            </div>
            <div className="grid gap-2">
              {data.groups.map((group) => (
                <div key={group.id} className="grid grid-cols-[132px_minmax(0,1fr)_36px] items-center gap-3 text-xs">
                  <span className="truncate font-bold text-white/75">{group.name}</span>
                  <div className="h-2.5 overflow-hidden rounded-full bg-black/20">
                    <div className="h-full rounded-full bg-[#59D5F8]" style={{ width: `${Math.max(8, (group.memberCount / maxMembers) * 100)}%` }} />
                  </div>
                  <span className="text-right font-black">{group.memberCount}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Panel>
            <p className="text-xs font-black text-white">Embudo comercial</p>
            <div className="mt-3 grid gap-2 md:grid-cols-4">
              {funnel.map((step, index) => (
                <div key={step.label} className="rounded-2xl bg-white/8 p-3">
                  <div className="mb-3 h-1.5 rounded-full" style={{ backgroundColor: step.color }} />
                  <p className="text-2xl font-black">{step.value}</p>
                  <p className="mt-1 text-xs font-bold text-white/70">{step.label}</p>
                  <p className="mt-2 text-[10px] font-bold text-white/35">Etapa {index + 1}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <p className="text-xs font-black text-white">Top grupos</p>
            <div className="mt-3 space-y-2">
              {topGroups.map((group, index) => (
                <div key={group.id} className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-2 rounded-2xl bg-white/8 p-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-xs font-black">{index + 1}</span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-black">{group.name}</p>
                    <p className="text-[11px] font-bold text-white/45">{group.memberCount} integrantes</p>
                  </div>
                  <span className="text-xs font-black text-[#2FDB74]">{group.conversion}%</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>
    </div>
  );
}

function ToolbarIcon({ icon: Icon }) {
  return (
    <div className="hidden h-10 w-10 place-items-center rounded-full bg-[#454C55] text-white/80 md:grid">
      <Icon className="h-4 w-4" />
    </div>
  );
}

function Panel({ children, className = '' }) {
  return <article className={`rounded-[18px] bg-[#4A515B] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${className}`}>{children}</article>;
}

function Metric({ icon: Icon, label, value, accent }) {
  return (
    <Panel className="min-h-[170px]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-white/60">{label}</p>
          <p className="mt-4 text-3xl font-black">{value}</p>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#25292B]">
          <Icon className="h-6 w-6" style={{ color: accent }} />
        </div>
      </div>
      <div className="mt-5 flex h-10 items-end gap-1.5">
        {[22, 34, 26, 44, 38, 58, 50].map((height, index) => (
          <span key={index} className="flex-1 rounded-full" style={{ height, backgroundColor: accent }} />
        ))}
      </div>
    </Panel>
  );
}

function buildDonut(items) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  let current = 0;
  const stops = items.map((item) => {
    const start = current;
    current += (item.value / total) * 100;
    return `${item.color} ${start}% ${current}%`;
  });
  return `conic-gradient(${stops.join(', ')})`;
}
