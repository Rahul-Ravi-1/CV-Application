export default function Section({ sections, activeSectionId, setActiveSectionId, sectionCatalog, onAddSection }) {
  return (
    <nav className="section-bar" aria-label="CV sections">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          className={`section-bar__btn ${section.id === activeSectionId ? 'active' : ''}`}
          onClick={() => setActiveSectionId(section.id)}
          title={sectionCatalog[section.type].label}
        >
          {section.type}
        </button>
      ))}
      <button
        type="button"
        className="section-bar__btn section-bar__btn--add"
        onClick={() => onAddSection('custom')}
      >
        + Add section
      </button>
    </nav>
  );
}