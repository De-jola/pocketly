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
    <main>
      <Navbar />
      <section className="flex items-center justify-between px-10 py-12 bg-radial-[at_0%_70%] from-[#FFFFFF] 100% via-[#FAF8FF] 50% to-[#F5D9FF] 0%">
        <article className="max-w-[576px]">
          <h1 className="text-5xl font-bold mb-6">
            Mindful Budgeting for a <br />{" "}
            <span className="text-primary">Peaceful Life</span>
          </h1>
          <p>
            Allocate your income with intention. Track spending, save more, and
            find your financial balance. Experience clarity in every
            transaction.
          </p>
          <Button text="Start Your Journey" onClick={handleNavigateToLogin} />
        </article>
        <picture className="max-w-lg">
          <img src="public\images\pocketlyHero.png" alt="Hero Image" />
        </picture>
      </section>
      <section className="px-10 py-12">
        <header className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Designed For Clarity</h2>
          <p>
            Our tools are built to strip away the stress of numbers, leaving you
            with simple insights and peaceful progress.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-10 mt-10  ">
          {landingPageCards.map((card) => (
            <LandingPageCard key={card.id} {...card} />
          ))}
        </div>
      </section>
      <section className="grid grid-cols-5 gap-10 items-center px-10 py-12 ">
        <div className="p-6 bg-[#EBEDFF] max-w-5xl rounded-2xl flex flex-col  col-span-3 gap-6 relative overflow-hidden h-[600px]">
          <header>
            <h3 className="text-primary text-xl font-bold">
              The Savings Sanctuary
            </h3>
            <p className="text-label max-w-lg">
              Automate your goals and watch your dreams materialize in a calm,
              visual garden of progress.
            </p>
          </header>
          <picture className="max-w-lg absolute bottom-0 right-0">
            <img
              src="public\images\pocketlyVisualization.png"
              alt="Visualization"
              width={540}
              height={400}
            />
          </picture>
        </div>
        <div className="flex flex-col items-center h-[600px] justify-center bg-primary text-white rounded-2xl col-span-2 p-6 text-center gap-3">
          <FaShieldAlt size={48} />
          <h3>Your Security, Our Priority</h3>
          <p>
            Bank-level encryption ensures your mindful journey remains private
            and secure.
          </p>
        </div>
      </section>
      <section className="px-10 py-12">
        <article className="bg-headline text-white rounded-2xl text-center p-10 flex flex-col items-center gap-3">
          <header className="max-w-lg mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to transform your relationship with money?
            </h3>
            <p>
              Join over 50,000 users who have found their financial peace with
              Serene Ledger.
            </p>
          </header>
          <Button text="Get Started" onClick={handleNavigateToLogin} />
        </article>
      </section>
      <footer className="bg-primary text-white py-10 text-center">
        <div className="container mx-auto px-10">
          <p>&copy; 2026 Pocketly. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};
export default Home;
