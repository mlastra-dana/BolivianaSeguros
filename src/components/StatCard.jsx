export default function StatCard({ icon: Icon, label, value, detail, tone = 'red' }) {
  const tones = {
    red: 'bg-white/10 text-white',
    blue: 'bg-white/10 text-white',
    green: 'bg-white/10 text-white',
    amber: 'bg-white/10 text-white',
  };

  return (
    <article className="rounded-2xl bg-lbc-blue p-5 text-white shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white/75">{label}</p>
          <p className="mt-2 text-3xl font-black text-white">{value}</p>
          {detail && <p className="mt-2 text-sm leading-5 text-white/70">{detail}</p>}
        </div>
        {Icon && (
          <div className={`rounded-full p-3 ${tones[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </article>
  );
}
