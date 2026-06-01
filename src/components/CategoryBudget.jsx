import CategoryBar from "./CategoryBar";
import { useBudget } from "../context/BudgetContext";

const CategoryBudget = () => {
  const { categoryAmounts } = useBudget();

  return (
    <section className="w-full flex flex-col gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-purple-50 shadow-sm">
      <header className="mb-1">
        <h2 className="text-lg font-black text-heading tracking-tight">
          Category Budgets
        </h2>
        <p className="text-xs text-gray-400">
          Live expenditure tracking against assigned limits.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {Object.entries(categoryAmounts).map(([categoryName, amountValue]) => (
          <CategoryBar
            key={categoryName}
            category={categoryName}
            amount={amountValue}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryBudget;
