import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/Routes";
import { AnimatePresence } from "framer-motion";
import Welcome from "./Pages/Welcome/Welcome";
import { useEffect, useState } from "react";

function App() {
  ///////////////////////////// Welcome Screen Trigger ////////////////////////////
  const [showWelcome, setShowWelcome] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false);
    }, 4000);
  }, []);
  ///////////////////////////// Welcome Screen Trigger ////////////////////////////

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <Welcome showWelcome={showWelcome}></Welcome>
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
