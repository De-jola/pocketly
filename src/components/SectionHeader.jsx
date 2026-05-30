const SectionHeader = ({ title, buttonText }) => {
  return (
    <main>
      <div>
        <h3>{title}</h3>
        <button>{buttonText}</button>
      </div>
    </main>
  );
};
export default SectionHeader;
