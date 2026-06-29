import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Edit3, MapPin, Power, ShieldCheck, Trash2, UsersRound, X } from 'lucide-react';
import { useState } from 'react';
import Badge from '../components/Badge.jsx';
import BrokerCard from '../components/BrokerCard.jsx';
import Button from '../components/Button.jsx';
import GroupFormModal from '../components/GroupFormModal.jsx';
import MembersTable from '../components/MembersTable.jsx';
import QRCard from '../components/QRCard.jsx';

export default function GroupDetailPage({ data, onUpdateGroup, onToggleGroupStatus, onDeleteGroup, onAddMember, onUpdateMember, onDeleteMember }) {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const group = data.groups.find((item) => item.id === groupId);
  if (!group) return <Navigate to="/groups" replace />;

  const broker = data.brokers.find((item) => item.id === group.brokerId);
  const assignedGroups = data.groups.filter((item) => item.brokerId === broker?.id).length;
  const members = data.membersByGroup[group.id] || [];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(group.location)}`;

  const showToast = (text) => {
    const event = new CustomEvent('lbc-toast', { detail: text });
    window.dispatchEvent(event);
  };

  const closeEdit = (toast) => {
    setEditOpen(false);
    if (toast) showToast(toast);
  };

  const handleToggleStatus = () => {
    onToggleGroupStatus(group.id);
    showToast(group.status === 'Activo' ? 'Grupo desactivado correctamente.' : 'Grupo activado correctamente.');
  };

  const handleDelete = () => {
    onDeleteGroup(group.id);
    navigate('/groups');
  };

  return (
    <div className="min-w-0 space-y-4">
      <ToastListener />
      <Link to="/groups" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-lbc-blue shadow-sm transition hover:text-blue-600">
        <ArrowLeft className="h-4 w-4" />
        Volver a grupos
      </Link>
      <section className="min-w-0 rounded-3xl bg-white p-4 shadow-pill md:p-5">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-black text-lbc-ink md:text-3xl">{group.name}</h2>
              <Badge>{group.status}</Badge>
              <Badge>{group.policyType}</Badge>
            </div>
            <div className="mt-3 h-1 w-16 rounded-full bg-lbc-green" />
            <p className="mt-4 max-w-3xl text-sm leading-6 text-lbc-blue md:text-base">{group.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={() => setEditOpen(true)}>
              <Edit3 className="h-4 w-4" />
              Editar
            </Button>
            <Button type="button" variant="outline" onClick={handleToggleStatus}>
              <Power className="h-4 w-4" />
              {group.status === 'Activo' ? 'Desactivar' : 'Activar'}
            </Button>
            <Button type="button" variant="outline" className="text-red-600 hover:border-red-400 hover:text-red-600" onClick={() => setDeleteOpen(true)}>
              <Trash2 className="h-4 w-4" />
              Eliminar
            </Button>
          </div>
        </div>
        <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Info icon={ShieldCheck} label="Categoria" value={group.category} />
          <Info icon={ShieldCheck} label="Poliza asociada" value={group.policyType} />
          <Info icon={CalendarDays} label="Fecha de creacion" value={group.createdAt} />
          <Info icon={UsersRound} label="Integrantes" value={group.memberCount} />
        </div>
        <div className="mt-3 grid min-w-0 gap-3 md:grid-cols-2">
          <Info icon={MapPin} label="Ubicacion" value={group.location} href={mapsUrl} />
          <Info icon={ShieldCheck} label="Corredor responsable" value={broker?.name || 'Sin asignar'} />
        </div>
      </section>
      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(230px,0.72fr)_minmax(0,1.28fr)]">
        <div className="min-w-0 space-y-4">
          <QRCard group={group} onCopy={showToast} />
          <BrokerCard broker={broker} assignedGroups={assignedGroups} />
        </div>
        <MembersTable
          groupId={group.id}
          members={members}
          onAddMember={onAddMember}
          onUpdateMember={onUpdateMember}
          onDeleteMember={onDeleteMember}
        />
      </section>
      {editOpen && (
        <GroupFormModal
          brokers={data.brokers}
          group={group}
          onUpdateGroup={onUpdateGroup}
          onClose={closeEdit}
        />
      )}
      {deleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-lbc-ink">Eliminar grupo</h2>
                <p className="mt-2 text-sm text-slate-600">{group.name}</p>
              </div>
              <button type="button" className="rounded-full p-2 text-slate-500 hover:bg-slate-100" onClick={() => setDeleteOpen(false)} aria-label="Cerrar">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setDeleteOpen(false)}>Cancelar</Button>
              <Button type="button" className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>Eliminar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <Icon className="h-5 w-5 text-blue-600" />
      <p className="mt-3 text-xs font-bold uppercase text-lbc-blue/55">{label}</p>
      <p className="mt-1 font-black text-lbc-ink">{value}</p>
    </>
  );

  if (href) {
    return (
      <a className="rounded-2xl bg-lbc-gray p-3 transition hover:bg-blue-50 md:p-4" href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-2xl bg-lbc-gray p-3 md:p-4">
      {content}
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
