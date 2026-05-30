import React from "react";
import { FaUtensils, FaWifi, FaTv, FaTags, FaCar } from "react-icons/fa6";

// Helper function to attach the correct icon based on category text string
const getCategoryIcon = (category) => {
  switch (category) {
    case "Food":
      return <FaUtensils className="text-orange-500" />;
    case "Data":
      return <FaWifi className="text-blue-500" />;
    case "Subscription":
      return <FaTv className="text-red-500" />;
    case "Transport":
      return <FaCar className="text-green-500" />;
    default:
      return <FaTags className="text-purple-500" />;
  }
};

const TransactionLogItem = ({ description, category, amount, date, time }) => {
  return (
    <div className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3.5">
        {/* Icon Badge Holder */}
        <div className="p-2.5 bg-slate-50 rounded-lg">
          {getCategoryIcon(category)}
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 text-sm">
            {description}
          </h4>
          <span className="text-xs text-slate-400 font-medium">
            {category} · {date}· {time}
          </span>
        </div>
      </div>
      <div className="text-right">
        {/* Standard negative expense string layout */}
        <span className="font-bold text-slate-900 text-sm">
          -₦{Number(amount).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default TransactionLogItem;
