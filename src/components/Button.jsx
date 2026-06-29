import { Loader2 } from 'lucide-react';

export default function Button({ children, variant = 'primary', className = '', loading = false, ...props }) {
  const variants = {
    primary: 'bg-lbc-red text-white hover:bg-lbc-redDark shadow-sm',
    secondary: 'bg-lbc-blue text-white hover:bg-lbc-blueLight shadow-sm',
    outline: 'border border-slate-200 bg-white text-lbc-blue hover:border-lbc-red hover:text-lbc-red',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
  };

  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
