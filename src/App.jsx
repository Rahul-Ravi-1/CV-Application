import './styles/App.css'
import Sidebar from './components/Sidebar.jsx'
import Section from './components/Section.jsx'
import CVPreviewContainer from './components/CVPreviewContainer.jsx'
import PersonalDetailsForm from './components/PersonalDetailsForm.jsx'
import WorkExperience from './components/WorkExperience.jsx'
import Education from './components/Education.jsx'
import { useState } from 'react'
function App() {
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

  const [sections, setSections] = useState([
    { id: initialId, type: 'personal', data: structuredClone(SECTION_CATALOG.personal.defaultData) },
    { id: crypto.randomUUID(), type: 'work', data: structuredClone(SECTION_CATALOG.work.defaultData) },
    { id: crypto.randomUUID(), type: 'education', data: structuredClone(SECTION_CATALOG.education.defaultData) },
  ]);
  const [activeSectionId, setActiveSectionId] = useState(initialId);

  function resolveSectionId(type, sectionId) {
    if (sectionId != null) return sectionId;
    const active = sections.find((s) => s.id === activeSectionId);
    if (active?.type === type) return active.id;
    return sections.find((s) => s.type === type)?.id;
  }

  function addSection(type)
  {
    const template = SECTION_CATALOG[type];
    const newSection = {
      id: crypto.randomUUID(),
      type,
      data: structuredClone(template.defaultData),
    };
    setSections((prev) => [...prev, newSection]);
    setActiveSectionId(newSection.id);
  }

  function deleteSection(sectionId) {
    setSections((prev) => {
      const next = prev.filter((section) => section.id !== sectionId);
      if (activeSectionId === sectionId) {
        setActiveSectionId(next[0]?.id ?? null);
      }
      return next;
    });
  }

  function updatePersonal(sectionId, field, value) {
    setSections((prev) =>
      prev.map((section) =>
        section.id !== sectionId
          ? section
          : { ...section, data: { ...section.data, [field]: value } }
      )
    );
  }

  function handlePersonalChange(field, value) {
    const sectionId = resolveSectionId('personal');
    if (sectionId) updatePersonal(sectionId, field, value);
  }

  function addWorkExperience(sectionId) {
    const id = resolveSectionId('work', sectionId);
    if (!id) return;
    setSections((prev) =>
      prev.map((section) =>
        section.id !== id
          ? section
          : {
              ...section,
              data: {
                ...section.data,
                items: [
                  ...(section.data.items ?? []),
                  { id: crypto.randomUUID(), role: '', company: '' },
                ],
              },
            }
      )
    );
  }

  function updateWorkEntry(sectionId, entryId, field, value) {
    setSections((prev) =>
      prev.map((section) =>
        section.id !== sectionId
          ? section
          : {
              ...section,
              data: {
                ...section.data,
                items: (section.data.items ?? []).map((entry) =>
                  entry.id === entryId ? { ...entry, [field]: value } : entry
                ),
              },
            }
      )
    );
  }

  function updateWorkExperience(entryId, field, value) {
    const sectionId = resolveSectionId('work');
    if (sectionId) updateWorkEntry(sectionId, entryId, field, value);
  }

  function deleteWorkEntry(sectionId, entryId) {
    setSections((prev) =>
      prev.map((section) =>
        section.id !== sectionId
          ? section
          : {
              ...section,
              data: {
                ...section.data,
                items: (section.data.items ?? []).filter(
                  (entry) => entry.id !== entryId
                ),
              },
            }
      )
    );
  }

  function deleteWorkExperience(entryId) {
    const sectionId = resolveSectionId('work');
    if (sectionId) deleteWorkEntry(sectionId, entryId);
  }

  function addEducation(sectionId) {
    const id = resolveSectionId('education', sectionId);
    if (!id) return;
    setSections((prev) =>
      prev.map((section) =>
        section.id !== id
          ? section
          : {
              ...section,
              data: {
                ...section.data,
                items: [
                  ...(section.data.items ?? []),
                  {
                    id: crypto.randomUUID(),
                    school: '',
                    from: '',
                    to: '',
                  },
                ],
              },
            }
      )
    );
  }

  function updateEducationEntry(sectionId, entryId, field, value) {
    setSections((prev) =>
      prev.map((section) =>
        section.id !== sectionId
          ? section
          : {
              ...section,
              data: {
                ...section.data,
                items: (section.data.items ?? []).map((entry) =>
                  entry.id === entryId ? { ...entry, [field]: value } : entry
                ),
              },
            }
      )
    );
  }

  function updateEducation(entryId, field, value) {
    const sectionId = resolveSectionId('education');
    if (sectionId) updateEducationEntry(sectionId, entryId, field, value);
  }

  function deleteEducationEntry(sectionId, entryId) {
    setSections((prev) =>
      prev.map((section) =>
        section.id !== sectionId
          ? section
          : {
              ...section,
              data: {
                ...section.data,
                items: (section.data.items ?? []).filter(
                  (entry) => entry.id !== entryId
                ),
              },
            }
      )
    );
  }

  function deleteEducation(entryId) {
    const sectionId = resolveSectionId('education');
    if (sectionId) deleteEducationEntry(sectionId, entryId);
  }

  const personalInfo =
    sections.find((s) => s.type === 'personal')?.data ?? {
      fullName: '',
      email: '',
      phone: '',
    };

  const workExperience =
    sections.find((s) => s.type === 'work')?.data?.items ?? [];

  const education =
    sections.find((s) => s.type === 'education')?.data?.items ?? [];

  return (
    <main className="app">
      <Section
        sections = {sections}
        activeSectionId={activeSectionId}
        setActiveSectionId={setActiveSectionId}
        sectionCatalog={SECTION_CATALOG}
      />
      <Sidebar>
        <PersonalDetailsForm
        personalInfo={personalInfo}
        onChange={handlePersonalChange}
        >
        </PersonalDetailsForm>
      <WorkExperience
       workExperience={workExperience}
       onAdd={addWorkExperience}
       onChange={updateWorkExperience}
       />
      <Education
        education={education}
        onAdd={addEducation}
        onChange={updateEducation}
      />
      </Sidebar>
      <CVPreviewContainer>
        <p>{personalInfo.fullName}</p>
        <p>{personalInfo.email}</p>
        <p>{personalInfo.phone}</p>

        {workExperience.map((entry) => (
          <p key={entry.id}>{entry.role}</p>
        ))}

        {education.map((entry) => (
          <p key={entry.id}>{entry.school} From: {entry.from} To: {entry.to}</p>
        ))}
      </CVPreviewContainer>
    </main>
  )
}

export default App
