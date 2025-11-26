import { Search, MoreHorizontal, Bell, Mail, HelpCircle } from "lucide-react"
import { ReviewCard } from '../../component/super_admin/review-card';
import dp from "../../assets/admin.png"
import thumbnil from "../../assets/thumbnil.png"
export default function ReviewPage() {
  const reviewsData = [
    {
      userAvatar: dp,
      userName: "Rebecca",
      userTitle: "UI/UX Designer",
      rating: 5,
      reviewText:
        "Outstanding work! The designer delivered exactly what I needed. The mobile app redesign perfectly and created a website for beyond what I had envisioned. I'm recommending them to everyone I know and will definitely be working with them again in the future. Thank you!",
      date: "3 days",
      hasClientResponse: true,
      clientResponseText: "Thank you so much for the kind words!",
      thumbnailImage: thumbnil,
    },
    {
      userAvatar: dp,
      userName: "Rebecca",
      userTitle: "UI/UX Designer",
      rating: 5,
      reviewText:
        "Outstanding work! The designer delivered exactly what I needed. The mobile app redesign perfectly and created a website for beyond what I had envisioned. I'm recommending them to everyone I know and will definitely be working with them again in the future. Thank you!",
      date: "3 days",
      hasClientResponse: true,
      thumbnailImage: thumbnil,
    },
    {
      userAvatar: dp,
      userName: "Rebecca",
      userTitle: "UI/UX Designer",
      rating: 5,
      reviewText:
        "Outstanding work! The designer delivered exactly what I needed. The mobile app redesign perfectly and created a website for beyond what I had envisioned. I'm recommending them to everyone I know and will definitely be working with them again in the future. Thank you!",
      date: "3 days",
      hasClientResponse: true,
      thumbnailImage: thumbnil,
    },
    {
      userAvatar: dp,
      userName: "Rebecca",
      userTitle: "UI/UX Designer",
      rating: 5,
      reviewText:
        "Outstanding work! The designer delivered exactly what I needed. The mobile app redesign perfectly and created a website for beyond what I had envisioned. I'm recommending them to everyone I know and will definitely be working with them again in the future. Thank you!",
      date: "3 days",
      hasClientResponse: true,
      thumbnailImage: thumbnil,
    },
    {
      userAvatar: dp,
      userName: "Rebecca",
      userTitle: "UI/UX Designer",
      rating: 5,
      reviewText:
        "Outstanding work! The designer delivered exactly what I needed. The mobile app redesign perfectly and created a website for beyond what I had envisioned. I'm recommending them to everyone I know and will definitely be working with them again in the future. Thank you!",
      date: "3 days",
      hasClientResponse: true,
      thumbnailImage: thumbnil,
    },
    {
      userAvatar: dp,
      userName: "Rebecca",
      userTitle: "UI/UX Designer",
      rating: 5,
      reviewText:
        "Outstanding work! The designer delivered exactly what I needed. The mobile app redesign perfectly and created a website for beyond what I had envisioned. I'm recommending them to everyone I know and will definitely be working with them again in the future. Thank you!",
      date: "3 days",
      hasClientResponse: true,
      thumbnailImage: thumbnil,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
   
      {/* Main Content */}
      <div className="  p-6">
        {/* Page Title and Search */}
        <div className="flex bg-[#F8F8F8] p-4  items-center justify-between mb-6">
          <h1 className="text-xl font-medium text-[#043A53]">Reviews - 164 reviews for this Gig</h1>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search My History..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Gig Summary Card */}
        <div className="bg-[#F8F8F8] rounded-lg  p-4 mb-6">
          <div className="grid grid-cols-8 gap-4 items-center">
            <div className="col-span-2">
              <div className="flex items-center space-x-3">
                <div className="w-40 h-24 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={thumbnil}
                    alt="Mobile App redesign"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Title</div>
                  <div className="font-medium">Mobile App redesign</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Impressions</div>
              <div className="text-xl font-bold">20</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Clicks</div>
              <div className="text-xl font-bold">30</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Orders</div>
              <div className="text-xl font-bold">2</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Cancellations</div>
              <div className="text-xl font-bold">1%</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Status</div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ACTIVE
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700">View</button>
              <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className=" bg-[#F8F8F8] p-4 rounded-xl flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-[#043A53]">Reviews - 164 reviews for this Gig</h2>
          <button className="px-4 py-4 bg-[#01AEAD] text-white text-sm font-medium rounded-lg hover:bg-teal-600">
            Add New Review
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid bg-[#F8F8F8] p-4 rounded-xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsData.map((review, index) => (
            <ReviewCard
              key={index}
              userAvatar={review.userAvatar}
              userName={review.userName}
              userTitle={review.userTitle}
              rating={review.rating}
              reviewText={review.reviewText}
              date={review.date}
              hasClientResponse={review.hasClientResponse}
              clientResponseText={review.clientResponseText}
              thumbnailImage={review.thumbnailImage}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
