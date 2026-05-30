const SectionHeader = ({ title, buttonText }) => {
  return (
    <main>
      <div className="flex items-center justify-between">
        <h3>{title}</h3>
        <button>{buttonText}</button>
      </div>
    </main>
  );
};
export default SectionHeader;
