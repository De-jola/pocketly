const ProgressBar = ({ text }) => {
  return (
    <div className="w-full max-w-xs p-4">
      {/* Label or Status Title */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-label animate-pulse">
          {text || "Setup Progress"}
        </span>
      </div>

      {/* Progress Track Wrapper */}
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden relative">
        {/* Animated Indeterminate Progress Line */}
        <div className="h-full bg-primary rounded-full w-1/2 absolute top-0 left-0 animate-infinite-scroll"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
