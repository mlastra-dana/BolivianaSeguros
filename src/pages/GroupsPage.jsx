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
  const [category, setCategory] = useState('Todos');
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const categories = ['Todos', ...new Set(data.groups.map((group) => group.category))];
  const filtered = useMemo(() => {
    const text = query.toLowerCase();
    return data.groups.filter((group) => {
      const matchesText = `${group.name} ${group.description} ${group.location}`.toLowerCase().includes(text);
      return matchesText && (policy === 'Todos' || group.policyType === policy) && (status === 'Todos' || group.status === status) && (category === 'Todos' || group.category === category);
    });
  }, [data.groups, query, policy, status, category]);

  const closeModal = (toast) => {
    setModalOpen(false);
    if (toast) setMessage(toast);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-lbc-blue">Grupos de distribucion</h2>
            <p className="mt-1 text-slate-500">Cada grupo tiene un unico producto asegurador, un corredor responsable y su propio QR de afiliacion.</p>
          </div>
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Crear grupo
          </Button>
        </div>
        {message && <div className="mt-4 rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</div>}
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input className="pl-10" placeholder="Buscar por nombre" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <select className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-lbc-red focus:ring-4 focus:ring-red-100" value={policy} onChange={(event) => setPolicy(event.target.value)}>
            <option>Todos</option>
            {policyTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
          <select className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-lbc-red focus:ring-4 focus:ring-red-100" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option>Todos</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
          <select className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-lbc-red focus:ring-4 focus:ring-red-100" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((group) => (
          <GroupCard key={group.id} group={group} broker={data.brokers.find((broker) => broker.id === group.brokerId)} />
        ))}
      </section>
      {filtered.length === 0 && <p className="rounded-lg bg-white p-8 text-center text-slate-500 shadow-soft">No se encontraron grupos con esos filtros.</p>}
      {modalOpen && <GroupFormModal brokers={data.brokers} onAddGroup={onAddGroup} onClose={closeModal} />}
    </div>
  );
}
