export default function StatCard({ icon: Icon, label, value, detail, tone = 'red' }) {
  const tones = {
    red: 'bg-red-50 text-lbc-red',
    blue: 'bg-blue-50 text-lbc-blueLight',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
  };

  return (
    <article className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-lbc-blue">{value}</p>
          {detail && <p className="mt-2 text-sm text-slate-500">{detail}</p>}
        </div>
        {Icon && (
          <div className={`rounded-md p-3 ${tones[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </article>
  );
}
