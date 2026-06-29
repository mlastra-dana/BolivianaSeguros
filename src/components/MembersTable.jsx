import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Badge from './Badge.jsx';
import Button from './Button.jsx';
import Input from './Input.jsx';
import MemberFormModal from './MemberFormModal.jsx';

export default function MembersTable({ groupId, members, onAddMember }) {
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const filtered = useMemo(() => {
    const text = query.toLowerCase();
    return members.filter((member) => `${member.firstName} ${member.lastName} ${member.email} ${member.phone}`.toLowerCase().includes(text));
  }, [members, query]);

  const closeModal = (toast) => {
    setModalOpen(false);
    if (toast) setMessage(toast);
  };

  return (
    <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-lbc-blue">Integrantes del grupo</h2>
          <p className="text-sm text-slate-500">Cada integrante pertenece a este grupo y se gestiona en una etapa comercial.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Agregar integrante
        </Button>
      </div>
      {message && <div className="mt-4 rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</div>}
      <div className="mt-5 max-w-md">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input className="pl-10" placeholder="Buscar por nombre, correo o telefono" value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Telefono</th>
              <th className="px-4 py-3">Genero</th>
              <th className="px-4 py-3">Edad</th>
              <th className="px-4 py-3">Afiliacion</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((member) => (
              <tr key={member.id} className="bg-white">
                <td className="px-4 py-4 font-semibold text-lbc-blue">{member.firstName} {member.lastName}</td>
                <td className="px-4 py-4 text-slate-600">{member.email}</td>
                <td className="px-4 py-4 text-slate-600">{member.phone}</td>
                <td className="px-4 py-4 text-slate-600">{member.gender}</td>
                <td className="px-4 py-4 text-slate-600">{member.age}</td>
                <td className="px-4 py-4 text-slate-600">{member.joinedAt}</td>
                <td className="px-4 py-4"><Badge>{member.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No se encontraron integrantes con esos criterios.</p>}
      </div>
      {modalOpen && <MemberFormModal groupId={groupId} onAddMember={onAddMember} onClose={closeModal} />}
    </section>
  );
}
