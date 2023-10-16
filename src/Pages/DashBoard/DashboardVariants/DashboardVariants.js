import { easeInOut } from "framer-motion";

const dashboardVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: easeInOut },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export { dashboardVariants };
