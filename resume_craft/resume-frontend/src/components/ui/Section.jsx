const Section = ({ title, children }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
      {title}
    </h2>
    {children}
  </div>
);

export default Section;
