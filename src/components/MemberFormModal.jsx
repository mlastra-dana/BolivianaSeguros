import { useState } from 'react';
import { X } from 'lucide-react';
import Button from './Button.jsx';
import Input from './Input.jsx';

export default function MemberFormModal({ groupId, member, onClose, onAddMember, onUpdateMember }) {
  const isEditing = Boolean(member);
  const [form, setForm] = useState({
    firstName: member?.firstName || '',
    lastName: member?.lastName || '',
    email: member?.email || '',
    phone: member?.phone || '',
    gender: member?.gender || 'Femenino',
    age: member?.age || '',
  });
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = (event) => {
    event.preventDefault();
    if (isEditing) {
      onUpdateMember(groupId, member.id, {
        ...form,
        age: Number(form.age),
      });
      onClose('Integrante actualizado correctamente.');
      return;
    }

    onAddMember(groupId, {
      id: `${groupId}-m-${Date.now()}`,
      ...form,
      age: Number(form.age),
      joinedAt: '29/06/2026',
      status: 'Registrado',
    });
    onClose('Integrante agregado correctamente.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <form onSubmit={submit} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-4 shadow-soft md:p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-lbc-ink">{isEditing ? 'Editar miembro' : 'Agregar miembro'}</h2>
          <button type="button" className="rounded-full p-2 text-slate-500 hover:bg-slate-100" onClick={() => onClose()} aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Input label="Nombre" required value={form.firstName} onChange={(event) => update('firstName', event.target.value)} />
          <Input label="Apellidos" required value={form.lastName} onChange={(event) => update('lastName', event.target.value)} />
          <Input label="Correo electronico" type="email" required value={form.email} onChange={(event) => update('email', event.target.value)} />
          <Input label="Telefono" required value={form.phone} onChange={(event) => update('phone', event.target.value)} />
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">Genero</span>
            <select className="h-11 w-full rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" value={form.gender} onChange={(event) => update('gender', event.target.value)}>
              <option>Femenino</option>
              <option>Masculino</option>
              <option>Prefiero no indicar</option>
            </select>
          </label>
          <Input label="Edad" type="number" min="18" required value={form.age} onChange={(event) => update('age', event.target.value)} />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => onClose()}>Cancelar</Button>
          <Button type="submit">{isEditing ? 'Guardar cambios' : 'Agregar miembro'}</Button>
        </div>
      </form>
    </div>
  );
}
