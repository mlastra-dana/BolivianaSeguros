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
      <Link to="/groups" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-lbc-blue shadow-sm transition hover:text-blue-600">
        <ArrowLeft className="h-4 w-4" />
        Volver a grupos
      </Link>
      <section className="rounded-3xl bg-white p-6 shadow-pill">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-4xl font-black text-lbc-ink">{group.name}</h2>
              <Badge>{group.status}</Badge>
              <Badge>{group.policyType}</Badge>
            </div>
            <div className="mt-4 h-1.5 w-24 rounded-full bg-lbc-green" />
            <p className="mt-5 max-w-3xl leading-7 text-lbc-blue">{group.description}</p>
          </div>
          <div className="rounded-3xl bg-lbc-blue px-6 py-5 text-white">
            <p className="text-sm font-bold text-white/70">Producto asegurador asociado</p>
            <p className="text-xl font-black">{group.policyType}</p>
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
    <div className="rounded-2xl bg-lbc-gray p-4">
      <Icon className="h-5 w-5 text-blue-600" />
      <p className="mt-3 text-xs font-bold uppercase text-lbc-blue/55">{label}</p>
      <p className="mt-1 font-black text-lbc-ink">{value}</p>
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
  return <div id={id} className="hidden rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700" />;
}
