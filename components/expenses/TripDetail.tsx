import { ExpenseData, getCategoryBreakdown, formatCurrency, parseCost, getCategoryColor } from '@/lib/utils/expense-utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface TripDetailProps {
  expenses: ExpenseData[];
  tripName: string;
  onBack: () => void;
}

export default function TripDetail({ expenses, tripName, onBack }: TripDetailProps) {
  const tripExpenses = expenses.filter(e => e.Trip === tripName);
  const categories = getCategoryBreakdown(expenses, tripName);
  const totalCost = tripExpenses.reduce((sum, e) => sum + parseCost(e.Cost), 0);

  // Prepare data for pie chart
  const pieData = categories.map(cat => ({
    name: cat.category,
    value: cat.total,
    count: cat.count,
  }));

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div>
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderWidth: '2px',
            borderColor: 'var(--card-border)',
            color: 'var(--text-primary)',
          }}
        >
          ← Back to Overview
        </button>

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold aurora-text mb-2">
            {tripName}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }} className="text-lg">
            {tripExpenses.length} expenses · {categories.length} categories
          </p>
        </div>
      </div>

      {/* Total Cost Banner */}
      <div className="p-8 rounded-xl text-center" style={{
        backgroundColor: 'var(--card-bg)',
        borderWidth: '2px',
        borderColor: 'var(--card-border)',
      }}>
        <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Total Trip Cost
        </div>
        <div className="text-5xl font-bold aurora-stat">
          {formatCurrency(totalCost)}
        </div>
      </div>

      {/* Category Breakdown and Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category List */}
        <div className="p-6 rounded-xl" style={{
          backgroundColor: 'var(--card-bg)',
          borderWidth: '2px',
          borderColor: 'var(--card-border)',
        }}>
          <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Category Breakdown
          </h2>
          <div className="space-y-4">
            {categories.map((cat, index) => (
              <div key={cat.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: getCategoryColor(cat.category) }}
                    />
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {cat.category}
                    </span>
                  </div>
                  <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                    {formatCurrency(cat.total)}
                  </span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span>{cat.count} expenses</span>
                  <span>{((cat.total / totalCost) * 100).toFixed(1)}% of total</span>
                </div>
                {index < categories.length - 1 && (
                  <div className="h-px mt-2" style={{ backgroundColor: 'var(--card-border)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="p-6 rounded-xl" style={{
          backgroundColor: 'var(--card-bg)',
          borderWidth: '2px',
          borderColor: 'var(--card-border)',
        }}>
          <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Spending Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${((entry.value / totalCost) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getCategoryColor(entry.name)} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${formatCurrency(value)} (${props.payload.count} expenses)`,
                  name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Table */}
      <div className="p-6 rounded-xl overflow-x-auto" style={{
        backgroundColor: 'var(--card-bg)',
        borderWidth: '2px',
        borderColor: 'var(--card-border)',
      }}>
        <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          All Expenses
        </h2>
        <table className="w-full">
          <thead>
            <tr className="border-b-2" style={{ borderColor: 'var(--card-border)' }}>
              <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                Category
              </th>
              <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                Description
              </th>
              <th className="text-right py-3 px-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                Cost
              </th>
              <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {tripExpenses
              .sort((a, b) => parseCost(b.Cost) - parseCost(a.Cost))
              .map((expense, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-opacity-50 transition-colors"
                  style={{ borderColor: 'var(--card-border)' }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: getCategoryColor(expense.Expense) }}
                      />
                      <span style={{ color: 'var(--text-primary)' }}>
                        {expense.Expense || 'Other'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                    {expense.Category || '-'}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {formatCurrency(parseCost(expense.Cost))}
                  </td>
                  <td className="py-3 px-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {expense.Notes || '-'}
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 font-bold" style={{ borderColor: 'var(--card-border)' }}>
              <td colSpan={2} className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>
                Total
              </td>
              <td className="py-3 px-4 text-right" style={{ color: 'var(--text-primary)' }}>
                {formatCurrency(totalCost)}
              </td>
              <td className="py-3 px-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
