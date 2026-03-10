import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import HomeownerWaitlist from "../pages/waitlist/HomeownerWaitlist";
import FixerWaitlist from "../pages/waitlist/FixerWaitlist";
import ThankYou from "../pages/waitlist/ThankYou";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/waitlist/homeowner",
    element: <HomeownerWaitlist />,
  },
  {
    path: "/waitlist/fixer",
    element: <FixerWaitlist />,
  },
  {
    path: "/waitlist/thank-you",
    element: <ThankYou />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
