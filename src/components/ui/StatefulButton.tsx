import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

export interface StatefulButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  status?: 'idle' | 'loading' | 'success';
  children: React.ReactNode;
  loadingText?: string;
  successText?: string;
  className?: string;
}

export const StatefulButton: React.FC<StatefulButtonProps> = ({
  onClick,
  status: controlledStatus,
  children,
  loadingText = 'Opening your email...',
  successText = 'Done',
  className = '',
  disabled,
  ...rest
}) => {
  const [internalStatus, setInternalStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const status = controlledStatus ?? internalStatus;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (controlledStatus !== undefined) {
      if (onClick) onClick(e);
      return;
    }
    if (status !== 'idle' || disabled) return;
    setInternalStatus('loading');
    try {
      if (onClick) {
        await onClick(e);
      }
      setInternalStatus('success');
      setTimeout(() => {
        setInternalStatus('idle');
      }, 2500);
    } catch {
      setInternalStatus('idle');
    }
  };

  return (
    <button
      type="submit"
      disabled={disabled || status === 'loading'}
      aria-busy={status === 'loading'}
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-display font-semibold text-sm transition-all duration-200 cursor-target outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        status === 'success'
          ? 'bg-primary text-primary-ink font-bold shadow-[0_0_20px_rgba(168,230,46,0.5)]'
          : 'bg-primary text-primary-ink hover:brightness-105 active:scale-95 shadow-[0_0_15px_rgba(168,230,46,0.3)]'
      } ${className}`}
      {...rest}
    >
      {status === 'loading' && (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-primary-ink" />
          <span>{loadingText}</span>
        </>
      )}
      {status === 'success' && (
        <>
          <Check className="w-4 h-4 stroke-[3] text-primary-ink" />
          <span>{successText}</span>
        </>
      )}
      {status === 'idle' && children}
    </button>
  );
};

export default StatefulButton;
