import './styles/App.css'
import Sidebar from './components/Sidebar.jsx'
import Section from './components/Section.jsx'
import CVPreviewContainer from './components/CVPreviewContainer.jsx'
import PersonalDetailsForm from './components/PersonalDetailsForm.jsx'
import WorkExperience from './components/WorkExperience.jsx'
import { useState } from 'react'
function App() {
  const [personalInfo, setPersonalInfo] = useState(
    {
      fullName: '',
      email: '',
      phone: '',
    }
  )
    
  function handlePersonalChange(field, value) {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }))
  }


  const [workExperience , setWorkExperience] = useState(
      [ {id: crypto.randomUUID(), role: ''}]
  )

  function addWorkExperience(){
    setWorkExperience((prev) => ([ ...prev, {id: crypto.randomUUID(), role: '' }]))
  }
  function updateWorkExperience ( id , field , value ){
    setWorkExperience((prev) => prev.map((entry) => 
          entry.id === id ? { ...entry, [field] : value} : entry 
      )
    )
  }
  function deleteWorkExperience(id) {
    setWorkExperience((prev) => prev.filter((entry) => entry.id !== id))
  }


  return (
    <main className="app">
      <Section/>
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
       >
      </WorkExperience>
      </Sidebar>
      <CVPreviewContainer>
        <p>{personalInfo.fullName}</p>
        <p>{personalInfo.email}</p>
        <p>{personalInfo.phone}</p>

        {workExperience.map((entry) => (
          <p key={entry.id}>{entry.role}</p>
        ))}
      </CVPreviewContainer>
    </main>
  )
}

export default App
