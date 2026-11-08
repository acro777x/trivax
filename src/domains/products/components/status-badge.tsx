import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'built' | 'pilot' | 'dev' | 'prototype' | 'spec';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = 'dev',
  className = '',
}) => {
  // Safe token colors per 03 / 08 (primary for built, amber-neutral for dev, cyan for pilot, purple for spec)
  const styles = {
    built: {
      bg: 'bg-primary/10',
      border: 'border-primary/40',
      text: 'text-primary',
      dot: 'bg-primary',
    },
    prototype: {
      bg: 'bg-primary-mid/15',
      border: 'border-primary-mid/35',
      text: 'text-[#8ee042]',
      dot: 'bg-primary-mid',
    },
    pilot: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-300',
      dot: 'bg-emerald-400',
    },
    dev: {
      bg: 'bg-amber-400/10',
      border: 'border-amber-400/30',
      text: 'text-amber-300',
      dot: 'bg-amber-400',
    },
    spec: {
      bg: 'bg-sky-400/10',
      border: 'border-sky-400/30',
      text: 'text-sky-300',
      dot: 'bg-sky-400',
    },
  }[type] || {
    bg: 'bg-white/5',
    border: 'border-white/20',
    text: 'text-text-muted',
    dot: 'bg-primary',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${styles.bg} ${styles.border} ${styles.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      <span>{status}</span>
    </span>
  );
};

export default StatusBadge;
