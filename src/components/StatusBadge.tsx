import { TrackingStatus } from '@/lib/types/tracking';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      status: {
        posted: 'bg-blue-100 text-blue-800 border border-blue-200',
        in_transit: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        out_for_delivery: 'bg-orange-100 text-orange-800 border border-orange-200',
        delivered: 'bg-success-100 text-success-800 border border-success-200',
        exception: 'bg-danger-100 text-danger-800 border border-danger-200',
        unknown: 'bg-gray-100 text-gray-800 border border-gray-200',
      },
    },
    defaultVariants: {
      status: 'unknown',
    },
  }
);

const statusLabels: Record<TrackingStatus, string> = {
  posted: 'Postado',
  in_transit: 'Em trânsito',
  out_for_delivery: 'Saiu para entrega',
  delivered: 'Entregue',
  exception: 'Problema',
  unknown: 'Desconhecido',
};

interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
  status: TrackingStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={clsx(badgeVariants({ status }), className)}>
      {statusLabels[status]}
    </span>
  );
}