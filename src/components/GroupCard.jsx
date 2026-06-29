import { Link } from 'react-router-dom';
import { ArrowRight, UserRound } from 'lucide-react';
import Badge from './Badge.jsx';

export default function GroupCard({ group, broker }) {
  return (
    <article className="relative flex min-h-[250px] min-w-0 flex-col rounded-3xl bg-lbc-blue p-5 text-white shadow-soft">
      <div className="absolute right-5 top-5">
        <Badge>{group.status}</Badge>
      </div>
      <div className="min-h-[84px] pr-28">
        <h3 className="line-clamp-2 text-xl font-black leading-tight text-white md:text-2xl">{group.name}</h3>
        <p className="mt-2 line-clamp-1 text-sm font-semibold text-white/70">{group.category}</p>
      </div>
      <div className="mt-4 min-h-8">
        <Badge>{group.policyType}</Badge>
      </div>
      <dl className="mt-auto min-h-6 text-sm text-white/75">
        <div className="flex items-center gap-2">
          <UserRound className="h-4 w-4 shrink-0 text-white" />
          <span className="truncate">{broker?.name} · {group.memberCount} integrantes</span>
        </div>
      </dl>
      <Link
        className="mt-4 flex min-h-11 w-fit items-center justify-center gap-2 rounded-full border border-white/70 px-4 py-2 text-sm font-black text-white transition hover:bg-white hover:text-lbc-blue"
        to={`/groups/${group.id}`}
      >
        Ver detalle
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
