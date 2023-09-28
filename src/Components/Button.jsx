const Button = ({ children, className }) => {
  return (
    <div className={`${className}`}>
      <div className="group relative inline-block overflow-hidden border border-red-700 px-8 py-3 focus:outline-none focus:ring cursor-pointer">
        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-red-700 transition-all group-hover:h-full group-active:bg-red-600"></span>

        <span className="relative text-sm font-medium text-current transition-colors group-hover:text-white">
          {children}
        </span>
      </div>
    </div>
  );
};

export default Button;
