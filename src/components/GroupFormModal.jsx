import { useState } from 'react';
import { X } from 'lucide-react';
import Button from './Button.jsx';
import Input from './Input.jsx';
import { policyTypes } from '../data/mockData.js';
import { slugify } from '../utils/format.js';

export default function GroupFormModal({ brokers, group, onClose, onAddGroup, onUpdateGroup }) {
  const isEditing = Boolean(group);
  const [form, setForm] = useState({
    name: group?.name || '',
    description: group?.description || '',
    category: group?.category || '',
    policyType: group?.policyType || policyTypes[0],
    location: group?.location || '',
    brokerId: group?.brokerId || brokers[0]?.id || '',
    status: group?.status || 'Activo',
  });

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = (event) => {
    event.preventDefault();
    if (isEditing) {
      onUpdateGroup(group.id, {
        ...form,
        slug: slugify(form.name),
      });
      onClose('Grupo actualizado correctamente.');
      return;
    }

    const id = `g-${slugify(form.name || 'nuevo-grupo')}-${Date.now()}`;
    onAddGroup({
      id,
      slug: slugify(form.name),
      name: form.name,
      description: form.description,
      category: form.category,
      policyType: form.policyType,
      location: form.location,
      brokerId: form.brokerId,
      status: form.status,
      createdAt: '29/06/2026',
      memberCount: 0,
      monthAffiliations: 0,
      conversion: 0,
    });
    onClose('Grupo creado correctamente.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <form onSubmit={submit} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-4 shadow-soft md:p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-lbc-ink">{isEditing ? 'Editar grupo' : 'Crear grupo'}</h2>
          <button type="button" className="rounded-full p-2 text-slate-500 hover:bg-slate-100" onClick={() => onClose()} aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Input label="Nombre del grupo" required value={form.name} onChange={(event) => update('name', event.target.value)} />
          <Input label="Categoría" required value={form.category} onChange={(event) => update('category', event.target.value)} />
          <label className="block md:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">Descripción</span>
            <textarea
              className="min-h-24 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
              value={form.description}
              onChange={(event) => update('description', event.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">Tipo de póliza asociada</span>
            <select className="h-11 w-full rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" value={form.policyType} onChange={(event) => update('policyType', event.target.value)}>
              {policyTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <Input label="Ubicación" required value={form.location} onChange={(event) => update('location', event.target.value)} />
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">Estado</span>
            <select className="h-11 w-full rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" value={form.status} onChange={(event) => update('status', event.target.value)}>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">Corredor responsable</span>
            <select className="h-11 w-full rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" value={form.brokerId} onChange={(event) => update('brokerId', event.target.value)}>
              {brokers.map((broker) => <option key={broker.id} value={broker.id}>{broker.name}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => onClose()}>Cancelar</Button>
          <Button type="submit">{isEditing ? 'Guardar cambios' : 'Crear grupo'}</Button>
        </div>
      </form>
    </div>
  );
}
