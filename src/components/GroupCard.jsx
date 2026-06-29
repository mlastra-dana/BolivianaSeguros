import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, ShieldCheck, UserRound } from 'lucide-react';
import Badge from './Badge.jsx';

export default function GroupCard({ group, broker }) {
  return (
    <article className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-lbc-blue">{group.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{group.category}</p>
        </div>
        <Badge>{group.status}</Badge>
      </div>
      <p className="mt-4 min-h-12 text-sm leading-6 text-slate-600">{group.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>{group.policyType}</Badge>
      </div>
      <dl className="mt-5 grid gap-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-lbc-red" />
          <span>{group.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserRound className="h-4 w-4 text-lbc-red" />
          <span>{broker?.name} · {group.memberCount} integrantes</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-lbc-red" />
          <span>Creado el {group.createdAt}</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-lbc-red" />
          <span>Producto asegurador unico por grupo</span>
        </div>
      </dl>
      <Link
        className="mt-5 flex min-h-10 w-full items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-lbc-blue transition hover:border-lbc-red hover:text-lbc-red"
        to={`/groups/${group.id}`}
      >
        Ver detalle
      </Link>
    </article>
  );
}
