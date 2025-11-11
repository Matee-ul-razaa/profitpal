import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: 'high' | 'medium' | 'low' | 'out-of-stock' | 'in-stock' | 'profit' | 'loss';
  label?: string;
  className?: string;
}

export default function StatusBadge({ status, label, className = "" }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'high':
        return { variant: 'default' as const, color: 'bg-chart-2 text-white', text: label || 'High Stock' };
      case 'medium':
        return { variant: 'secondary' as const, color: 'bg-chart-3 text-black', text: label || 'Medium Stock' };
      case 'low':
        return { variant: 'destructive' as const, color: 'bg-chart-3 text-black', text: label || 'Low Stock' };
      case 'out-of-stock':
        return { variant: 'destructive' as const, color: '', text: label || 'Out of Stock' };
      case 'in-stock':
        return { variant: 'default' as const, color: '', text: label || 'In Stock' };
      case 'profit':
        return { variant: 'default' as const, color: 'bg-chart-2 text-white', text: label || 'Profit' };
      case 'loss':
        return { variant: 'destructive' as const, color: '', text: label || 'Loss' };
      default:
        return { variant: 'secondary' as const, color: '', text: label || status };
    }
  };

  const config = getStatusConfig();
  
  return (
    <Badge 
      variant={config.variant}
      className={`${config.color} ${className}`}
      data-testid={`status-badge-${status}`}
    >
      {config.text}
    </Badge>
  );
}