import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import Badge from '../components/Badge.jsx';
import BrandMark from '../components/BrandMark.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

export default function PublicAffiliationPage({ groups }) {
  const { groupSlug } = useParams();
  const group = groups.find((item) => item.slug === groupSlug);
  const [sent, setSent] = useState(false);
  const [accepted, setAccepted] = useState(false);

  if (!group) return <Navigate to="/login" replace />;

  const submit = (event) => {
    event.preventDefault();
    if (accepted) setSent(true);
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-lbc-ink md:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-full bg-white px-6 py-4 shadow-pill">
          <Link to="/login"><BrandMark compact /></Link>
          <Badge>{group.policyType}</Badge>
        </header>
        <section className="grid overflow-hidden rounded-3xl bg-white shadow-pill lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-lbc-blue p-8 text-white md:p-10">
            <ShieldCheck className="h-10 w-10 text-white" />
            <h1 className="mt-5 text-4xl font-black leading-tight">{group.name}</h1>
            <div className="mt-5 h-1.5 w-24 rounded-full bg-lbc-green" />
            <p className="mt-6 text-lg font-medium leading-8 text-white/75">{group.policyType}</p>
          </div>
          <div className="p-6 md:p-10">
            {sent ? (
              <div className="flex min-h-96 flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-14 w-14 text-lbc-green" />
                <h2 className="mt-5 text-3xl font-black text-lbc-ink">Afiliacion registrada</h2>
                <p className="mt-3 max-w-md text-lbc-blue">Tu afiliacion ha sido registrada exitosamente. Un corredor de La Boliviana Ciacruz podra contactarte para brindarte mas informacion.</p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h2 className="text-3xl font-black text-lbc-ink">Formulario de afiliacion</h2>
                <div className="mt-3 h-1.5 w-20 rounded-full bg-lbc-green" />
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <Input label="Nombre" required />
                  <Input label="Apellidos" required />
                  <Input label="Correo electronico" type="email" required />
                  <Input label="Telefono" required />
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-slate-700">Genero</span>
                    <select className="h-11 w-full rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" required>
                      <option>Femenino</option>
                      <option>Masculino</option>
                      <option>Prefiero no indicar</option>
                    </select>
                  </label>
                  <Input label="Edad" type="number" min="18" required />
                </div>
                <label className="mt-5 flex items-start gap-3 text-sm text-slate-600">
                  <input className="mt-1 h-4 w-4 accent-blue-600" type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
                  Acepto los terminos de afiliacion y autorizo el contacto comercial de La Boliviana Ciacruz.
                </label>
                <Button className="mt-6 w-full" type="submit" disabled={!accepted}>Afiliarme al grupo</Button>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
