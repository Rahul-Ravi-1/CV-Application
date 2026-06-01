const initialId = crypto.randomUUID();
  const SECTION_CATALOG = {
    personal: {
      label: 'Personal details',
      defaultData: { fullName: '', email: '', phone: '' },
    },
    work: {
      label: 'Work experience',
      defaultData: {
        items: [{ id: crypto.randomUUID(), role: '', company: '' }],
      },
    },
    education: {
      label: 'Education',
      defaultData: {
        items: [{ id: crypto.randomUUID(), school: '', from: '', to: '' }],
      },
    },

  };

function createInitialSections() {
    const personalId = crypto.randomUUID();

    return {
        sections : [
            { id: personalId, type: 'personal', data: structuredClone(SECTION_CATALOG.personal.defaultData) },
            { id: crypto.randomUUID(), type: 'education', data: structuredClone(SECTION_CATALOG.education.defaultData) },
            { id: crypto.randomUUID(), type: 'work', data: structuredClone(SECTION_CATALOG.work.defaultData) },
        ],
        activeSectionId: personalId
    };
}

export { SECTION_CATALOG , createInitialSections};