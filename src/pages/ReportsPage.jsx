import { BarChart3, Target, TrendingUp, UsersRound } from 'lucide-react';
import { formatNumber } from '../utils/format.js';

const LBC_BLUE = '#3F5275';
const LBC_DARK = '#2F3C5D';
const LBC_GREEN = '#10B72A';
const LBC_RED = '#C8102E';
const LBC_SOFT = '#F6F7F9';
const chartColors = [LBC_BLUE, LBC_GREEN, '#2563EB', LBC_RED];

export default function ReportsPage({ data }) {
  const totalMembers = data.groups.reduce((sum, group) => sum + group.memberCount, 0);
  const activeGroups = data.groups.filter((group) => group.status === 'Activo').length;
  const monthAffiliations = data.groups.reduce((sum, group) => sum + group.monthAffiliations, 0);
  const conversion = Math.round(data.groups.reduce((sum, group) => sum + group.conversion, 0) / data.groups.length);
  const maxMembers = Math.max(...data.groups.map((group) => group.memberCount), 1);
  const maxAffiliations = Math.max(...data.groups.map((group) => group.monthAffiliations), 1);
  const loadedMembers = Object.values(data.membersByGroup).flat();

  const policies = ['Seguro de Hogar', 'Seguro de Automovil', 'Seguro de Vida', 'Seguro de Accidentes']
    .map((policy, index) => ({
      label: policy.replace('Seguro de ', ''),
      value: data.groups.filter((group) => group.policyType === policy).length,
      color: chartColors[index],
    }))
    .filter((item) => item.value > 0);

  const funnel = ['Registrado', 'Contactado', 'Interesado', 'Convertido'].map((status, index) => ({
    label: status,
    value: loadedMembers.filter((member) => member.status === status).length,
    color: chartColors[index],
  }));

  const topGroups = [...data.groups].sort((a, b) => b.memberCount - a.memberCount).slice(0, 4);

  return (
    <div className="min-w-0 space-y-3">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi icon={UsersRound} label="Integrantes" value={formatNumber(totalMembers)} />
        <Kpi icon={BarChart3} label="Grupos activos" value={activeGroups} />
        <Kpi icon={TrendingUp} label="Afiliaciones" value={monthAffiliations} />
        <Kpi icon={Target} label="Conversion" value={`${conversion}%`} />
      </section>

      <section className="grid gap-3 xl:grid-cols-12">
        <Panel title="Mix de polizas" className="xl:col-span-3">
          <div className="flex items-center gap-4">
            <Donut items={policies} total={data.groups.length} />
            <div className="min-w-0 flex-1 space-y-2">
              {policies.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-2 text-sm">
                  <span className="flex min-w-0 items-center gap-2 font-bold" style={{ color: LBC_DARK }}>
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="truncate">{item.label}</span>
                  </span>
                  <span className="font-black" style={{ color: LBC_BLUE }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title="Afiliaciones del mes" className="xl:col-span-5">
          <div className="flex h-40 items-end gap-3">
            {data.groups.map((group) => (
              <div key={group.id} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                <span className="text-xs font-black" style={{ color: LBC_DARK }}>{group.monthAffiliations}</span>
                <div className="flex h-24 w-full items-end rounded-2xl p-1.5" style={{ backgroundColor: LBC_SOFT }}>
                  <div
                    className="w-full rounded-xl"
                    style={{
                      height: `${Math.max(14, (group.monthAffiliations / maxAffiliations) * 100)}%`,
                      backgroundColor: LBC_GREEN,
                    }}
                  />
                </div>
                <span className="w-full truncate text-center text-[11px] font-bold text-slate-500">{shortName(group.name)}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Embudo comercial" className="xl:col-span-4">
          <div className="grid grid-cols-2 gap-2">
            {funnel.map((step) => (
              <div key={step.label} className="rounded-2xl p-3" style={{ backgroundColor: LBC_SOFT }}>
                <div className="mb-2 h-1.5 rounded-full" style={{ backgroundColor: step.color }} />
                <p className="text-2xl font-black" style={{ color: LBC_DARK }}>{step.value}</p>
                <p className="text-xs font-bold text-slate-500">{step.label}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Volumen por grupo" className="xl:col-span-8">
          <div className="grid gap-2">
            {data.groups.map((group) => (
              <div key={group.id} className="grid grid-cols-[150px_minmax(0,1fr)_42px] items-center gap-3 text-sm">
                <span className="truncate font-bold" style={{ color: LBC_DARK }}>{group.name}</span>
                <div className="h-2.5 overflow-hidden rounded-full" style={{ backgroundColor: '#E9EEF5' }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.max(8, (group.memberCount / maxMembers) * 100)}%`, backgroundColor: LBC_BLUE }} />
                </div>
                <span className="text-right font-black" style={{ color: LBC_DARK }}>{group.memberCount}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Top grupos" className="xl:col-span-4">
          <div className="space-y-2">
            {topGroups.map((group, index) => (
              <div key={group.id} className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-2 rounded-2xl p-2.5" style={{ backgroundColor: LBC_SOFT }}>
                <span className="grid h-7 w-7 place-items-center rounded-full text-xs font-black text-white" style={{ backgroundColor: LBC_BLUE }}>{index + 1}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black" style={{ color: LBC_DARK }}>{group.name}</p>
                  <p className="text-xs font-bold text-slate-500">{group.memberCount} integrantes</p>
                </div>
                <span className="text-sm font-black" style={{ color: LBC_GREEN }}>{group.conversion}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}

function Kpi({ icon: Icon, label, value }) {
  return (
    <article className="rounded-3xl p-4 text-white shadow-soft" style={{ backgroundColor: LBC_BLUE }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-white/70">{label}</p>
          <p className="mt-1 text-3xl font-black">{value}</p>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-full bg-white/10">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </article>
  );
}

function Panel({ title, children, className = '' }) {
  return (
    <article className={`min-w-0 rounded-3xl bg-white p-4 shadow-pill ${className}`}>
      <h2 className="text-base font-black" style={{ color: LBC_DARK }}>{title}</h2>
      <div className="mt-4">{children}</div>
    </article>
  );
}

function Donut({ items, total }) {
  return (
    <div
      className="relative h-32 w-32 shrink-0 rounded-full"
      style={{ background: buildDonut(items) }}
    >
      <div className="absolute inset-6 grid place-items-center rounded-full bg-white text-center shadow-sm">
        <div>
          <p className="text-2xl font-black" style={{ color: LBC_DARK }}>{total}</p>
          <p className="text-[11px] font-bold text-slate-400">grupos</p>
        </div>
      </div>
    </div>
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

function shortName(name) {
  return name
    .replace('Condominio ', '')
    .replace('Colegio ', '')
    .replace('Club de ', '')
    .replace('Camara ', '');
}
