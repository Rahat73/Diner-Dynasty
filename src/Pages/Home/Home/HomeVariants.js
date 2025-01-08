import { easeInOut } from "framer-motion";

const homeVariants = {
  hidden: {
    // x: "10vw", bg-fixed doesn't work if it is enabled
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easeInOut },
  },
  exit: {
    // x: "-10vw", bg-fixed doesn't work if it is enabled
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const homeComponentsVariants = {
  hidden: {
    // scale: 0,
    opacity: 0,
  },
  visible: {
    // scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: easeInOut },
  },
};

export { homeVariants, homeComponentsVariants };
