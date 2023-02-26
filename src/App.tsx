import { useEffect, useState } from 'react'
import './App.css'
import Welcome from './Welcome';
import LearningQuiz from './LearningQuiz';
import { Box } from '@mui/material';

function App() {
  const [welcomeVisible, setWelcomeVisible] = useState(false)
  const [learnQuizVisible, setLearnQuizVisible] = useState(true)

  function startLearnQuiz() {
    setWelcomeVisible(false)
    setLearnQuizVisible(true)
  }

  function backToWelcome() {
    setLearnQuizVisible(false)
    setWelcomeVisible(true)
  }

  useEffect(() => {
      window.document.title = "ÖSV BFA Quiz"
    }
  )

  return (
    <Box className="App">
      {welcomeVisible ? <Welcome onStartLearnQuizClick={startLearnQuiz} /> : null}
      {learnQuizVisible ? <LearningQuiz onBack={backToWelcome} /> : null}
    </Box>
  )
}

export default App
