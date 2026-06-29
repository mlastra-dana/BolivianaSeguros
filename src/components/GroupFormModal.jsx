import { useState } from 'react';
import { X } from 'lucide-react';
import Button from './Button.jsx';
import Input from './Input.jsx';
import { policyTypes } from '../data/mockData.js';
import { slugify } from '../utils/format.js';

export default function GroupFormModal({ brokers, onClose, onAddGroup }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    policyType: policyTypes[0],
    location: '',
    brokerId: brokers[0]?.id || '',
  });

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = (event) => {
    event.preventDefault();
    const id = `g-${slugify(form.name || 'nuevo-grupo')}-${Date.now()}`;
    onAddGroup({
      id,
      slug: slugify(form.name),
      name: form.name,
      description: 'Grupo creado para gestionar afiliaciones digitales y oportunidades comerciales segmentadas.',
      category: form.category,
      policyType: form.policyType,
      location: form.location,
      brokerId: form.brokerId,
      status: 'Activo',
      createdAt: '29/06/2026',
      memberCount: 0,
      monthAffiliations: 0,
      conversion: 0,
    });
    onClose('Grupo creado correctamente.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <form onSubmit={submit} className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-lbc-blue">Crear grupo</h2>
          <button type="button" className="rounded-md p-2 text-slate-500 hover:bg-slate-100" onClick={() => onClose()} aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Input label="Nombre del grupo" required value={form.name} onChange={(event) => update('name', event.target.value)} />
          <Input label="Categoria" required value={form.category} onChange={(event) => update('category', event.target.value)} />
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">Tipo de poliza asociada</span>
            <select className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-lbc-red focus:ring-4 focus:ring-red-100" value={form.policyType} onChange={(event) => update('policyType', event.target.value)}>
              {policyTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <Input label="Ubicacion" required value={form.location} onChange={(event) => update('location', event.target.value)} />
          <label className="block md:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">Corredor responsable</span>
            <select className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-lbc-red focus:ring-4 focus:ring-red-100" value={form.brokerId} onChange={(event) => update('brokerId', event.target.value)}>
              {brokers.map((broker) => <option key={broker.id} value={broker.id}>{broker.name}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => onClose()}>Cancelar</Button>
          <Button type="submit">Crear grupo</Button>
        </div>
      </form>
    </div>
  );
}
