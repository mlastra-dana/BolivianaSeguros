const AGE_SEGMENTS = [
  { label: '18-34 años', min: 18, max: 34 },
  { label: '35-49 años', min: 35, max: 49 },
  { label: '50-64 años', min: 50, max: 64 },
  { label: '65+ años', min: 65, max: Infinity },
];

export default function AgeProfileCard({ members }) {
  const totalBase = Math.max(members.length, 1);
  const subscribedMembers = members.filter((member) => member.status === 'Afiliado');
  const totalSubscribed = Math.max(subscribedMembers.length, 1);

  const rows = AGE_SEGMENTS.map((segment) => {
    const baseCount = members.filter((member) => isInSegment(member.age, segment)).length;
    const subscribedCount = subscribedMembers.filter((member) => isInSegment(member.age, segment)).length;
    const base = Math.round((baseCount / totalBase) * 100);
    const subscribed = Math.round((subscribedCount / totalSubscribed) * 100);

    return {
      ...segment,
      base,
      subscribed,
      signal: getSignal(base, subscribed),
    };
  });

  return (
    <article className="rounded-3xl bg-white p-4 shadow-pill md:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-lbc-ink">Perfilamiento agregado</h2>
          <p className="mt-1 text-sm font-semibold text-lbc-blue/70">Suscritos vs. base por rango de edad</p>
        </div>
        <p className="text-sm font-bold text-slate-400">{members.length} registros visibles</p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[620px] w-full border-separate border-spacing-y-2 text-left text-sm">
          <thead className="text-xs font-black uppercase text-lbc-blue/55">
            <tr>
              <th className="px-4 py-2">Segmento</th>
              <th className="px-4 py-2">Base</th>
              <th className="px-4 py-2">Suscritos</th>
              <th className="px-4 py-2">Señal</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="bg-white shadow-[0_0_0_1px_rgba(226,232,240,1)]">
                <td className="rounded-l-2xl px-4 py-3 font-black text-lbc-ink">{row.label}</td>
                <td className="px-4 py-3 font-semibold text-lbc-blue">{row.base}%</td>
                <td className="px-4 py-3 font-semibold text-lbc-blue">{row.subscribed}%</td>
                <td className="rounded-r-2xl px-4 py-3">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${signalStyles[row.signal]}`}>
                    {row.signal}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

const signalStyles = {
  Balanceado: 'bg-emerald-50 text-emerald-700',
  'Sub-representado': 'bg-amber-50 text-amber-700',
  Vigilar: 'bg-blue-50 text-blue-700',
  Oportunidad: 'bg-indigo-50 text-indigo-700',
};

function isInSegment(age, segment) {
  return age >= segment.min && age <= segment.max;
}

function getSignal(base, subscribed) {
  const difference = subscribed - base;
  if (Math.abs(difference) <= 5) return 'Balanceado';
  if (difference <= -6) return 'Sub-representado';
  if (difference >= 12) return 'Oportunidad';
  return 'Vigilar';
}
