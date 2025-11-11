import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Stock Status</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="high" />
          <StatusBadge status="medium" />
          <StatusBadge status="low" />
          <StatusBadge status="out-of-stock" />
          <StatusBadge status="in-stock" />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Financial Status</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="profit" />
          <StatusBadge status="loss" />
          <StatusBadge status="profit" label="Monthly Gain" />
          <StatusBadge status="loss" label="Daily Loss" />
        </div>
      </div>
    </div>
  );
}