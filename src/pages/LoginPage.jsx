import { useState } from 'react';
import { KeyRound } from 'lucide-react';
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
    <main className="min-h-screen bg-lbc-gray px-5 py-6 text-lbc-ink md:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
        <header className="flex items-center justify-center rounded-full bg-white px-8 py-5 shadow-pill">
          <BrandMark compact />
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
      </div>
    </main>
  );
}
