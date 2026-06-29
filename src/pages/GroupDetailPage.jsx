import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, MapPin, ShieldCheck, UsersRound } from 'lucide-react';
import Badge from '../components/Badge.jsx';
import BrokerCard from '../components/BrokerCard.jsx';
import MembersTable from '../components/MembersTable.jsx';
import QRCard from '../components/QRCard.jsx';

export default function GroupDetailPage({ data, onAddMember }) {
  const { groupId } = useParams();
  const group = data.groups.find((item) => item.id === groupId);
  if (!group) return <Navigate to="/groups" replace />;

  const broker = data.brokers.find((item) => item.id === group.brokerId);
  const assignedGroups = data.groups.filter((item) => item.brokerId === broker.id).length;
  const members = data.membersByGroup[group.id] || [];

  const showToast = (text) => {
    const event = new CustomEvent('lbc-toast', { detail: text });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-6">
      <ToastListener />
      <Link to="/groups" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
        <ArrowLeft className="h-4 w-4" />
        Volver a grupos
      </Link>
      <section className="rounded-lg border border-slate-100 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold text-lbc-blue">{group.name}</h2>
              <Badge>{group.status}</Badge>
              <Badge>{group.policyType}</Badge>
            </div>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">{group.description}</p>
          </div>
          <div className="rounded-lg bg-red-50 px-5 py-4 text-lbc-red">
            <p className="text-sm font-semibold">Producto asegurador asociado</p>
            <p className="text-xl font-bold">{group.policyType}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Info icon={ShieldCheck} label="Categoria" value={group.category} />
          <Info icon={MapPin} label="Ubicacion" value={group.location} />
          <Info icon={CalendarDays} label="Fecha de creacion" value={group.createdAt} />
          <Info icon={UsersRound} label="Integrantes" value={group.memberCount} />
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <QRCard group={group} onCopy={showToast} />
          <BrokerCard broker={broker} assignedGroups={assignedGroups} />
        </div>
        <MembersTable groupId={group.id} members={members} onAddMember={onAddMember} />
      </section>
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
      <Icon className="h-5 w-5 text-lbc-red" />
      <p className="mt-3 text-xs font-bold uppercase text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-lbc-blue">{value}</p>
    </div>
  );
}

function ToastListener() {
  const id = 'lbc-toast-zone';
  if (typeof window !== 'undefined' && !window.__lbcToastListener) {
    window.__lbcToastListener = true;
    window.addEventListener('lbc-toast', (event) => {
      const zone = document.getElementById(id);
      if (!zone) return;
      zone.textContent = event.detail.includes('https') ? 'Enlace de afiliacion copiado visualmente.' : event.detail;
      zone.classList.remove('hidden');
      window.setTimeout(() => zone.classList.add('hidden'), 2600);
    });
  }
  return <div id={id} className="hidden rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" />;
}
