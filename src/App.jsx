import './styles/App.css'
import Sidebar from './components/Sidebar.jsx'
import Section from './components/Section.jsx'
import CVPreviewContainer from './components/CVPreviewContainer.jsx'
import PersonalDetailsForm from './components/PersonalDetailsForm.jsx'
import WorkExperience from './components/WorkExperience.jsx'
import Education from './components/Education.jsx'
import SectionPreview from './components/SectionPreview.jsx';
import {
  SECTION_CATALOG,
  createInitialSections,
} from './javascript/sectionCatalog.js';

import { useState } from 'react'
function App() {
  const init = createInitialSections();
  const [sections, setSections] = useState(init.sections);
  const [activeSectionId, setActiveSectionId] = useState(init.activeSectionId);
  const activeSection = sections.find((s) => s.id === activeSectionId);

  function resolveSectionId(type, sectionId) {
    if (sectionId != null) return sectionId;
    const active = sections.find((s) => s.id === activeSectionId);
    if (active?.type === type) return active.id;
    return sections.find((s) => s.type === type)?.id;
  }

  function addSection(type) {
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
  return (
    <main className="app">
      <Section
        sections={sections}
        activeSectionId={activeSectionId}
        setActiveSectionId={setActiveSectionId}
        sectionCatalog={SECTION_CATALOG}
      />
      <Sidebar>
        {activeSection?.type === 'personal' && (
          <PersonalDetailsForm
            personalInfo={activeSection.data}
            onChange={handlePersonalChange}
          />
        )}
        {activeSection?.type === 'work' && (
          <WorkExperience
            workExperience={activeSection.data.items ?? []}
            onAdd={() => addWorkExperience(activeSection.id)}
            onChange={updateWorkExperience}
          />
        )}
        {activeSection?.type === 'education' && (
          <Education
            education={activeSection.data.items ?? []}
            onAdd={() => addEducation(activeSection.id)}
            onChange={updateEducation}
          />
        )}
      </Sidebar>
      <CVPreviewContainer>
        {sections.map((section) => (
          <SectionPreview key={section.id} section={section} />
        ))}
      </CVPreviewContainer>
    </main>
  )
}

export default App
