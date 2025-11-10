interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="h-full w-full animate-spin rounded-full border-2 border-gray-200 border-t-brand-500"></div>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center space-x-2">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
      </div>
      <div className="ml-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex space-x-3">
            <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-1">
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="h-3 w-28 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}