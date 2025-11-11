import { useState } from "react";
import DataTable from "@/components/DataTable";
import CurrencyDisplay from "@/components/CurrencyDisplay";
import StatusBadge from "@/components/StatusBadge";
import TransactionForm from "@/components/TransactionForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Download } from "lucide-react";

export default function Purchases() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // todo: remove mock functionality
  const purchaseData = [
    {
      id: 'PUR001',
      date: '2024-01-15',
      supplier: 'Tech Supplies Co.',
      itemName: 'Wireless Headphones',
      category: 'Accessories',
      quantity: 25,
      unitPrice: 3500,
      totalAmount: 87500,
      status: 'completed',
      description: 'Bulk purchase for inventory'
    },
    {
      id: 'PUR002',
      date: '2024-01-14',
      supplier: 'Mobile World',
      itemName: 'Smartphones',
      category: 'Mobiles',
      quantity: 15,
      unitPrice: 45000,
      totalAmount: 675000,
      status: 'pending',
      description: 'Latest smartphone models'
    },
    {
      id: 'PUR003',
      date: '2024-01-13',
      supplier: 'Digital World',
      itemName: 'USB Cables',
      category: 'Accessories',
      quantity: 100,
      unitPrice: 800,
      totalAmount: 80000,
      status: 'completed',
      description: 'Accessory stock replenishment'
    },
    {
      id: 'PUR004',
      date: '2024-01-12',
      supplier: 'Mobile Hub',
      itemName: 'Phone Cases',
      category: 'Accessories',
      quantity: 50,
      unitPrice: 1200,
      totalAmount: 60000,
      status: 'completed',
      description: 'Popular items restock'
    },
    {
      id: 'PUR005',
      date: '2024-01-11',
      supplier: 'Computer Store',
      itemName: 'Gaming Laptops',
      category: 'Laptops',
      quantity: 5,
      unitPrice: 85000,
      totalAmount: 425000,
      status: 'completed',
      description: 'High-value inventory addition'
    }
  ];

  const purchaseColumns = [
    { key: 'id', label: 'Purchase ID', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'supplier', label: 'Supplier', sortable: true },
    { key: 'itemName', label: 'Item Name', sortable: true },
    { key: 'category', label: 'Category' },
    { key: 'quantity', label: 'Qty', sortable: true },
    { 
      key: 'unitPrice', 
      label: 'Unit Price', 
      sortable: true,
      render: (value: number) => <CurrencyDisplay amount={value} />
    },
    { 
      key: 'totalAmount', 
      label: 'Total Amount', 
      sortable: true,
      render: (value: number) => <CurrencyDisplay amount={value} />
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

  const filteredData = purchaseData.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPurchases = purchaseData.reduce((sum, item) => sum + item.totalAmount, 0);
  const completedPurchases = purchaseData.filter(item => item.status === 'completed').length;
  const pendingPurchases = purchaseData.filter(item => item.status === 'pending').length;

  const handlePurchaseSubmit = (data: any) => {
    console.log('New purchase added:', data);
  };

  return (
    <div className="p-6 space-y-6" data-testid="purchases-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Purchases</h1>
          <p className="text-muted-foreground">
            Manage and track all your purchase transactions
          </p>
        </div>
        <TransactionForm type="purchase" onSubmit={handlePurchaseSubmit} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CurrencyDisplay amount={totalPurchases} />
            </div>
            <p className="text-xs text-muted-foreground">
              From {purchaseData.length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedPurchases}</div>
            <p className="text-xs text-muted-foreground">
              Successful transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPurchases}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search purchases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-purchases"
          />
        </div>
        <Button variant="outline" data-testid="button-filter">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" data-testid="button-export">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Purchase History Table */}
      <DataTable
        title="Purchase History"
        data={filteredData}
        columns={purchaseColumns}
        onRowClick={(row) => console.log('Purchase clicked:', row)}
      />
    </div>
  );
}