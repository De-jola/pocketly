const Button = ({ text, onClick }) => {
  return (
    <button
      className="bg-primary text-white px-16 py-6 rounded-3xl cursor-pointer hover:scale-105 transition-transform mt-6"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
