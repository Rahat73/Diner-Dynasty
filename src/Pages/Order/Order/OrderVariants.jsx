import { easeInOut } from "framer-motion";

const orderVariants = {
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

const tabPanelVariants = {
  hidden: {
    y: "10vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: easeInOut },
  },
  exit: {
    x: "-10vw",
    opacity: 0,
    transition: { duration: 0.75, ease: easeInOut },
  },
};

export { orderVariants, tabPanelVariants };
