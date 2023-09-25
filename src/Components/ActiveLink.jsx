import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "border-b-2 border-amber-500 text-amber-500" : ""
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
