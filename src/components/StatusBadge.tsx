import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'active' | 'offline' | 'maintenance' | 'inactive';
  className?: string;
}

const statusConfig = {
  active: {
    label: 'Aktif',
    className: 'bg-success text-success-foreground hover:bg-success/80',
    icon: '●'
  },
  offline: {
    label: 'GPS Off',
    className: 'bg-danger text-danger-foreground hover:bg-danger/80',
    icon: '●'
  },
  maintenance: {
    label: 'Perbaikan',
    className: 'bg-warning text-warning-foreground hover:bg-warning/80',
    icon: '●'
  },
  inactive: {
    label: 'Tidak Aktif',
    className: 'bg-muted text-muted-foreground hover:bg-muted/80',
    icon: '●'
  }
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <Badge className={cn(config.className, 'gap-1', className)}>
      <span className="animate-pulse">{config.icon}</span>
      {config.label}
    </Badge>
  );
};