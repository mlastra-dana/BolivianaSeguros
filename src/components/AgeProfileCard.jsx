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
      <h2 className="text-2xl font-black text-lbc-ink">Perfilamiento agregado: suscritos vs base</h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[620px] border-separate border-spacing-y-3 text-left text-sm">
          <thead className="text-base font-black text-lbc-blue/70">
            <tr>
              <th className="px-5 pb-2">Segmento</th>
              <th className="px-5 pb-2">Base</th>
              <th className="px-5 pb-2">Suscritos</th>
              <th className="px-5 pb-2">Señal</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="rounded-l-3xl border-y border-l border-slate-200 px-5 py-4 font-black text-lbc-ink">{row.label}</td>
                <td className="border-y border-slate-200 px-5 py-4 text-lbc-blue">{row.base}%</td>
                <td className="border-y border-slate-200 px-5 py-4 text-lbc-blue">{row.subscribed}%</td>
                <td className="rounded-r-3xl border-y border-r border-slate-200 px-5 py-4 text-lbc-blue">{row.signal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

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
