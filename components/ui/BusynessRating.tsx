interface BusynessRatingProps {
  rating: 1 | 2 | 3 | 4 | 5;
  description?: string;
  showLabel?: boolean;
}

export default function BusynessRating({ rating, description, showLabel = true }: BusynessRatingProps) {
  const getColorClass = () => {
    if (rating <= 2) return 'text-green-400';
    if (rating === 3) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getRatingLabel = () => {
    const labels = {
      1: 'Very Quiet',
      2: 'Peaceful',
      3: 'Moderate Crowds',
      4: 'Crowded',
      5: 'Very Crowded'
    };
    return labels[rating];
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center">
      <div className="inline-flex items-center gap-3 mb-3">
        <span className="text-2xl">👥</span>
        {showLabel && (
          <h3 className="text-xl font-bold text-gray-100">Crowd Levels</h3>
        )}
      </div>

      <div className="flex justify-center gap-2 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-3xl ${star <= rating ? getColorClass() : 'text-gray-600'}`}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>

      <div className="text-lg font-semibold mb-2" style={{ color: getColorClass().replace('text-', '') }}>
        {getRatingLabel()}
      </div>

      {description && (
        <p className="text-sm text-gray-400 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
