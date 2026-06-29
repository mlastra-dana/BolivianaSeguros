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
    <div className="min-w-0 space-y-4">
      <section className="rounded-3xl bg-white p-4 shadow-pill md:p-5">
        <h2 className="text-2xl font-black text-lbc-ink md:text-3xl">Reportes</h2>
        <div className="mt-3 h-1 w-16 rounded-full bg-lbc-green" />
      </section>
      <section className="grid min-w-0 gap-4 xl:grid-cols-2">
        <ReportCard title="Grupos por tipo de poliza" items={policyGroups} max={Math.max(...policyGroups.map((item) => item.value), 1)} />
        <ReportCard title="Conversion simulada por estado" items={states} max={Math.max(...states.map((item) => item.value), 1)} />
      </section>
      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <article className="min-w-0 rounded-3xl bg-white p-4 shadow-pill md:p-5">
          <h3 className="text-xl font-black text-lbc-ink">Integrantes por grupo</h3>
          <div className="mt-5 space-y-4">
            {data.groups.map((group) => (
              <div key={group.id}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-bold text-lbc-ink">{group.name}</span>
                  <span className="text-slate-500">{group.memberCount}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-lbc-green" style={{ width: `${Math.max(8, (group.memberCount / totalMembers) * 100 * 3)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="min-w-0 rounded-3xl bg-white p-4 shadow-pill md:p-5">
          <h3 className="text-xl font-black text-lbc-ink">Ranking de grupos</h3>
          <div className="mt-5 space-y-3">
            {ranked.map((group, index) => (
              <div key={group.id} className="flex items-center justify-between gap-3 rounded-2xl bg-lbc-gray p-4">
                <div>
                  <p className="font-black text-lbc-ink">{index + 1}. {group.name}</p>
                  <p className="text-sm text-slate-500">{group.memberCount} integrantes</p>
                </div>
                <Badge>{group.policyType}</Badge>
              </div>
            ))}
          </div>
        </article>
      </section>
      <section className="rounded-3xl bg-white p-4 shadow-pill md:p-5">
        <h3 className="text-xl font-black text-lbc-ink">Afiliaciones recientes</h3>
        <div className="mt-5 grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {data.groups.map((group) => (
            <div key={group.id} className="rounded-2xl bg-lbc-gray p-4">
              <p className="font-black text-lbc-ink">{group.name}</p>
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
    <article className="min-w-0 rounded-3xl bg-white p-4 shadow-pill md:p-5">
      <h3 className="text-xl font-black text-lbc-ink">{title}</h3>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-bold text-lbc-ink">{item.label}</span>
              <span className="text-slate-500">{item.value}</span>
            </div>
            <div className="h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-lbc-blue" style={{ width: `${Math.max(8, (item.value / max) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
