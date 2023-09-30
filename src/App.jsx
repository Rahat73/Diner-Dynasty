import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/Routes";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Welcome from "./Pages/Welcome/Welcome";

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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
