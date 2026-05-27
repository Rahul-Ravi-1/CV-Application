import './styles/App.css'
import Sidebar from './components/Sidebar.jsx'
import CVPreviewContainer from './components/CVPreviewContainer.jsx'
function App() {
  return (
    <main className="app">
      <Sidebar>

      </Sidebar>
      <CVPreviewContainer>
        <p>Name goes here</p>  
      </CVPreviewContainer>
    </main>
  )
}

export default App
