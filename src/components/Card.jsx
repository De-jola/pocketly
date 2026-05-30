import { FaNairaSign } from "react-icons/fa6";
const Card = ({ title, description, amount }) => {
  return (
    <div className="card bg-white p-4 rounded-4xl text-xs text-text-secondary flex flex-col gap-1">
      <h3>{title}</h3>
      <p className="flex items-center gap-1 text-2xl font-bold text-black">
        <FaNairaSign /> {amount.toLocaleString()}
      </p>
      <p>{description}</p>
    </div>
  );
};
export default Card;
