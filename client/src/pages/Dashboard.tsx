import MetricCard from "@/components/MetricCard";
import DataTable from "@/components/DataTable";
import CurrencyDisplay from "@/components/CurrencyDisplay";
import StatusBadge from "@/components/StatusBadge";
import TransactionForm from "@/components/TransactionForm";
import { DollarSign, ShoppingCart, Package, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // todo: remove mock functionality
  const recentTransactions = [
    {
      id: 'TXN001',
      date: '2024-01-15',
      description: 'Mobile Accessories Purchase',
      type: 'Purchase',
      amount: -5500,
      status: 'completed'
    },
    {
      id: 'TXN002', 
      date: '2024-01-14',
      description: 'Laptop Sale',
      type: 'Sale',
      amount: 12000,
      status: 'completed'
    },
    {
      id: 'TXN003',
      date: '2024-01-13', 
      description: 'Mobile Inventory Restock',
      type: 'Purchase',
      amount: -8500,
      status: 'pending'
    },
    {
      id: 'TXN004',
      date: '2024-01-12',
      description: 'Mobile Accessories Sale',
      type: 'Sale',
      amount: 3200,
      status: 'completed'
    }
  ];

  const lowStockItems = [
    {
      id: 'ITM001',
      name: 'USB Cable Type-C',
      category: 'Accessories',
      quantity: 5,
      threshold: 10,
      price: 800
    },
    {
      id: 'ITM002',
      name: 'Wireless Mouse',
      category: 'Accessories', 
      quantity: 2,
      threshold: 15,
      price: 2500
    },
    {
      id: 'ITM003',
      name: 'Screen Protector',
      category: 'Accessories',
      quantity: 0,
      threshold: 20,
      price: 500
    }
  ];

  const transactionColumns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'description', label: 'Description' },
    { key: 'type', label: 'Type' },
    { 
      key: 'amount', 
      label: 'Amount', 
      sortable: true,
      render: (value: number) => <CurrencyDisplay amount={value} showSign />
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <StatusBadge 
          status={value === 'completed' ? 'profit' : 'loss'} 
          label={value} 
        />
      )
    }
  ];

  const stockColumns = [
    { key: 'name', label: 'Item Name', sortable: true },
    { key: 'category', label: 'Category' },
    { key: 'quantity', label: 'Stock', sortable: true },
    { key: 'threshold', label: 'Min. Required' },
    { 
      key: 'price', 
      label: 'Unit Price', 
      render: (value: number) => <CurrencyDisplay amount={value} />
    }
  ];

  const handleTransactionSubmit = (data: any) => {
    console.log('New transaction:', data);
  };

  return (
    <div className="p-6 space-y-6" data-testid="dashboard-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your business performance and recent activities
          </p>
        </div>
        <div className="flex gap-2">
          <TransactionForm type="purchase" onSubmit={handleTransactionSubmit} />
          <TransactionForm type="sale" onSubmit={handleTransactionSubmit} />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          title="Net Profit"
          value={40000}
          isCurrency
          change={15.8}
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataTable
          title="Recent Transactions"
          data={recentTransactions}
          columns={transactionColumns}
          onRowClick={(row) => console.log('Transaction clicked:', row)}
        />
        
        <DataTable
          title="Low Stock Alerts"
          data={lowStockItems}
          columns={stockColumns}
          onRowClick={(row) => console.log('Stock item clicked:', row)}
        />
      </div>
    </div>
  );
}