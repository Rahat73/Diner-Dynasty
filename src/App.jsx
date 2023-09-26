import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/Routes";
import { AnimatePresence } from "framer-motion";
import Welcome from "./Pages/Welcome/Welcome";
import { useEffect, useState } from "react";

function App() {
  ///////////////////////////// Welcome Screen Trigger ////////////////////////////
  const [showWelcome, setShowWelcome] = useState(true);
  const [routerKey, setRouterKey] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false);
      setRouterKey((prevKey) => prevKey + 1);
    }, 4000);
  }, []);
  ///////////////////////////// Welcome Screen Trigger ////////////////////////////

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <Welcome showWelcome={showWelcome}></Welcome>
        <AnimatePresence mode="wait">
          <RouterProvider key={routerKey} router={router} />
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
