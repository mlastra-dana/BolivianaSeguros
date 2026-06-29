import { Loader2 } from 'lucide-react';

export default function Button({ children, variant = 'primary', className = '', loading = false, ...props }) {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
    secondary: 'bg-lbc-blue text-white hover:bg-lbc-blueLight shadow-sm',
    outline: 'border border-lbc-blue/25 bg-white text-lbc-ink hover:border-blue-500 hover:text-blue-600',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
