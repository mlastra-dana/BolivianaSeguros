export default function BrandMark({ inverse = false, compact = false, size, className = '' }) {
  const selectedSize = size || (compact ? 'md' : 'lg');
  const heights = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
    xl: 'h-24',
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src="/brand/logo-lbc-seguros-2026.svg"
        alt="La Boliviana Ciacruz Seguros"
        className={`${heights[selectedSize]} w-auto object-contain ${inverse ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
}
