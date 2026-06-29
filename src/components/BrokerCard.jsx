import { Mail, Phone, UserRound } from 'lucide-react';

export default function BrokerCard({ broker, assignedGroups }) {
  return (
    <article className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-red-50 text-lbc-red">
          <UserRound className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-lbc-blue">{broker.name}</h2>
          <p className="text-sm text-slate-500">{broker.role}</p>
        </div>
      </div>
      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-lbc-red" />{broker.email}</p>
        <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-lbc-red" />{broker.phone}</p>
        <p className="font-semibold text-lbc-blue">Grupos asignados: {assignedGroups}</p>
      </div>
    </article>
  );
}
