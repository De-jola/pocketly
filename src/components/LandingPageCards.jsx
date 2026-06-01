const LandingPageCard = ({ icon: Icon, title, description }) => {
  return (
    <article className="rounded-2xl shadow-lg p-6 flex flex-col gap-4">
      <header>
        <Icon size={25} className="text-primary mb-4" />
        <h3 className="text-xl font-bold">{title}</h3>
      </header>
      <p>{description}</p>
    </article>
  );
};
export default LandingPageCard;
