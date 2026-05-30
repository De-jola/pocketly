const Button = ({ buttonText, buttonLogo, onClick }) => {
  return (
    <button
      className="flex items-center gap-2 bg-white justify-center py-1 rounded-lg w-full cursor-pointer mb-3 border border-border-default text-sm"
      onClick={onClick}
    >
      {buttonLogo}
      {buttonText}
    </button>
  );
};
export default Button;
