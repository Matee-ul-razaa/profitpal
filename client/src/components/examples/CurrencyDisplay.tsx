import CurrencyDisplay from '../CurrencyDisplay';

export default function CurrencyDisplayExample() {
  return (
    <div className="space-y-4 p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Currency Display Examples</h3>
        <div className="space-y-1">
          <div>Positive: <CurrencyDisplay amount={12500.75} /></div>
          <div>Negative: <CurrencyDisplay amount={-8500} /></div>
          <div>With sign: <CurrencyDisplay amount={3200} showSign /></div>
          <div>Large amount: <CurrencyDisplay amount={1234567.89} /></div>
        </div>
      </div>
    </div>
  );
}