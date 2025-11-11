import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CurrencyDisplay from "@/components/CurrencyDisplay";
import MetricCard from "@/components/MetricCard";
import { CalendarIcon, Download, FileText, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Reports() {
  const [dateFrom, setDateFrom] = useState<Date>(new Date(2024, 0, 1));
  const [dateTo, setDateTo] = useState<Date>(new Date());
  const [reportType, setReportType] = useState("profit-loss");
  
  // todo: remove mock functionality
  const reportData = {
    'profit-loss': {
      totalSales: 425000,
      totalPurchases: 285000,
      grossProfit: 140000,
      expenses: 45000,
      netProfit: 95000,
      profitMargin: 22.4,
      breakdown: [
        { category: 'Mobiles', sales: 285000, purchases: 190000, profit: 95000 },
        { category: 'Accessories', sales: 120000, purchases: 80000, profit: 40000 },
        { category: 'Laptops', sales: 120000, purchases: 85000, profit: 35000 }
      ]
    },
    'daily': {
      totalSales: 12500,
      totalPurchases: 8500,
      netProfit: 4000,
      transactions: 15,
      topSelling: 'Wireless Headphones',
      profitMargin: 32.0
    },
    'monthly': {
      totalSales: 125000,
      totalPurchases: 85000,
      netProfit: 40000,
      transactions: 145,
      topCategory: 'Mobiles',
      profitMargin: 32.0,
      growth: 12.5
    }
  };

  const currentData = reportData[reportType as keyof typeof reportData] as any;

  const generateReport = () => {
    console.log('Generating report:', {
      type: reportType,
      from: dateFrom,
      to: dateTo
    });
  };

  return (
    <div className="p-6 space-y-6" data-testid="reports-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            Generate detailed financial reports and analytics
          </p>
        </div>
        <Button onClick={generateReport} data-testid="button-generate-report">
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger data-testid="select-report-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profit-loss">Profit & Loss</SelectItem>
                  <SelectItem value="daily">Daily Report</SelectItem>
                  <SelectItem value="monthly">Monthly Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">From Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                    data-testid="button-date-from"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={(date) => date && setDateFrom(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                    data-testid="button-date-to"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={(date) => date && setDateTo(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Summary */}
      {reportType === 'profit-loss' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Sales"
              value={currentData.totalSales}
              isCurrency
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <MetricCard
              title="Total Purchases"
              value={currentData.totalPurchases}
              isCurrency
              icon={<TrendingDown className="h-4 w-4" />}
            />
            <MetricCard
              title="Gross Profit"
              value={currentData.grossProfit}
              isCurrency
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <MetricCard
              title="Net Profit"
              value={currentData.netProfit}
              isCurrency
              change={currentData.profitMargin}
              icon={<TrendingUp className="h-4 w-4" />}
            />
          </div>

          {/* Category Breakdown */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Category Performance</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-export-breakdown">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentData.breakdown.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.category}</h4>
                      <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-muted-foreground">
                        <div>
                          Sales: <CurrencyDisplay amount={item.sales} />
                        </div>
                        <div>
                          Purchases: <CurrencyDisplay amount={item.purchases} />
                        </div>
                        <div className="text-chart-2 font-medium">
                          Profit: <CurrencyDisplay amount={item.profit} />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-chart-2">
                        <CurrencyDisplay amount={item.profit} />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {((item.profit / item.sales) * 100).toFixed(1)}% margin
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {(reportType === 'daily' || reportType === 'monthly') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Sales"
            value={currentData.totalSales}
            isCurrency
            change={reportType === 'monthly' ? currentData.growth : undefined}
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <MetricCard
            title="Net Profit"
            value={currentData.netProfit}
            isCurrency
            change={currentData.profitMargin}
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <MetricCard
            title="Transactions"
            value={currentData.transactions}
            icon={<FileText className="h-4 w-4" />}
          />
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" data-testid="button-export-pdf">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" data-testid="button-export-excel">
              <Download className="mr-2 h-4 w-4" />
              Export Excel
            </Button>
            <Button variant="outline" data-testid="button-export-csv">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}