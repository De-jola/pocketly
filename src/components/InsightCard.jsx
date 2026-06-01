import { FaLightbulb } from "react-icons/fa";

const InsightCard = ({ icon: Icon = FaLightbulb, title, description }) => {
  return (
    <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-100 flex flex-col gap-2 transition-all hover:bg-purple-50/70">
      {/* Icon + Title Row */}
      <div className="flex items-center gap-2 text-primary font-bold text-xs">
        <Icon className="size-3.5 flex-shrink-0" />
        <span className="tracking-wide uppercase">{title}</span>
      </div>

      {/* Description Content Block */}
      <p className="text-xs leading-relaxed text-gray-600">{description}</p>
    </div>
  );
};

export default InsightCard;
