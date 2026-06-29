import { Mail, Phone, UserRound } from 'lucide-react';

export default function BrokerCard({ broker, assignedGroups }) {
  return (
    <article className="rounded-3xl bg-white p-6 shadow-pill">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lbc-blue text-white">
          <UserRound className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-lbc-ink">{broker.name}</h2>
          <p className="text-sm font-semibold text-lbc-blue">{broker.role}</p>
        </div>
      </div>
      <div className="mt-5 space-y-3 text-sm font-semibold text-lbc-blue">
        <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-600" />{broker.email}</p>
        <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-600" />{broker.phone}</p>
        <p className="font-black text-lbc-ink">Grupos asignados: {assignedGroups}</p>
      </div>
    </article>
  );
}
