import { Link } from 'react-router-dom';
import { ArrowRight, UserRound } from 'lucide-react';
import Badge from './Badge.jsx';

export default function GroupCard({ group, broker }) {
  return (
    <article className="flex min-h-[230px] flex-col rounded-3xl bg-lbc-blue p-6 text-white shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-black leading-tight text-white">{group.name}</h3>
          <p className="mt-2 text-sm font-semibold text-white/70">{group.category}</p>
        </div>
        <Badge>{group.status}</Badge>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge>{group.policyType}</Badge>
      </div>
      <dl className="mt-6 text-sm text-white/75">
        <div className="flex items-center gap-2">
          <UserRound className="h-4 w-4 text-white" />
          <span>{broker?.name} · {group.memberCount} integrantes</span>
        </div>
      </dl>
      <Link
        className="mt-auto flex min-h-12 w-fit items-center justify-center gap-2 rounded-full border border-white/70 px-5 py-2 text-sm font-black text-white transition hover:bg-white hover:text-lbc-blue"
        to={`/groups/${group.id}`}
      >
        Ver detalle
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
