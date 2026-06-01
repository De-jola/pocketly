import Navbar from "../components/Navbar";
import Button from "../components/Button";
import landingPageCards from "../data/landingPageCards";
import LandingPageCard from "../components/LandingPageCards";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <main className="w-full bg-[#FAF8FF] overflow-x-hidden">
      <Navbar />

      {/* 🚀 Hero Section: Converted to dynamic flex direction to stack on mobile viewports */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-12 bg-gradient-to-tr from-[#FFFFFF] via-[#FAF8FF] to-[#F5D9FF] gap-8">
        <article className="max-w-[576px]">
          <h1 className="text-5xl font-bold mb-6">
            Mindful Budgeting for a <br className="hidden sm:inline" />{" "}
            <span className="text-primary">Peaceful Life</span>
          </h1>
          <p className="mb-6">
            Allocate your income with intention. Track spending, save more, and
            find your financial balance. Experience clarity in every
            transaction.
          </p>
          <Button text="Start Your Journey" onClick={handleNavigateToLogin} />
        </article>

        {/* Added adaptive image constraints to prevent layout bleed */}
        <picture className="w-full max-w-lg shrink-0">
          <img
            src="/images/pocketlyHero.png"
            alt="Hero Image"
            className="w-full h-auto object-contain mx-auto"
          />
        </picture>
      </section>

      {/* 🧩 Features Loop Section */}
      <section className="px-10 py-12">
        <header className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Designed For Clarity</h2>
          <p>
            Our tools are built to strip away the stress of numbers, leaving you
            with simple insights and peaceful progress.
          </p>
        </header>

        {/* Handled fluid grid column adjustments for mobile screen widths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-10 mt-10">
          {landingPageCards.map((card) => (
            <LandingPageCard key={card.id} {...card} />
          ))}
        </div>
      </section>

      {/* 🔒 Savings Sanctuary & Security Layout row */}
      {/* Stacks vertically on mobile and tablet, snaps to a 5-column grid on desktop monitors */}
      <section className="flex flex-col lg:grid lg:grid-cols-5 gap-10 items-center px-10 py-12">
        {/* Savings Sanctuary card container details */}
        <div className="p-6 bg-[#EBEDFF] w-full col-span-1 lg:col-span-3 gap-6 relative overflow-hidden min-h-[380px] sm:min-h-[450px] lg:h-[600px] rounded-2xl flex flex-col justify-between">
          <header className="z-10">
            <h3 className="text-primary text-xl font-bold">
              The Savings Sanctuary
            </h3>
            <p className="text-label max-w-lg mt-2">
              Automate your goals and watch your dreams materialize in a calm,
              visual garden of progress.
            </p>
          </header>

          <picture className="w-[85%] sm:w-[65%] lg:w-full max-w-lg absolute bottom-0 right-0 z-0">
            <img
              src="/images/pocketlyVisualization.png"
              alt="Visualization"
              className="w-full h-auto object-contain object-right-bottom block"
            />
          </picture>
        </div>

        {/* Security Shield details container card */}
        <div className="flex flex-col items-center justify-center w-full min-h-[280px] lg:h-[600px] bg-primary text-white rounded-2xl col-span-1 lg:col-span-2 p-6 text-center gap-3">
          <FaShieldAlt size={48} className="text-purple-200 shrink-0" />
          <h3 className="text-xl font-bold">Your Security, Our Priority</h3>
          <p className="max-w-xs text-purple-100">
            Bank-level encryption ensures your mindful journey remains private
            and secure.
          </p>
        </div>
      </section>

      {/* 🚀 Action Banner Block Module */}
      <section className="px-10 py-12">
        <article className="bg-headline text-white rounded-2xl text-center p-10 flex flex-col items-center gap-3 shadow-sm">
          <header className="max-w-lg mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to transform your relationship with money?
            </h3>
            <p className="text-purple-100 text-sm">
              Join over 50,000 users who have found their financial peace with
              Pocketly.
            </p>
          </header>
          <Button text="Get Started" onClick={handleNavigateToLogin} />
        </article>
      </section>

      {/* 📋 Footer Sheet Section */}
      <footer className="bg-primary text-white py-10 text-center">
        <div className="container mx-auto px-10 sm:flex-row justify-between gap-4 text-xs font-semibold text-purple-200">
          <p>&copy; 2026 Pocketly. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
