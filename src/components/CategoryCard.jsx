import ProgressBar from "./ProgressBar";
const CategoryCard = ({ name, amount }) => {
  return (
    <div>
      <p>{name}</p>
      <p>{amount}</p>
      <ProgressBar value={5000} max={amount} />
    </div>
  );
};

export default CategoryCard;
