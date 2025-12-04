const MainContent = ({ sections, sectionRefs }: any) => {
  return (
    <div className="container mx-auto flex-1 space-y-5 p-4">
      {sections.map((section: any, index: number) => (
        <div
          id={section.id}
          key={index}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg"
        >
          <h2 className="text-2xl text-red-primary font-bold mb-4">
            {section.title}
          </h2>
          <div className="text-[#595959] text-[16px] ">{section.content}</div>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
