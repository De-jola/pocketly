import CategoryBar from "./CategoryBar";
import { useBudget } from "../context/BudgetContext";

const CategoryBudget = () => {
  const { categoryAmounts } = useBudget();

  return (
    // Added structural layout wrappers to format the stack cleanly on screen
    <main className=" flex flex-col gap-4 bg-white p-6 rounded-xl">
      <header className="mb-2">
        <h2 className="text-xl font-bold text-heading tracking-wide">
          Category Budgets
        </h2>
        <p className="text-xs text-gray-400">
          Live expenditure tracking against assigned limits.
        </p>
      </header>

      {/* 1. Loop through the key-value dictionary array entries */}
      {Object.entries(categoryAmounts).map(([categoryName, amountValue]) => (
        <CategoryBar
          key={categoryName}
          category={categoryName}
          // Even though CategoryBar fetches its own data internally,
          // passing amountValue here keeps prop signatures clear if needed later
          amount={amountValue}
        />
      ))}
    </main>
  );
};

export default CategoryBudget;
