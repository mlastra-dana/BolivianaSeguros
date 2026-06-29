import { useEffect, useState } from 'react';
import { Copy, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import Button from './Button.jsx';

export default function QRCard({ group, onCopy }) {
  const url = `https://lbc.bo/afiliacion/${group.slug}`;
  const [qrImage, setQrImage] = useState('');

  useEffect(() => {
    let active = true;

    QRCode.toDataURL(url, {
      errorCorrectionLevel: 'M',
      margin: 2,
      scale: 8,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    }).then((image) => {
      if (active) setQrImage(image);
    });

    return () => {
      active = false;
    };
  }, [url]);

  return (
    <article className="rounded-3xl bg-white p-6 shadow-pill">
      <h2 className="text-2xl font-black text-lbc-ink">QR de afiliacion</h2>
      <div className="mt-5 flex flex-col items-center">
        <div className="bg-white p-2">
          {qrImage ? (
            <img src={qrImage} alt={`QR de afiliacion para ${group.name}`} className="h-64 w-64 object-contain" />
          ) : (
            <div className="h-64 w-64 animate-pulse bg-slate-100" />
          )}
        </div>
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
