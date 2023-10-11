import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <>
        <progress className="progress w-full"></progress>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 10 }}
          className="min-h-screen"
        >
          <p className="text-center mt-10 mb-3">Somthing went wrong</p>
          <h1 className="text-center text-3xl font-semibold ">
            Please{" "}
            <Link to={"/login"} className="text-amber-500">
              Login
            </Link>
          </h1>
        </motion.div>
      </>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
