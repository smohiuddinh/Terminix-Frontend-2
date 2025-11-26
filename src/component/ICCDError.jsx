import { AlertCircle } from 'lucide-react'; 
const ICCDError = ({ message = "Something went wrong", title = "Error", onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div
        className="bg-red-100 text-red-700 px-6 py-5 rounded-xl shadow-md text-center max-w-md w-full"
        role="alert"
      >
        <div className="flex justify-center mb-3">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <h2 className="text-lg font-bold mb-1">{title}</h2>
        <p className="text-sm mb-3">{message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ICCDError;
