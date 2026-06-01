const SECTION_LABELS = {
    personal: 'Personal details',
    work: 'Work experience',
    education: 'Education',
  };
  
  function hasContent(value) {
    return value != null && String(value).trim() !== '';
  }
  
  export default function SectionPreview({ section }) {
    if (!section) return null;
  
    const { type, data } = section;
  
    switch (type) {
      case 'personal':
        return (
          <section className="cv-preview-block cv-preview-personal">
            {hasContent(data.fullName) && <h2>{data.fullName}</h2>}
            {hasContent(data.email) && <p>{data.email}</p>}
            {hasContent(data.phone) && <p>{data.phone}</p>}
          </section>
        );
  
      case 'work': {
        const items = data.items ?? [];
        if (items.length === 0) return null;
  
        return (
          <section className="cv-preview-block cv-preview-work">
            <h3>{SECTION_LABELS.work}</h3>
            <ul className="cv-preview-list">
              {items.map((entry) => {
                const role = entry.role?.trim();
                const company = entry.company?.trim();
                if (!role && !company) return null;
  
                return (
                  <li key={entry.id}>
                    {role && <strong>{role}</strong>}
                    {role && company && ' — '}
                    {company}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      }
  
      case 'education': {
        const items = data.items ?? [];
        if (items.length === 0) return null;
  
        return (
          <section className="cv-preview-block cv-preview-education">
            <h3>{SECTION_LABELS.education}</h3>
            <ul className="cv-preview-list">
              {items.map((entry) => {
                const school = entry.school?.trim();
                const from = entry.from?.trim();
                const to = entry.to?.trim();
                if (!school && !from && !to) return null;
  
                return (
                  <li key={entry.id}>
                    {school && <strong>{school}</strong>}
                    {(from || to) && (
                      <span>
                        {' '}
                        {from && `From: ${from}`}
                        {from && to && ' '}
                        {to && `To: ${to}`}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      }
  
      default:
        return null;
    }
  }