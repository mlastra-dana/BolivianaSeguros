import Badge from '../components/Badge.jsx';

export default function ReportsPage({ data }) {
  const totalMembers = data.groups.reduce((sum, group) => sum + group.memberCount, 0);
  const policyGroups = ['Seguro de Hogar', 'Seguro de Automovil', 'Seguro de Vida', 'Seguro de Accidentes'].map((policy) => ({
    label: policy,
    value: data.groups.filter((group) => group.policyType === policy).length,
  }));
  const states = ['Registrado', 'Contactado', 'Interesado', 'Convertido'].map((status) => ({
    label: status,
    value: Object.values(data.membersByGroup).flat().filter((member) => member.status === status).length,
  }));
  const ranked = [...data.groups].sort((a, b) => b.memberCount - a.memberCount);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-100 bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-bold text-lbc-blue">Reportes comerciales</h2>
        <p className="mt-2 text-slate-500">Vista ejecutiva de grupos, integrantes, afiliaciones recientes y conversion simulada.</p>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <ReportCard title="Grupos por tipo de poliza" items={policyGroups} max={Math.max(...policyGroups.map((item) => item.value), 1)} />
        <ReportCard title="Conversion simulada por estado" items={states} max={Math.max(...states.map((item) => item.value), 1)} />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
          <h3 className="text-xl font-bold text-lbc-blue">Integrantes por grupo</h3>
          <div className="mt-5 space-y-4">
            {data.groups.map((group) => (
              <div key={group.id}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-semibold text-slate-700">{group.name}</span>
                  <span className="text-slate-500">{group.memberCount}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-lbc-blue" style={{ width: `${Math.max(8, (group.memberCount / totalMembers) * 100 * 3)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
          <h3 className="text-xl font-bold text-lbc-blue">Ranking de grupos</h3>
          <div className="mt-5 space-y-3">
            {ranked.map((group, index) => (
              <div key={group.id} className="flex items-center justify-between gap-3 rounded-md border border-slate-100 p-4">
                <div>
                  <p className="font-bold text-lbc-blue">{index + 1}. {group.name}</p>
                  <p className="text-sm text-slate-500">{group.memberCount} integrantes</p>
                </div>
                <Badge>{group.policyType}</Badge>
              </div>
            ))}
          </div>
        </article>
      </section>
      <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
        <h3 className="text-xl font-bold text-lbc-blue">Afiliaciones recientes</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.groups.map((group) => (
            <div key={group.id} className="rounded-md bg-slate-50 p-4">
              <p className="font-bold text-lbc-blue">{group.name}</p>
              <p className="mt-1 text-sm text-slate-500">{group.monthAffiliations} afiliaciones del mes</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ReportCard({ title, items, max }) {
  return (
    <article className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
      <h3 className="text-xl font-bold text-lbc-blue">{title}</h3>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold text-slate-700">{item.label}</span>
              <span className="text-slate-500">{item.value}</span>
            </div>
            <div className="h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-lbc-red" style={{ width: `${Math.max(8, (item.value / max) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
