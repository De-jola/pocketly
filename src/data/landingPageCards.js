import React from "react";
import { BiWallet, BiBarChartAlt2 } from "react-icons/bi";
import { BiUser } from "react-icons/bi";

const landingPageCards = [
  {
    id: 1,
    title: "Budgeting",
    description:
      "Craft intuitive spending plans that align with your lifestyle. Set limits that breathe, not constrict.",
    icon: BiWallet,
  },
  {
    id: 2,
    title: "Tracking",
    description:
      "Watch your habits evolve with real-time transaction updates. Visualize where your energy—and money—goes.",
    icon: BiBarChartAlt2,
  },
  {
    id: 3,
    title: "Sharing",
    description:
      "Manage household finances together. Shared ledgers keep everyone on the same peaceful page without the friction.",
    icon: BiUser,
  },
];

export default landingPageCards;
