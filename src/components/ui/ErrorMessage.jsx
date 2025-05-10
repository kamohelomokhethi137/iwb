export default function ErrorMessage({ message, onRetry }) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-lg max-w-md mx-auto">
        <p className="text-red-600 font-medium">{message}</p>
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }