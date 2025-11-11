import MetricCard from '../MetricCard';
import { ShoppingCart, DollarSign, Package, TrendingUp } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <MetricCard
        title="Total Sales"
        value={125000}
        isCurrency
        change={12.5}
        icon={<DollarSign className="h-4 w-4" />}
      />
      <MetricCard
        title="Total Purchases"
        value={85000}
        isCurrency
        change={-5.2}
        icon={<ShoppingCart className="h-4 w-4" />}
      />
      <MetricCard
        title="Stock Items"
        value={342}
        change={8}
        changeType="currency"
        icon={<Package className="h-4 w-4" />}
      />
      <MetricCard
        title="Profit"
        value={40000}
        isCurrency
        change={15.8}
        icon={<TrendingUp className="h-4 w-4" />}
      />
    </div>
  );
}