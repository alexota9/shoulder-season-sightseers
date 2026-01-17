import { ExpenseData, getTripSummaries, calculateAverageTripCost, calculateTotalSpent, formatCurrency } from '@/lib/utils/expense-utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import TripCard from './TripCard';
import CountUpNumber from '@/components/ui/CountUpNumber';

interface ExpenseOverviewProps {
  expenses: ExpenseData[];
  onTripClick: (tripName: string) => void;
}

export default function ExpenseOverview({ expenses, onTripClick }: ExpenseOverviewProps) {
  const tripSummaries = getTripSummaries(expenses);
  const averageCost = calculateAverageTripCost(expenses);
  const totalSpent = calculateTotalSpent(expenses);

  // Prepare data for bar chart
  const chartData = tripSummaries.map(trip => ({
    name: trip.tripName.length > 15 ? trip.tripName.substring(0, 15) + '...' : trip.tripName,
    fullName: trip.tripName,
    cost: trip.totalCost,
  }));

  // Colors for bars
  const colors = ['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ec4899', '#14b8a6', '#ef4444', '#6366f1'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold aurora-text mb-2">
          Travel Expenses Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)' }} className="text-lg">
          Track and analyze spending across all trips
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl text-center" style={{
          backgroundColor: 'var(--card-bg)',
          borderWidth: '2px',
          borderColor: 'var(--card-border)',
        }}>
          <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            Average Per Trip
          </div>
          <div className="text-4xl font-bold aurora-stat">
            <CountUpNumber end={Math.round(averageCost)} prefix="$" duration={1500} />
          </div>
        </div>

        <div className="p-6 rounded-xl text-center" style={{
          backgroundColor: 'var(--card-bg)',
          borderWidth: '2px',
          borderColor: 'var(--card-border)',
        }}>
          <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            Total Spent
          </div>
          <div className="text-4xl font-bold aurora-stat">
            <CountUpNumber end={Math.round(totalSpent)} prefix="$" duration={2000} />
          </div>
        </div>

        <div className="p-6 rounded-xl text-center" style={{
          backgroundColor: 'var(--card-bg)',
          borderWidth: '2px',
          borderColor: 'var(--card-border)',
        }}>
          <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            Total Trips
          </div>
          <div className="text-4xl font-bold aurora-stat">
            <CountUpNumber end={tripSummaries.length} duration={1000} />
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="p-6 rounded-xl" style={{
        backgroundColor: 'var(--card-bg)',
        borderWidth: '2px',
        borderColor: 'var(--card-border)',
      }}>
        <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Trip Cost Comparison
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: 'var(--text-secondary)' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              contentStyle={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
              }}
              formatter={(value: number) => [formatCurrency(value), 'Cost']}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.fullName;
                }
                return label;
              }}
            />
            <Bar dataKey="cost" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trip Cards Grid */}
      <div>
        <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          All Trips ({tripSummaries.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tripSummaries.map((trip) => (
            <TripCard
              key={trip.tripName}
              trip={trip}
              onClick={() => onTripClick(trip.tripName)}
            />
          ))}
        </div>
      </div>

      {tripSummaries.length === 0 && (
        <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
          <p className="text-xl">No expense data available</p>
        </div>
      )}
    </div>
  );
}
