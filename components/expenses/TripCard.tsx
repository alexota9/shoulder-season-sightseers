import { TripSummary, formatCurrency } from '@/lib/utils/expense-utils';

interface TripCardProps {
  trip: TripSummary;
  onClick: () => void;
}

export default function TripCard({ trip, onClick }: TripCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-6 rounded-xl transition-all hover:scale-105 hover:shadow-xl"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderWidth: '2px',
        borderColor: 'var(--card-border)',
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
          {trip.tripName}
        </h3>
        <span className="text-2xl">✈️</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span style={{ color: 'var(--text-secondary)' }} className="text-sm">
            Total Cost
          </span>
          <span className="text-2xl font-bold aurora-stat">
            {formatCurrency(trip.totalCost)}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          <span>{trip.expenseCount} expenses</span>
          <span>{trip.categories.length} categories</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--card-border)' }}>
        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Top categories: {trip.categories.slice(0, 3).map(c => c.category).join(', ')}
        </div>
      </div>
    </button>
  );
}
