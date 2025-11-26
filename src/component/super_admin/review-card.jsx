import { Star } from "lucide-react"


export function ReviewCard({
  userAvatar,
  userName,
  userTitle,
  rating,
  reviewText,
  date,
  hasClientResponse = false,
  clientResponseText,
  thumbnailImage,
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* User Info */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-600 text-sm font-medium">{userName.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900">{userName}</div>
            <div className="text-xs text-gray-500">{userTitle}</div>
          </div>
        </div>
        {thumbnailImage && (
          <div className="w-16 h-12 bg-orange-100 rounded overflow-hidden flex-shrink-0">
            <img
              src={thumbnailImage || "/placeholder.svg"}
              alt="Review thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))}
        <span className="ml-2 text-xs text-gray-500">{date}</span>
      </div>

      {/* Review Text */}
      <p className="text-sm text-gray-700 leading-relaxed mb-3">{reviewText}</p>

      {/* Client Response */}
      {hasClientResponse && (
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">C</span>
            </div>
            <span className="text-xs font-medium text-gray-700">Client's Response</span>
          </div>
          {clientResponseText && <p className="text-sm text-gray-600 leading-relaxed ml-8">{clientResponseText}</p>}
        </div>
      )}
    </div>
  )
}
