export default function BrandMark({ inverse = false, compact = false }) {
  return (
    <div className={`flex items-center gap-3 ${inverse ? 'text-white' : 'text-lbc-ink'}`}>
      <div className={`font-black italic leading-none tracking-tight ${compact ? 'text-3xl' : 'text-4xl'}`}>LBC</div>
      <div className="leading-tight">
        <p className={`text-xs font-black uppercase tracking-wide ${inverse ? 'text-white' : 'text-lbc-ink'}`}>La Boliviana</p>
        <p className={`text-xs font-bold ${inverse ? 'text-white/80' : 'text-lbc-blue'}`}>Ciacruz Seguros</p>
      </div>
    </div>
  );
}
