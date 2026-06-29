import { Copy, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';

function QRGrid({ seed }) {
  const cells = Array.from({ length: 121 }, (_, index) => {
    const isCorner =
      (index < 33 && index % 11 < 3) ||
      (index < 33 && index % 11 > 7) ||
      (index > 87 && index % 11 < 3);
    const active = isCorner || ((index * 17 + seed.length * 13 + seed.charCodeAt(index % seed.length)) % 5 < 2);
    return <span key={index} className={`aspect-square rounded-[2px] ${active ? 'bg-lbc-blue' : 'bg-white'}`} />;
  });
  return <div className="grid w-40 grid-cols-11 gap-1 rounded-lg border-8 border-white bg-white shadow-inner">{cells}</div>;
}

export default function QRCard({ group, onCopy }) {
  const url = `https://lbc.bo/afiliacion/${group.slug}`;

  return (
    <article className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-bold text-lbc-blue">QR de afiliacion</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Comparte este codigo QR para que nuevos integrantes puedan afiliarse digitalmente al grupo y participar en el programa asociado a {group.policyType}.
      </p>
      <div className="mt-5 flex flex-col items-center rounded-lg bg-slate-50 p-5">
        <QRGrid seed={group.slug} />
        <p className="mt-4 break-all text-center text-xs font-semibold text-slate-500">{url}</p>
      </div>
      <div className="mt-5 grid gap-3">
        <Button variant="outline" onClick={() => onCopy(url)}>
          <Copy className="h-4 w-4" />
          Copiar enlace de afiliacion
        </Button>
        <Button variant="outline" onClick={() => onCopy('QR listo para compartir.')}>
          <Download className="h-4 w-4" />
          Descargar QR
        </Button>
        <Link
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-lbc-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-lbc-blueLight"
          to={`/affiliation/${group.slug}`}
        >
          <ExternalLink className="h-4 w-4" />
          Ver formulario de afiliacion
        </Link>
      </div>
    </article>
  );
}
