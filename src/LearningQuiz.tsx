import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import QuizCard from './QuizCard';
import questionData from './assets/fb2-questions.json';

interface Props {
  onBack: () => void
}

function LearningQuiz(props: Props) {

  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(Math.floor(Math.random() * questionData.length))
  const [showValidation, setShowValidation] = useState(false)

  function selectNextQuestion() {
    let nextQuestionIndex = Math.floor(Math.random() * questionData.length);
    while (nextQuestionIndex === activeQuestionIndex) {
      nextQuestionIndex = Math.floor(Math.random() * questionData.length);
    }
    setActiveQuestionIndex(nextQuestionIndex)
    setShowValidation(false)
  }

  return (
    <Box style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Button
        variant={"outlined"}
        onClick={props.onBack}
        style={{
          marginBottom: "2rem"
        }}
      >
        Session Beenden
      </Button>
      <QuizCard
        itemData={questionData[activeQuestionIndex]}
        onNextQuestion={selectNextQuestion}
        showValidation={showValidation}
        setShowValidation={setShowValidation}
      />
    </Box>
  )
}

export default LearningQuiz
