export default function Section({sections, activeSectionId, onSelectSection , sectionCatalog }) {
    return (
        sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={section.id === activeSectionId ? 'active' : ''}
              onClick={() => onSelectSection(section.id)}
              title={sectionCatalog[section.type].label}
            >
              {section.type}
            </button>
          ))
    );
}