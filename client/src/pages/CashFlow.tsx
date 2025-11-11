import { useState } from "react";
import DataTable from "@/components/DataTable";
import CurrencyDisplay from "@/components/CurrencyDisplay";
import StatusBadge from "@/components/StatusBadge";
import TransactionForm from "@/components/TransactionForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, ArrowUp, ArrowDown, DollarSign } from "lucide-react";

export default function CashFlow() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  
  // todo: remove mock functionality
  const cashFlowData = [
    {
      id: 'CF001',
      date: '2024-01-15',
      description: 'Mobile Phone Sales',
      category: 'Sales Revenue',
      type: 'in',
      amount: 25000,
      balance: 125000,
      reference: 'SAL001-003'
    },
    {
      id: 'CF002',
      date: '2024-01-14',
      description: 'Office Rent Payment',
      category: 'Operating Expenses',
      type: 'out',
      amount: -15000,
      balance: 100000,
      reference: 'RENT-JAN'
    },
    {
      id: 'CF003',
      date: '2024-01-13',
      description: 'Inventory Purchase',
      category: 'Cost of Goods',
      type: 'out',
      amount: -45000,
      balance: 115000,
      reference: 'PUR005'
    },
    {
      id: 'CF004',
      date: '2024-01-12',
      description: 'Customer Payment Received',
      category: 'Sales Revenue',
      type: 'in',
      amount: 32000,
      balance: 160000,
      reference: 'SAL004'
    },
    {
      id: 'CF005',
      date: '2024-01-11',
      description: 'Utility Bills',
      category: 'Operating Expenses',
      type: 'out',
      amount: -8500,
      balance: 128000,
      reference: 'UTIL-JAN'
    },
    {
      id: 'CF006',
      date: '2024-01-10',
      description: 'Bank Interest Received',
      category: 'Financial Income',
      type: 'in',
      amount: 1200,
      balance: 136500,
      reference: 'INT-JAN'
    },
    {
      id: 'CF007',
      date: '2024-01-09',
      description: 'Supplier Payment',
      category: 'Cost of Goods',
      type: 'out',
      amount: -28000,
      balance: 135300,
      reference: 'PAY-SUP001'
    },
    {
      id: 'CF008',
      date: '2024-01-08',
      description: 'Cash Sales',
      category: 'Sales Revenue',
      type: 'in',
      amount: 18500,
      balance: 163300,
      reference: 'CASH-SALES'
    }
  ];

  const cashFlowColumns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { 
      key: 'type', 
      label: 'Type',
      render: (value: string) => (
        <div className="flex items-center">
          {value === 'in' ? (
            <ArrowUp className="h-4 w-4 text-chart-2 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 text-destructive mr-1" />
          )}
          <span className={value === 'in' ? 'text-chart-2' : 'text-destructive'}>
            {value === 'in' ? 'Cash In' : 'Cash Out'}
          </span>
        </div>
      )
    },
    { 
      key: 'amount', 
      label: 'Amount', 
      sortable: true,
      render: (value: number) => <CurrencyDisplay amount={Math.abs(value)} />
    },
    { 
      key: 'balance', 
      label: 'Running Balance', 
      sortable: true,
      render: (value: number) => <CurrencyDisplay amount={value} />
    },
    { key: 'reference', label: 'Reference' }
  ];

  const filteredData = cashFlowData.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'in' && item.type === 'in') ||
                         (filterType === 'out' && item.type === 'out');
    
    return matchesSearch && matchesFilter;
  });

  const totalCashIn = cashFlowData.filter(item => item.type === 'in').reduce((sum, item) => sum + item.amount, 0);
  const totalCashOut = Math.abs(cashFlowData.filter(item => item.type === 'out').reduce((sum, item) => sum + item.amount, 0));
  const netCashFlow = totalCashIn - totalCashOut;
  const currentBalance = cashFlowData[0]?.balance || 0;

  const handleCashFlowSubmit = (data: any) => {
    console.log('New cash flow entry:', data);
  };

  return (
    <div className="p-6 space-y-6" data-testid="cash-flow-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cash Flow</h1>
          <p className="text-muted-foreground">
            Track all money flowing in and out of your business
          </p>
        </div>
        <div className="flex gap-2">
          <TransactionForm type="cash-in" onSubmit={handleCashFlowSubmit} />
          <TransactionForm type="cash-out" onSubmit={handleCashFlowSubmit} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CurrencyDisplay amount={currentBalance} />
            </div>
            <p className="text-xs text-muted-foreground">
              Available cash
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash In</CardTitle>
            <ArrowUp className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">
              <CurrencyDisplay amount={totalCashIn} />
            </div>
            <p className="text-xs text-muted-foreground">
              Total inflows
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Out</CardTitle>
            <ArrowDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              <CurrencyDisplay amount={totalCashOut} />
            </div>
            <p className="text-xs text-muted-foreground">
              Total outflows
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Cash Flow</CardTitle>
            {netCashFlow >= 0 ? (
              <ArrowUp className="h-4 w-4 text-chart-2" />
            ) : (
              <ArrowDown className="h-4 w-4 text-destructive" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
              <CurrencyDisplay amount={netCashFlow} showSign />
            </div>
            <p className="text-xs text-muted-foreground">
              Net difference
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-cash-flow"
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]" data-testid="select-filter-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Transactions</SelectItem>
            <SelectItem value="in">Cash In Only</SelectItem>
            <SelectItem value="out">Cash Out Only</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" data-testid="button-export">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Cash Flow Table */}
      <DataTable
        title="Cash Flow History"
        data={filteredData}
        columns={cashFlowColumns}
        onRowClick={(row) => console.log('Cash flow item clicked:', row)}
      />
    </div>
  );
}