import Image from 'next/image';

interface PersonalHighlightCardProps {
  author: 'alex' | 'lissi';
  title: string;
  quote: string;
  favoritePhoto?: string;
  topMoments: string[];
}

export default function PersonalHighlightCard({
  author,
  title,
  quote,
  favoritePhoto,
  topMoments
}: PersonalHighlightCardProps) {
  const isAlex = author === 'alex';
  const colorClass = isAlex ? 'coral' : 'teal';
  const gradientFrom = isAlex ? 'from-coral/10' : 'from-teal/10';
  const gradientTo = isAlex ? 'to-coral/5' : 'to-teal/5';
  const borderColor = isAlex ? 'border-coral' : 'border-teal';
  const textColor = isAlex ? 'text-coral' : 'text-teal';
  const bgColor = isAlex ? 'bg-coral/20' : 'bg-teal/20';

  return (
    <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} border-l-4 ${borderColor} rounded-xl p-6 shadow-lg`}>
      {/* Author header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center text-2xl`}>
          {isAlex ? '👨' : '👩'}
        </div>
        <h3 className={`text-xl font-display font-bold ${textColor}`}>
          {title}
        </h3>
      </div>

      {/* Quote */}
      <blockquote className="text-lg italic text-gray-300 mb-4 pl-4 border-l-2 border-gray-600">
        "{quote}"
      </blockquote>

      {/* Favorite photo */}
      {favoritePhoto && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={favoritePhoto}
            alt={`${author}'s favorite moment`}
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* Top moments */}
      <div>
        <h4 className="text-sm font-semibold text-gray-400 mb-2">Top Moments:</h4>
        <ul className="space-y-2">
          {topMoments.map((moment, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-300">
              <span className={`${textColor} text-lg mt-0.5`}>•</span>
              <span>{moment}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
