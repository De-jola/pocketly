import React, { useState } from "react";
import { useBudget } from "../context/BudgetContext";
import { auth, signOut } from "../firebase";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  FaUser,
  FaSlidersH,
  FaUniversity,
  FaSignOutAlt,
  FaCopy,
  FaCheck,
  FaSave,
  FaCoins,
} from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();
  const {
    income,
    setIncome,
    savings,
    setSavings,
    spending,
    setSpending,
    categoryAmounts,
    updateCategoryAmount,
    spendingAmount,
  } = useBudget();

  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    fullName: "Adejola Esther",
    email: auth.currentUser?.email || "user@domain.com",
    phone: "+234 812 345 6789",
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bankName: "Stanbic IBTC Bank",
    accountNumber: "0034567891",
  });
  const [copiedField, setCopiedField] = useState("");

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen bg-gray-50 overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 w-full max-w-5xl mx-auto pb-24 md:pb-10">
        <header className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-black text-gray-800 tracking-tight">
            System Settings
          </h1>
          <p className="text-xs text-gray-400">
            Configure your financial sanctuary variables and preferences.
          </p>
        </header>

        {/* Outer Grid Wrapper Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* Navigation Control Tabs Row — Horizontal scroll track container on smaller layouts */}
          <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 md:col-span-1 scrollbar-none w-full">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 md:gap-3 px-3 py-2.5 md:px-4 md:py-3 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 bg-white md:bg-transparent border border-gray-100 md:border-none"
              }`}
            >
              <FaUser className="size-3 shrink-0" /> <span>Profile</span>
            </button>

            <button
              onClick={() => setActiveTab("finances")}
              className={`flex items-center gap-2 md:gap-3 px-3 py-2.5 md:px-4 md:py-3 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "finances"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 bg-white md:bg-transparent border border-gray-100 md:border-none"
              }`}
            >
              <FaSlidersH className="size-3 shrink-0" /> <span>Budgets</span>
            </button>

            <button
              onClick={() => setActiveTab("bank")}
              className={`flex items-center gap-2 md:gap-3 px-3 py-2.5 md:px-4 md:py-3 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "bank"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 bg-white md:bg-transparent border border-gray-100 md:border-none"
              }`}
            >
              <FaUniversity className="size-3 shrink-0" />{" "}
              <span>Settlement</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 md:gap-3 px-3 py-2.5 md:px-4 md:py-3 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap text-red-600 hover:bg-red-50 bg-white md:bg-transparent border border-red-50 md:border-none ml-auto md:ml-0 cursor-pointer"
            >
              <FaSignOutAlt className="size-3 shrink-0" /> <span>Log Out</span>
            </button>
          </nav>

          {/* Active Settings Panel Panel Area */}
          <section className="md:col-span-3 bg-white p-4 sm:p-8 rounded-2xl border border-gray-100 shadow-sm min-h-[380px] w-full">
            {activeTab === "profile" && (
              <form
                onSubmit={handleProfileSave}
                className="flex flex-col gap-4 sm:gap-5"
              >
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b pb-2">
                  Credentials
                </h3>
                {profileSaved && (
                  <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 p-3 rounded-xl text-xs font-bold text-center">
                    Profile metadata synced successfully.
                  </div>
                )}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Account Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 focus:outline-primary rounded-xl text-sm text-gray-700"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled
                    value={profile.email}
                    className="w-full bg-gray-100 border border-gray-200 px-4 py-2.5 rounded-xl text-sm text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Mobile String
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 focus:outline-primary rounded-xl text-sm text-gray-700"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-sm"
                >
                  <FaSave /> Save Profile
                </button>
              </form>
            )}

            {activeTab === "finances" && (
              <div className="flex flex-col gap-5 sm:gap-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b pb-2">
                  Macro System Targets
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                    <label className="text-xs font-bold text-gray-400 uppercase">
                      Monthly Income (₦)
                    </label>
                    <input
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                      className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-sm font-bold text-gray-700 focus:outline-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                    <label className="text-xs font-bold text-gray-400 uppercase">
                      Savings ({savings}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={savings}
                      onChange={(e) => setSavings(Number(e.target.value))}
                      className="accent-primary mt-2 cursor-pointer w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                    <label className="text-xs font-bold text-gray-400 uppercase">
                      Spending ({spending}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={spending}
                      onChange={(e) => setSpending(Number(e.target.value))}
                      className="accent-primary mt-2 cursor-pointer w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 flex flex-wrap items-center gap-1.5">
                    <FaCoins /> Category Ceilings{" "}
                    <span className="text-[10px] font-medium text-purple-400 normal-case">
                      (Limit: ₦{spendingAmount.toLocaleString()})
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.keys(categoryAmounts).map((cat) => (
                      <div key={cat} className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 capitalize">
                          {cat} Envelope (₦)
                        </label>
                        <input
                          type="number"
                          value={categoryAmounts[cat]}
                          onChange={(e) =>
                            updateCategoryAmount(cat, e.target.value)
                          }
                          className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold focus:outline-primary focus:bg-white text-gray-700 w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bank" && (
              <div className="flex flex-col gap-4 sm:gap-5">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b pb-2">
                  Settlement Registry
                </h3>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Bank Institution Name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={bankDetails.bankName}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          bankName: e.target.value,
                        })
                      }
                      className="w-full bg-gray-50 border border-gray-200 pl-4 pr-12 py-2.5 focus:outline-primary rounded-xl text-sm text-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(bankDetails.bankName, "bankName")
                      }
                      className="absolute right-3 text-gray-400 hover:text-primary cursor-pointer"
                    >
                      {copiedField === "bankName" ? (
                        <FaCheck className="text-emerald-500 size-3.5" />
                      ) : (
                        <FaCopy className="size-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Account Identifier Number
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      maxLength={10}
                      value={bankDetails.accountNumber}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          accountNumber: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="w-full bg-gray-50 border border-gray-200 pl-4 pr-12 py-2.5 focus:outline-primary rounded-xl text-sm font-mono tracking-widest text-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(bankDetails.accountNumber, "accountNum")
                      }
                      className="absolute right-3 text-gray-400 hover:text-primary cursor-pointer"
                    >
                      {copiedField === "accountNum" ? (
                        <FaCheck className="text-emerald-500 size-3.5" />
                      ) : (
                        <FaCopy className="size-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 border border-purple-100 rounded-xl text-[11px] text-purple-700 leading-relaxed font-medium">
                  💡 Setup parameters are cached securely inside local
                  structures to automate quick ecosystem auditing settlement
                  loops.
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Settings;
