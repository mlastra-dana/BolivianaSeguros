import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Button from '../components/Button.jsx';
import GroupCard from '../components/GroupCard.jsx';
import GroupFormModal from '../components/GroupFormModal.jsx';
import Input from '../components/Input.jsx';
import { policyTypes } from '../data/mockData.js';

export default function GroupsPage({ data, onAddGroup }) {
  const [query, setQuery] = useState('');
  const [policy, setPolicy] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const filtered = useMemo(() => {
    const text = query.toLowerCase();
    return data.groups.filter((group) => {
      const matchesText = `${group.name} ${group.description} ${group.location}`.toLowerCase().includes(text);
      return matchesText && (policy === 'Todos' || group.policyType === policy) && (status === 'Todos' || group.status === status);
    });
  }, [data.groups, query, policy, status]);

  const closeModal = (toast) => {
    setModalOpen(false);
    if (toast) setMessage(toast);
  };

  return (
    <div className="space-y-4">
      <section className="rounded-3xl bg-white p-4 shadow-pill md:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 className="text-2xl font-black text-lbc-ink md:text-3xl">Grupos</h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-lbc-green" />
          </div>
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Crear grupo
          </Button>
        </div>
        {message && <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">{message}</div>}
        <div className="mt-5 grid min-w-0 gap-3 md:grid-cols-[minmax(220px,1.2fr)_minmax(180px,0.9fr)_minmax(140px,0.7fr)]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input className="pl-10" placeholder="Buscar por nombre" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <select className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" value={policy} onChange={(event) => setPolicy(event.target.value)}>
            <option>Todos</option>
            {policyTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
          <select className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option>Todos</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>
      </section>
      <section className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((group) => (
          <GroupCard key={group.id} group={group} broker={data.brokers.find((broker) => broker.id === group.brokerId)} />
        ))}
      </section>
      {filtered.length === 0 && <p className="rounded-lg bg-white p-8 text-center text-slate-500 shadow-soft">No se encontraron grupos con esos filtros.</p>}
      {modalOpen && <GroupFormModal brokers={data.brokers} onAddGroup={onAddGroup} onClose={closeModal} />}
    </div>
  );
}
