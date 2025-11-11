import { useState } from "react";
import DataTable from "@/components/DataTable";
import CurrencyDisplay from "@/components/CurrencyDisplay";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Download, Package, AlertTriangle } from "lucide-react";

export default function Stock() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // todo: remove mock functionality
  const stockData = [
    {
      id: 'ITM001',
      name: 'Wireless Headphones',
      category: 'Accessories',
      quantity: 45,
      minQuantity: 10,
      unitCost: 3500,
      sellingPrice: 4500,
      totalValue: 157500,
      status: 'high',
      supplier: 'Tech Supplies Co.',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'ITM002',
      name: 'USB Cable Type-C',
      category: 'Accessories',
      quantity: 8,
      minQuantity: 20,
      unitCost: 800,
      sellingPrice: 1200,
      totalValue: 6400,
      status: 'low',
      supplier: 'Digital World',
      lastUpdated: '2024-01-14'
    },
    {
      id: 'ITM003',
      name: 'Laptop Stand',
      category: 'Accessories',
      quantity: 0,
      minQuantity: 5,
      unitCost: 2500,
      sellingPrice: 3500,
      totalValue: 0,
      status: 'out-of-stock',
      supplier: 'Tech Accessories',
      lastUpdated: '2024-01-13'
    },
    {
      id: 'ITM004',
      name: 'Wireless Mouse',
      category: 'Accessories',
      quantity: 25,
      minQuantity: 15,
      unitCost: 2500,
      sellingPrice: 3000,
      totalValue: 62500,
      status: 'medium',
      supplier: 'Computer Store',
      lastUpdated: '2024-01-12'
    },
    {
      id: 'ITM005',
      name: 'Phone Cases',
      category: 'Accessories',
      quantity: 120,
      minQuantity: 30,
      unitCost: 1200,
      sellingPrice: 1500,
      totalValue: 144000,
      status: 'high',
      supplier: 'Mobile Hub',
      lastUpdated: '2024-01-11'
    },
    {
      id: 'ITM006',
      name: 'Bluetooth Speaker',
      category: 'Accessories',
      quantity: 15,
      minQuantity: 10,
      unitCost: 5500,
      sellingPrice: 7000,
      totalValue: 82500,
      status: 'medium',
      supplier: 'Tech Supplies Co.',
      lastUpdated: '2024-01-10'
    }
  ];

  const stockColumns = [
    { key: 'id', label: 'Item ID', sortable: true },
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'quantity', label: 'Current Stock', sortable: true },
    { key: 'minQuantity', label: 'Min. Required', sortable: true },
    { 
      key: 'unitCost', 
      label: 'Cost Price', 
      sortable: true,
      render: (value: number) => <CurrencyDisplay amount={value} />
    },
    { 
      key: 'sellingPrice', 
      label: 'Selling Price', 
      sortable: true,
      render: (value: number) => <CurrencyDisplay amount={value} />
    },
    { 
      key: 'totalValue', 
      label: 'Total Value', 
      sortable: true,
      render: (value: number) => <CurrencyDisplay amount={value} />
    },
    { 
      key: 'status', 
      label: 'Stock Status',
      render: (value: string) => <StatusBadge status={value as any} />
    }
  ];

  const filteredData = stockData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = stockData.length;
  const totalValue = stockData.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = stockData.filter(item => item.status === 'low' || item.status === 'out-of-stock').length;
  const outOfStockItems = stockData.filter(item => item.status === 'out-of-stock').length;

  return (
    <div className="p-6 space-y-6" data-testid="stock-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Stock Management</h1>
          <p className="text-muted-foreground">
            Monitor inventory levels and manage your stock efficiently
          </p>
        </div>
        <Button data-testid="button-add-stock">
          <Package className="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Unique products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CurrencyDisplay amount={totalValue} />
            </div>
            <p className="text-xs text-muted-foreground">
              Current inventory value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Items need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Immediate reorder required
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-stock"
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

      {/* Stock Table */}
      <DataTable
        title="Inventory Items"
        data={filteredData}
        columns={stockColumns}
        onRowClick={(row) => console.log('Stock item clicked:', row)}
      />
    </div>
  );
}