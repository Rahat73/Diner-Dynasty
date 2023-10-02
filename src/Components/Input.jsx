export const labelClassName =
  "relative block rounded-md border shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600";
export const inputClassName =
  "peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0";
export const spanClassName =
  "pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-base-100 p-0.5 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs";

const Input = ({ name, type, reference, defaultValue, disabled }) => {
  return (
    <label
      htmlFor={name}
      className="relative block rounded-md border shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <input
        type={type || `text`}
        id={name}
        name={name}
        ref={reference}
        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        placeholder={name}
        defaultValue={defaultValue}
        disabled={disabled}
        required
      />

      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-base-100 p-0.5 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
        {name}
      </span>
    </label>
  );
};

export default Input;
