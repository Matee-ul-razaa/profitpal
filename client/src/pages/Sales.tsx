import { useState } from "react";
import DataTable from "@/components/DataTable";
import CurrencyDisplay from "@/components/CurrencyDisplay";
import StatusBadge from "@/components/StatusBadge";
import TransactionForm from "@/components/TransactionForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Download, TrendingUp } from "lucide-react";

export default function Sales() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // todo: remove mock functionality
  const salesData = [
    {
      id: 'SAL001',
      date: '2024-01-15',
      customer: 'Ahmad Khan',
      itemName: 'Wireless Headphones',
      category: 'Accessories',
      quantity: 2,
      unitPrice: 4500,
      totalAmount: 9000,
      profit: 2000,
      status: 'completed',
      paymentMethod: 'Cash'
    },
    {
      id: 'SAL002',
      date: '2024-01-14',
      customer: 'Fatima Ali',
      itemName: 'Phone Case',
      category: 'Accessories',
      quantity: 3,
      unitPrice: 1500,
      totalAmount: 4500,
      profit: 900,
      status: 'completed',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'SAL003',
      date: '2024-01-13',
      customer: 'Hassan Sheikh',
      itemName: 'USB Cable',
      category: 'Accessories',
      quantity: 5,
      unitPrice: 1200,
      totalAmount: 6000,
      profit: 2000,
      status: 'pending',
      paymentMethod: 'Cash'
    },
    {
      id: 'SAL004',
      date: '2024-01-12',
      customer: 'Ayesha Ahmed',
      itemName: 'Gaming Laptop',
      category: 'Laptops',
      quantity: 1,
      unitPrice: 95000,
      totalAmount: 95000,
      profit: 10000,
      status: 'completed',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'SAL005',
      date: '2024-01-11',
      customer: 'Muhammad Rizwan',
      itemName: 'Wireless Mouse',
      category: 'Accessories',
      quantity: 4,
      unitPrice: 3000,
      totalAmount: 12000,
      profit: 2000,
      status: 'completed',
      paymentMethod: 'Cash'
    }
  ];

  const salesColumns = [
    { key: 'id', label: 'Sale ID', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
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
      key: 'profit', 
      label: 'Profit', 
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

  const filteredData = salesData.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSales = salesData.reduce((sum, item) => sum + item.totalAmount, 0);
  const totalProfit = salesData.reduce((sum, item) => sum + item.profit, 0);
  const completedSales = salesData.filter(item => item.status === 'completed').length;
  const pendingSales = salesData.filter(item => item.status === 'pending').length;

  const handleSaleSubmit = (data: any) => {
    console.log('New sale recorded:', data);
  };

  return (
    <div className="p-6 space-y-6" data-testid="sales-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sales</h1>
          <p className="text-muted-foreground">
            Track and manage all your sales transactions and revenue
          </p>
        </div>
        <TransactionForm type="sale" onSubmit={handleSaleSubmit} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CurrencyDisplay amount={totalSales} />
            </div>
            <p className="text-xs text-muted-foreground">
              From {salesData.length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">
              <CurrencyDisplay amount={totalProfit} />
            </div>
            <p className="text-xs text-muted-foreground">
              Net profit margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSales}</div>
            <p className="text-xs text-muted-foreground">
              Successful sales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingSales}</div>
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
            placeholder="Search sales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-sales"
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

      {/* Sales History Table */}
      <DataTable
        title="Sales History"
        data={filteredData}
        columns={salesColumns}
        onRowClick={(row) => console.log('Sale clicked:', row)}
      />
    </div>
  );
}