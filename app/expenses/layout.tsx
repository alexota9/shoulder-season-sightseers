import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Expenses',
  description: 'Track and analyze travel expenses across all trips with detailed breakdowns and visualizations.',
  keywords: ['travel expenses', 'budget tracking', 'trip costs', 'expense analysis', 'travel budget'],
};

export default function ExpensesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
