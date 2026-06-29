import { useEffect, useState } from 'react';
import { CreditCard, KeyRound, Search } from 'lucide-react';
import BrandMark from '../components/BrandMark.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

const ACCESS_USER = 'administrador';
const ACCESS_PASSWORD = 'LBC#7Qm92!2026';
const POLICY_SERVICES = ['Accidentes', 'Hogar', 'Auto'];

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [serviceIndex, setServiceIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setServiceIndex((current) => (current + 1) % POLICY_SERVICES.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  const useDemo = () => {
    setEmail(ACCESS_USER);
    setPassword(ACCESS_PASSWORD);
    setMessage('Credenciales listas para ingresar.');
  };

  const submit = (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMessage('Completa usuario y contrasena para continuar.');
      return;
    }
    onLogin();
  };

  return (
    <main className="min-h-screen bg-lbc-gray px-5 py-6 text-lbc-ink md:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
        <header className="grid min-h-24 grid-cols-1 items-center rounded-full bg-white px-8 py-4 text-lbc-blue shadow-pill md:grid-cols-[1fr_1.25fr_1fr_1fr_1fr] md:px-10">
          <div className="hidden min-w-40 items-center gap-3 text-lg font-bold text-lbc-blue/70 md:flex">
            <Search className="h-6 w-6" />
            <span key={POLICY_SERVICES[serviceIndex]} className="inline-block min-w-28 transition-opacity duration-300">
              {POLICY_SERVICES[serviceIndex]}
            </span>
          </div>
          <div className="hidden items-center justify-center gap-3 text-lg font-bold text-lbc-blue md:flex">
            <CreditCard className="h-6 w-6" />
            Espacio del cliente
          </div>
          <div className="flex justify-center">
            <BrandMark size="xl" />
          </div>
          <div className="hidden justify-center text-lg font-bold text-lbc-blue md:flex">Asegurate en linea</div>
          <div className="hidden justify-end text-lg font-bold text-lbc-blue md:flex">Sobre nosotros</div>
        </header>

        <section className="flex flex-1 items-center justify-center py-8 md:py-12">
          <div className="w-full max-w-xl">
            <div className="mb-6 text-center">
              <p className="text-sm font-black uppercase tracking-wide text-blue-600">Plataforma de Gestion de Grupos</p>
              <h1 className="mt-3 text-3xl font-black leading-tight text-lbc-ink md:text-4xl">Acceso</h1>
              <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-lbc-green" />
            </div>
            <form onSubmit={submit} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-pill">
              <div className="space-y-4">
                <Input label="Usuario" type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={ACCESS_USER} />
                <Input label="Contrasena" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={ACCESS_PASSWORD} />
              </div>
              <div className="mt-5 rounded-2xl bg-lbc-gray p-4 text-sm text-lbc-blue">
                <p className="font-black text-lbc-ink">Credenciales</p>
                <p>Usuario: {ACCESS_USER}</p>
                <p>Contrasena: {ACCESS_PASSWORD}</p>
              </div>
              {message && <div className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">{message}</div>}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button type="button" variant="outline" onClick={useDemo}>
                  <KeyRound className="h-4 w-4" />
                  Usar credenciales
                </Button>
                <Button type="submit">Ingresar</Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
