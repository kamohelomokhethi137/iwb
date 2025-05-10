export default function LoadingSpinner({ size = 'md' }) {
    const sizes = {
      sm: 'h-5 w-5',
      md: 'h-8 w-8',
      lg: 'h-12 w-12'
    };
  
    return (
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 ${sizes[size]}`} />
    );
  }