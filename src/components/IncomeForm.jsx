import SectionHeader from "./SectionHeader";
import { CiMoneyBill } from "react-icons/ci";
import ProgressBar from "./ProgressBar";
function IncomeForm({
  income,
  setIncome,
  savingsPercent,
  setSavingsPercent,
  setSpendingPercent,
  spendingPercent,
  savingsAmount,
  spendingAmount,
}) {
  return (
    <main>
      <section className="relative">
        <SectionHeader title="Monthly Earnings" buttonText="Edit" />
        <CiMoneyBill className="absolute top-14 left-3" />
        <p className="absolute right-5">per month</p>
        <input
          type="number"
          value={income || ""}
          onChange={(e) => setIncome(Number(e.target.value))}
          placeholder="e.g. 50000"
          className="outline-none appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full bg-[#f0ebff] py-1 rounded-lg px-8 mb-3 focus:border-purple-500"
        />
        <div className="w-1/3">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Savings Tier
          </label>
          <select
            value={savingsPercent}
            onChange={(e) => setSavingsPercent(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg bg-white outline-none focus:border-purple-600"
          >
            <option value={10}>10% Standard</option>
            <option value={20}>20% Growth</option>
            <option value={30}>30% Aggressive</option>
          </select>

          <label className="block text-sm font-medium text-slate-600 mb-1">
            Spending Tier
          </label>
          <select
            value={spendingPercent}
            onChange={(e) => setSpendingPercent(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg bg-white outline-none focus:border-purple-600"
          >
            <option value={40}>40% Standard</option>
            <option value={50}>50% Growth</option>
            <option value={70}>70% Aggressive</option>
          </select>
        </div>
      </section>
      <section>
        <SectionHeader title="Budget Allocation" buttonText="AI Split" />
        <div>
          <div>
            <p>Savings ${savingsPercent}%</p> <p>{savingsAmount}</p>
            <ProgressBar value={savingsAmount} max={income} />
            <p>Send to </p>
          </div>
        </div>
        <div>
          <p>Spending {spendingPercent}%</p>
          <p>{spendingAmount}</p>
          <div>
            <p>Data</p>
            <p></p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default IncomeForm;
