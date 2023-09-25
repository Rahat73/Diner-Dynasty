import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import logoIcon from "../../assets/Lotties/logo-icon.json";
import Lottie from "lottie-react";
import {
  SVGPathA,
  SVGPathD1,
  SVGPathD2,
  SVGPathE,
  SVGPathI,
  SVGPathN1,
  SVGPathN2,
  SVGPathR,
  SVGPathS,
  SVGPathT,
  SVGPathY1,
  SVGPathY2,
} from "./LogoSVG";

const welcomeVariants = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0, duration: 0 },
  },
  exit: {
    opacity: 0,
    y: "-100vh",
    transition: { delay: 2, duration: 1 },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.5, duration: 3 },
  },
};

// const svgVariants = {
//   hidden: {
//     x: "100vw",
//   },
//   visible: {
//     x: 0,
//     transition: { duration: 1 },
//   },
// };

const pathVariants = {
  hidden: {
    pathLength: 0,
    fill: "rgba(197,158,93,0)",
  },
  visible: {
    pathLength: 1,
    fill: "rgba(197,158,93,1)",
    transition: { delay: 1.25, duration: 3.5 },
  },
};

const Welcome = ({ showWelcome }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <AnimatePresence>
      {showWelcome && (
        <motion.div
          variants={welcomeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="h-full w-full fixed top-0 left-0 z-50 bg-red-700 flex justify-center items-center"
        >
          <motion.div
            className="text-center md:flex justify-center items-center"
            variants={contentVariants}
          >
            <Lottie animationData={logoIcon} loop={true} />
            <div className="flex-col items-center justify-center">
              <h1 className="text-5xl mb-4 text-neutral-content">Welcome to</h1>
              <h1 className="text-7xl text-green-500 font-bold mb-4 block md:hidden ">
                Diner Dynasty
              </h1>
              <motion.svg
                className="hidden md:block"
                // variants={svgVariants}
                width="550"
                // height="1000"
                viewBox="0 0 550 50"
                stroke="#c59e5d"
                strokeWidth="4"
                // fill="#c59e5d"
                vectorEffect="non-scaling-stroke"
              >
                <motion.path variants={pathVariants} d={SVGPathD1} />
                <motion.path variants={pathVariants} d={SVGPathI} />
                <motion.path variants={pathVariants} d={SVGPathN1} />
                <motion.path variants={pathVariants} d={SVGPathE} />
                <motion.path variants={pathVariants} d={SVGPathR} />
                <motion.path variants={pathVariants} d={SVGPathD2} />
                <motion.path variants={pathVariants} d={SVGPathY1} />
                <motion.path variants={pathVariants} d={SVGPathN2} />
                <motion.path variants={pathVariants} d={SVGPathA} />
                <motion.path variants={pathVariants} d={SVGPathS} />
                <motion.path variants={pathVariants} d={SVGPathT} />
                <motion.path variants={pathVariants} d={SVGPathY2} />
              </motion.svg>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Welcome;
