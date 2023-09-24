const SectionHeader = ({ subHeading, heading }) => {
  return (
    <div className="md:w-1/2 mx-auto">
      <h1 className="italic text-center font-semibold text-amber-500">
        --- {subHeading} ---
      </h1>

      <h1 className="text-3xl font-semibold text-center py-3 border-y-4 mb-5">
        {heading}
      </h1>
    </div>
  );
};

export default SectionHeader;
