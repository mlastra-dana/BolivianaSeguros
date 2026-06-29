import { useState } from 'react';
import { CheckCircle2, KeyRound, ShieldCheck, UsersRound } from 'lucide-react';
import BrandMark from '../components/BrandMark.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const useDemo = () => {
    setEmail('admin@lbc.bo');
    setPassword('demo123');
    setMessage('Credenciales demo listas para ingresar.');
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
    <main className="min-h-screen bg-white text-lbc-ink">
      <div className="grid min-h-screen lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative flex items-center px-5 py-10 md:px-10 lg:px-16">
          <div className="absolute left-5 right-5 top-6 hidden items-center justify-between rounded-full bg-white px-8 py-5 shadow-pill md:flex">
            <span className="font-bold text-lbc-blue/70">Buscar seguros</span>
            <BrandMark compact />
            <span className="font-bold text-lbc-blue">Espacio del cliente</span>
          </div>
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-8 pt-16 md:pt-24">
              <div className="mb-8 md:hidden">
                <BrandMark />
              </div>
              <p className="text-sm font-black uppercase tracking-wide text-blue-600">La Boliviana Ciacruz Seguros</p>
              <h1 className="mt-3 text-4xl font-black leading-tight text-lbc-ink md:text-6xl">Plataforma de Gestion de Grupos</h1>
              <div className="mt-5 h-1.5 w-28 rounded-full bg-lbc-green" />
              <p className="mt-6 text-lg font-semibold leading-8 text-lbc-blue">Canales digitales para la distribucion de polizas</p>
            </div>
            <form onSubmit={submit} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-pill">
              <div className="space-y-4">
                <Input label="Usuario" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@lbc.bo" />
                <Input label="Contrasena" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="demo123" />
              </div>
              <div className="mt-5 rounded-2xl bg-lbc-gray p-4 text-sm text-lbc-blue">
                <p className="font-black text-lbc-ink">Credenciales demo</p>
                <p>Usuario: admin@lbc.bo</p>
                <p>Contrasena: demo123</p>
              </div>
              {message && <div className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">{message}</div>}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button type="button" variant="outline" onClick={useDemo}>
                  <KeyRound className="h-4 w-4" />
                  Usar credenciales demo
                </Button>
                <Button type="submit">Ingresar</Button>
              </div>
            </form>
          </div>
        </section>
        <aside className="relative flex items-center overflow-hidden bg-lbc-blue px-5 py-10 text-white md:px-10 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(135deg,rgba(20,26,45,0.14),rgba(20,26,45,0.45))]" />
          <div className="absolute -bottom-20 -right-12 h-72 w-72 rounded-full border border-white/10" />
          <div className="mx-auto max-w-lg">
            <div className="relative">
            <BrandMark inverse />
            <p className="mt-10 text-sm font-bold uppercase tracking-wide text-white/70">Seguros para toda la vida</p>
            <h2 className="mt-3 text-4xl font-black leading-tight">Cada grupo representa una oportunidad comercial segmentada</h2>
            <div className="mt-5 h-1.5 w-24 rounded-full bg-lbc-green" />
            <div className="mt-8 grid gap-4">
              {[
                ['Gestion centralizada de grupos', UsersRound],
                ['Afiliacion digital mediante QR', CheckCircle2],
                ['Segmentacion por tipo de poliza', ShieldCheck],
                ['Corredores responsables por grupo', KeyRound],
              ].map(([label, Icon]) => (
                <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4">
                  <div className="rounded-full bg-white/10 p-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-semibold">{label}</p>
                </div>
              ))}
            </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
