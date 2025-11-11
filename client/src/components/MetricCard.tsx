import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CurrencyDisplay from "./CurrencyDisplay";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  isCurrency?: boolean;
  change?: number;
  changeType?: 'percentage' | 'currency';
  icon?: React.ReactNode;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  isCurrency = false,
  change,
  changeType = 'percentage',
  icon,
  className = ""
}: MetricCardProps) {
  const isPositiveChange = change !== undefined && change >= 0;
  
  return (
    <Card className={`hover-elevate ${className}`} data-testid={`metric-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isCurrency ? (
            <CurrencyDisplay amount={value} />
          ) : (
            <span data-testid="metric-value">{value.toLocaleString()}</span>
          )}
        </div>
        {change !== undefined && (
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            {isPositiveChange ? (
              <TrendingUp className="h-3 w-3 text-chart-2" />
            ) : (
              <TrendingDown className="h-3 w-3 text-destructive" />
            )}
            <Badge variant={isPositiveChange ? "default" : "destructive"} className="text-xs">
              {changeType === 'percentage' ? `${Math.abs(change)}%` : <CurrencyDisplay amount={Math.abs(change)} />}
            </Badge>
            <span>from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}