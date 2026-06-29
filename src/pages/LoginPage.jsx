import { useState } from 'react';
import { CheckCircle2, KeyRound, ShieldCheck, UsersRound } from 'lucide-react';
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
    <main className="min-h-screen bg-lbc-gray">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex items-center px-5 py-10 md:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-wide text-lbc-red">La Boliviana Ciacruz Seguros</p>
              <h1 className="mt-3 text-4xl font-bold text-lbc-blue md:text-5xl">Plataforma de Gestion de Grupos</h1>
              <p className="mt-4 text-lg text-slate-600">Canales digitales para la distribucion de polizas</p>
            </div>
            <form onSubmit={submit} className="rounded-lg border border-slate-100 bg-white p-6 shadow-soft">
              <div className="space-y-4">
                <Input label="Usuario" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@lbc.bo" />
                <Input label="Contrasena" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="demo123" />
              </div>
              <div className="mt-5 rounded-md bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-bold text-lbc-blue">Credenciales demo</p>
                <p>Usuario: admin@lbc.bo</p>
                <p>Contrasena: demo123</p>
              </div>
              {message && <div className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-lbc-red">{message}</div>}
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
        <aside className="flex items-center bg-lbc-blue px-5 py-10 text-white md:px-10 lg:px-16">
          <div className="mx-auto max-w-lg">
            <p className="text-sm font-bold uppercase tracking-wide text-red-200">Seguros para toda la vida</p>
            <h2 className="mt-3 text-3xl font-bold">Cada grupo representa una oportunidad comercial segmentada</h2>
            <div className="mt-8 grid gap-4">
              {[
                ['Gestion centralizada de grupos', UsersRound],
                ['Afiliacion digital mediante QR', CheckCircle2],
                ['Segmentacion por tipo de poliza', ShieldCheck],
                ['Corredores responsables por grupo', KeyRound],
              ].map(([label, Icon]) => (
                <div key={label} className="flex items-center gap-4 rounded-lg border border-white/15 bg-white/8 p-4">
                  <div className="rounded-md bg-white/10 p-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-semibold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
