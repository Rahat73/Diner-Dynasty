import { easeInOut } from "framer-motion";

const menuVariants = {
  hidden: {
    x: "10vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easeInOut },
  },
  exit: {
    x: "-10vw",
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export { menuVariants };
