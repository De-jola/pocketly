const CategoryCard = ({
  amount,
  icon: Icon,
  category,
  updateCategoryAmount,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <label className="text-sm text-gray-500">
        <Icon className="text-2xl mb-2" />
        {category}
      </label>
      <input
        type="number"
        id={category}
        value={amount}
        onChange={(e) => updateCategoryAmount(category, e.target.value)}
        className="w-full bg-gray-50 border border-gray-200 pl-7 pr-4 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
        placeholder="0"
      />
      <span>Allocation (₦)</span>
    </div>
  );
};
export default CategoryCard;
