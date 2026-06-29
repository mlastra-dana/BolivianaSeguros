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
    return <span key={index} className={`aspect-square rounded-[2px] ${active ? 'bg-lbc-ink' : 'bg-white'}`} />;
  });
  return <div className="grid w-40 grid-cols-11 gap-1 rounded-2xl border-8 border-white bg-white shadow-inner">{cells}</div>;
}

export default function QRCard({ group, onCopy }) {
  const url = `https://lbc.bo/afiliacion/${group.slug}`;

  return (
    <article className="rounded-3xl bg-white p-6 shadow-pill">
      <h2 className="text-2xl font-black text-lbc-ink">QR de afiliacion</h2>
      <div className="mt-5 flex flex-col items-center rounded-3xl bg-lbc-gray p-6">
        <QRGrid seed={group.slug} />
        <p className="mt-4 break-all text-center text-xs font-bold text-lbc-blue">{url}</p>
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
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          to={`/affiliation/${group.slug}`}
        >
          <ExternalLink className="h-4 w-4" />
          Ver formulario de afiliacion
        </Link>
      </div>
    </article>
  );
}
