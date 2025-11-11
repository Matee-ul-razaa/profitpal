import { formatCurrency } from "@/lib/currency";

interface CurrencyDisplayProps {
  amount: number;
  className?: string;
  showSign?: boolean;
}

export default function CurrencyDisplay({ 
  amount, 
  className = "", 
  showSign = false 
}: CurrencyDisplayProps) {
  const isNegative = amount < 0;
  const displayAmount = Math.abs(amount);
  const sign = showSign ? (isNegative ? "-" : "+") : (isNegative ? "-" : "");
  
  return (
    <span 
      className={`font-mono tabular-nums ${
        isNegative ? "text-destructive" : "text-foreground"
      } ${className}`}
      data-testid="currency-display"
    >
      {sign}{formatCurrency(displayAmount)}
    </span>
  );
}