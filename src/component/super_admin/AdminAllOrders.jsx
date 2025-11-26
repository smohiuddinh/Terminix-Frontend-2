import { useState, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import order_logo from "../../assets/freelancer_dashboard/order_logo.png";
import { useGetAllOrderByAdmin } from "../../../api/client/order";
import ICCDLoader from "../loader";
import ICCDError from "../ICCDError";

function SuperAdminAllOrders() {
  const [search, setSearch] = useState("");
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetAllOrderByAdmin({ search });

  const handleView = (id) => {
    if (pathName.includes("admin")) {
      navigate(`/superadmin/orders/${id}`);
    }
  };

  const statusColors = {
    "IN PROGRESS": "bg-[#1467B0]",
    PENDING: "bg-yellow-500",
    PAID: "bg-green-600",
    "IN REVIEW": "bg-purple-500",
    "ON HOLD": "bg-red-500",
  };

  if (isLoading) return <ICCDLoader />;
  if (isError)
    return <ICCDError message={error?.message || "Failed to fetch orders"} />;

  return (
    <div className="px-5 sm:px-5 lg:px-10">
      {/* Header with Search */}
      <div className="flex flex-wrap justify-between mt-10 p-5 bg-[#F8F8F8] rounded-md">
        <p className="text-xl sm:text-2xl">
          <span className="text-[#043A53] font-semibold">All Orders</span>
        </p>
        <div className="relative mt-5 sm:mt-0">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-[1px] border-gray-500 rounded-md bg-white w-72 h-10 p-2"
            placeholder="Search My History..."
          />
          <SearchIcon className="absolute top-2 right-2" />
        </div>
      </div>

      {/* Table Cards */}
      <div className="py-6 px-4">
        {data.length > 0 ? (
          <div className="flex flex-col gap-4">
            {data.map((item) => {
              const status = (item?.status || "").toUpperCase();
              const colorClass = statusColors[status] || "bg-gray-500";

              return (
                <div
                  key={item.id}
                  className="bg-[#F8F8F8] shadow-sm rounded-xl p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                >
                  {/* Image */}
                  <div className="flex justify-center md:justify-start w-full md:w-[15%]">
                    <img
                      src={item?.gigsImage?.split(",")[0] || order_logo}
                      alt="Order"
                      className="w-36 h-20 object-contain"
                      onError={(e) => (e.target.src = order_logo)}
                    />
                  </div>

                  {/* Gig Name */}
                  <div className="w-full md:w-[15%]">
                    <p className="text-[#737373] text-sm">Gig Name</p>
                    <p className="text-[#043A53] font-semibold text-base truncate">
                      {item?.title}
                    </p>
                  </div>

                  {/* Package Type */}
                  <div className="w-full md:w-[15%]">
                    <p className="text-[#737373] text-sm">Package Type</p>
                    <p className="text-[#043A53] font-semibold text-base">
                      {item?.package_type?.toLowerCase()}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="w-full md:w-[15%]">
                    <p className="text-[#737373] text-sm">Price</p>
                    <p className="text-[#043A53] font-semibold text-base">
                      ${item?.base_price}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="w-full md:w-[15%]">
                    <p className="text-[#737373] text-sm">Status</p>
                    <div
                      className={`mt-2 flex justify-center items-center ${colorClass} rounded-2xl py-1 px-3 inline-block max-w-max`}
                    >
                      <span className="capitalize text-white text-xs font-semibold whitespace-nowrap">
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="w-full md:w-[25%] flex flex-col md:flex-row gap-2">
                    <button
                      onClick={() => handleView(item.id)}
                      className="w-full h-12 bg-[#EDEDED] rounded-2xl p-3 flex justify-center items-center"
                    >
                      <p className="text-[#043A53] font-semibold">View</p>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-sm text-gray-600">No records found</p>
        )}
      </div>
    </div>
  );
}

export default memo(SuperAdminAllOrders);
