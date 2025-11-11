// Utility functions for PKR currency formatting
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount).replace('PKR', 'PKR ');
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-PK').format(num);
}

export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}