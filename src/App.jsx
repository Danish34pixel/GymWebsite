import React, { useState, useEffect } from "react";
import GymWebsite from "./Components/GymWebsite";
import ConfirmUser from "./Components/ConfirmUser";

const App = () => {
  const [route, setRoute] = useState(
    window.location.pathname + window.location.search
  );

  useEffect(() => {
    const onPopState = () =>
      setRoute(window.location.pathname + window.location.search);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  if (route.startsWith("/confirm")) {
    return <ConfirmUser />;
  }
  return <GymWebsite />;
};

export default App;
