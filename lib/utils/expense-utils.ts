// Utility functions for expense calculations

export interface ExpenseData {
  Expense: string;
  Category: string;
  Cost: string;
  Points: string;
  'Amount Paid': string;
  Notes: string;
  Trip: string;
}

export interface TripSummary {
  tripName: string;
  totalCost: number;
  expenseCount: number;
  categories: CategoryBreakdown[];
}

export interface CategoryBreakdown {
  category: string;
  total: number;
  count: number;
}

/**
 * Parse cost string to number, handling various formats
 */
export function parseCost(costString: string): number {
  if (!costString) return 0;
  // Remove $ and commas, then parse
  const cleaned = costString.replace(/[$,]/g, '').trim();
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format number as currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate total cost for a trip
 */
export function calculateTripTotal(expenses: ExpenseData[], tripName: string): number {
  return expenses
    .filter(expense => expense.Trip === tripName)
    .reduce((sum, expense) => sum + parseCost(expense.Cost), 0);
}

/**
 * Get unique trip names from expenses
 */
export function getUniqueTrips(expenses: ExpenseData[]): string[] {
  const trips = new Set(expenses.map(e => e.Trip).filter(Boolean));
  return Array.from(trips).sort();
}

/**
 * Get category breakdown for a specific trip
 */
export function getCategoryBreakdown(expenses: ExpenseData[], tripName: string): CategoryBreakdown[] {
  const tripExpenses = expenses.filter(e => e.Trip === tripName);
  const categoryMap = new Map<string, { total: number; count: number }>();

  tripExpenses.forEach(expense => {
    const category = expense.Expense || 'Other';
    const cost = parseCost(expense.Cost);

    if (categoryMap.has(category)) {
      const existing = categoryMap.get(category)!;
      existing.total += cost;
      existing.count += 1;
    } else {
      categoryMap.set(category, { total: cost, count: 1 });
    }
  });

  return Array.from(categoryMap.entries())
    .map(([category, data]) => ({
      category,
      total: data.total,
      count: data.count,
    }))
    .sort((a, b) => b.total - a.total);
}

/**
 * Get all trip summaries
 */
export function getTripSummaries(expenses: ExpenseData[]): TripSummary[] {
  const trips = getUniqueTrips(expenses);

  return trips.map(tripName => {
    const tripExpenses = expenses.filter(e => e.Trip === tripName);
    const totalCost = tripExpenses.reduce((sum, e) => sum + parseCost(e.Cost), 0);
    const categories = getCategoryBreakdown(expenses, tripName);

    return {
      tripName,
      totalCost,
      expenseCount: tripExpenses.length,
      categories,
    };
  }).sort((a, b) => b.totalCost - a.totalCost);
}

/**
 * Calculate average trip cost
 */
export function calculateAverageTripCost(expenses: ExpenseData[]): number {
  const trips = getUniqueTrips(expenses);
  if (trips.length === 0) return 0;

  const totalCost = expenses.reduce((sum, e) => sum + parseCost(e.Cost), 0);
  return totalCost / trips.length;
}

/**
 * Calculate total spent across all trips
 */
export function calculateTotalSpent(expenses: ExpenseData[]): number {
  return expenses.reduce((sum, e) => sum + parseCost(e.Cost), 0);
}

/**
 * Get color for category (consistent colors for common categories)
 */
export function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    'Flights': '#3b82f6',       // blue
    'Hotel': '#8b5cf6',          // purple
    'Lodging': '#8b5cf6',        // purple
    'Food': '#22c55e',           // green
    'Transportation': '#f59e0b', // amber
    'Activities': '#ec4899',     // pink
    'Entertainment': '#ec4899',  // pink
    'Shopping': '#14b8a6',       // teal
    'Other': '#6b7280',          // gray
  };

  return colorMap[category] || '#9ca3af'; // default gray
}
