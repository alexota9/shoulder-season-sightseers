'use client';

import { useState, useEffect } from 'react';
import ExpenseOverview from '@/components/expenses/ExpenseOverview';
import TripDetail from '@/components/expenses/TripDetail';
import { ExpenseData } from '@/lib/utils/expense-utils';

const API_ENDPOINT = 'https://travel-sheets-api-16487539125.us-central1.run.app/trip-data';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_ENDPOINT);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setError(err instanceof Error ? err.message : 'Failed to load expense data');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-16 px-4" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-t-teal border-r-purple border-b-coral border-l-gold rounded-full animate-spin mb-4" />
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              Loading expense data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16 px-4" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Error Loading Data
            </h1>
            <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
              {error}
            </p>
            <button
              onClick={fetchExpenses}
              className="px-6 py-3 bg-teal text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto">
        {selectedTrip ? (
          <TripDetail
            expenses={expenses}
            tripName={selectedTrip}
            onBack={() => setSelectedTrip(null)}
          />
        ) : (
          <ExpenseOverview
            expenses={expenses}
            onTripClick={(tripName) => setSelectedTrip(tripName)}
          />
        )}
      </div>
    </div>
  );
}
