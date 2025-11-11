import DataTable from '../DataTable';
import CurrencyDisplay from '../CurrencyDisplay';
import StatusBadge from '../StatusBadge';

export default function DataTableExample() {
  // todo: remove mock functionality
  const transactionData = [
    {
      id: 'TXN001',
      date: '2024-01-15',
      description: 'Office Supplies',
      category: 'Purchases',
      amount: -5500,
      status: 'completed'
    },
    {
      id: 'TXN002', 
      date: '2024-01-14',
      description: 'Product Sale',
      category: 'Sales',
      amount: 12000,
      status: 'completed'
    },
    {
      id: 'TXN003',
      date: '2024-01-13', 
      description: 'Inventory Purchase',
      category: 'Purchases',
      amount: -8500,
      status: 'pending'
    }
  ];

  const stockData = [
    {
      id: 'ITM002',
      name: 'USB Cable',
      category: 'Accessories', 
      quantity: 12,
      price: 800,
      status: 'low'
    },
    {
      id: 'ITM003',
      name: 'Laptop Stand',
      category: 'Accessories',
      quantity: 0,
      price: 2500,
      status: 'out-of-stock'
    }
  ];

  const transactionColumns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'description', label: 'Description' },
    { key: 'category', label: 'Category' },
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
    { key: 'id', label: 'Item ID', sortable: true },
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category' },
    { key: 'quantity', label: 'Quantity', sortable: true },
    { 
      key: 'price', 
      label: 'Unit Price', 
      sortable: true,
      render: (value: number) => <CurrencyDisplay amount={value} />
    },
    { 
      key: 'status', 
      label: 'Stock Status',
      render: (value: string) => <StatusBadge status={value as any} />
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <DataTable
        title="Recent Transactions"
        data={transactionData}
        columns={transactionColumns}
        onRowClick={(row) => console.log('Transaction clicked:', row)}
      />
      <DataTable
        title="Stock Inventory"
        data={stockData}
        columns={stockColumns}
        onRowClick={(row) => console.log('Stock item clicked:', row)}
      />
    </div>
  );
}