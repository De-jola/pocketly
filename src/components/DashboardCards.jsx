import { FaNairaSign } from "react-icons/fa6";
const DashBoardCards = ({ title, amount }) => {
  return (
    // Added p-5 for internal breathing room, w-full to fill grid slots, and rounded edges
    <article className="flex flex-col gap-3  bg-white  rounded-xl w-full transition-all">
      {/* Title with muted color, small size, and explicit bolding */}
      <h2
        className="text-xs font-bold uppercase tracking-wider text-gray-500 truncate"
        title={title}
      >
        {title}
      </h2>

      {/* Metrics Row */}
      <div className="flex items-baseline gap-1.5 mt-1">
        {/* Slightly smaller icon size to match font baselines beautifully */}
        <FaNairaSign className="text-xl text-primary font-bold flex-shrink-0" />

        {/* Dynamic amount styled with tabular numbers to prevent horizontal layout shifting */}
        <p className="text-2xl font-bold text-primary tracking-wide">
          {typeof amount === "number" ? amount.toLocaleString() : amount}
        </p>
      </div>
    </article>
  );
};

export default DashBoardCards;
