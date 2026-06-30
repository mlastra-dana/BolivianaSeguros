import { useMemo, useState } from 'react';
import { Edit3, Plus, Search, Trash2, X } from 'lucide-react';
import Badge from './Badge.jsx';
import Button from './Button.jsx';
import Input from './Input.jsx';
import MemberFormModal from './MemberFormModal.jsx';

const PREVIEW_LIMIT = 5;

export default function MembersTable({ groupId, members, totalMembers, onAddMember, onUpdateMember, onDeleteMember }) {
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [message, setMessage] = useState('');

  const visibleMembers = useMemo(() => {
    const text = query.toLowerCase();
    const matches = members.filter((member) => `${member.firstName} ${member.lastName} ${member.email} ${member.phone}`.toLowerCase().includes(text));
    return text ? matches : matches.slice(0, PREVIEW_LIMIT);
  }, [members, query]);

  const displayTotal = totalMembers || members.length;
  const summary = query
    ? `${visibleMembers.length} resultado${visibleMembers.length === 1 ? '' : 's'} encontrados`
    : `Ultimos ${Math.min(PREVIEW_LIMIT, members.length)} registros de ${displayTotal} miembros`;

  const closeModal = (toast) => {
    setModalOpen(false);
    setEditingMember(null);
    if (toast) setMessage(toast);
  };

  const openCreateModal = () => {
    setEditingMember(null);
    setModalOpen(true);
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    onDeleteMember(groupId, memberToDelete.id);
    setMemberToDelete(null);
    setMessage('Integrante eliminado correctamente.');
  };

  return (
    <section className="min-w-0 rounded-3xl bg-white p-4 shadow-pill md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-black text-lbc-ink">Ultimos miembros registrados</h2>
          <p className="mt-1 text-sm font-semibold text-lbc-blue/70">{summary}</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          Agregar miembro
        </Button>
      </div>
      {message && <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">{message}</div>}
      <div className="mt-5 max-w-md">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input className="pl-10" placeholder="Buscar por nombre, correo o telefono" value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
      </div>
      <div className="mt-5 grid gap-3 lg:hidden">
        {visibleMembers.map((member) => (
          <article key={member.id} className="rounded-2xl border border-slate-100 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-black text-lbc-ink">
                  {member.firstName} {member.lastName}
                </p>
                <p className="mt-1 break-all text-sm text-slate-600">{member.email}</p>
                <p className="text-sm text-slate-600">{member.phone}</p>
              </div>
              <Badge>{member.status}</Badge>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
              <span>{member.gender}</span>
              <span>{member.age} anos</span>
              <span>{member.joinedAt}</span>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-lbc-blue transition hover:border-blue-500 hover:text-blue-600"
                onClick={() => openEditModal(member)}
                aria-label={`Editar ${member.firstName} ${member.lastName}`}
              >
                <Edit3 className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-red-500 transition hover:border-red-400 hover:bg-red-50"
                onClick={() => setMemberToDelete(member)}
                aria-label={`Eliminar ${member.firstName} ${member.lastName}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-5 hidden min-w-0 overflow-x-auto lg:block">
        <table className="min-w-[760px] divide-y divide-slate-100 text-left text-sm">
          <thead className="bg-lbc-gray text-xs font-bold uppercase text-lbc-blue">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Telefono</th>
              <th className="px-4 py-3">Genero</th>
              <th className="px-4 py-3">Edad</th>
              <th className="px-4 py-3">Afiliacion</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visibleMembers.map((member) => (
              <tr key={member.id} className="bg-white">
                <td className="px-4 py-4 font-bold text-lbc-ink">
                  {member.firstName} {member.lastName}
                </td>
                <td className="px-4 py-4 text-slate-600">{member.email}</td>
                <td className="px-4 py-4 text-slate-600">{member.phone}</td>
                <td className="px-4 py-4 text-slate-600">{member.gender}</td>
                <td className="px-4 py-4 text-slate-600">{member.age}</td>
                <td className="px-4 py-4 text-slate-600">{member.joinedAt}</td>
                <td className="px-4 py-4"><Badge>{member.status}</Badge></td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-lbc-blue transition hover:border-blue-500 hover:text-blue-600"
                      onClick={() => openEditModal(member)}
                      aria-label={`Editar ${member.firstName} ${member.lastName}`}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-red-500 transition hover:border-red-400 hover:bg-red-50"
                      onClick={() => setMemberToDelete(member)}
                      aria-label={`Eliminar ${member.firstName} ${member.lastName}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibleMembers.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No se encontraron miembros con esos criterios.</p>}
      {modalOpen && (
        <MemberFormModal
          groupId={groupId}
          member={editingMember}
          onAddMember={onAddMember}
          onUpdateMember={onUpdateMember}
          onClose={closeModal}
        />
      )}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-lbc-ink">Eliminar miembro</h2>
                <p className="mt-2 text-sm text-slate-600">
                  {memberToDelete.firstName} {memberToDelete.lastName}
                </p>
              </div>
              <button type="button" className="rounded-full p-2 text-slate-500 hover:bg-slate-100" onClick={() => setMemberToDelete(null)} aria-label="Cerrar">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setMemberToDelete(null)}>Cancelar</Button>
              <Button type="button" className="bg-red-600 hover:bg-red-700" onClick={confirmDelete}>Eliminar</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
