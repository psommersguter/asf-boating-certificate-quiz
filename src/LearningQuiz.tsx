import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import QuizCard from './QuizCard';
import questionData from './assets/fb2-questions.json';

interface Props {
  onBack: () => void
  categoryFilter?: string
}

function generateRandomNumber(upperBoundExclusive: number) {
  return Math.floor(Math.random() * upperBoundExclusive);
}

function LearningQuiz(props: Props) {
  const { categoryFilter, onBack } = props;

  const filteredQuestions = questionData.filter(question => {
    if (categoryFilter === undefined) {
      return true;
    }

    return question.metadata.category === categoryFilter;
  })

  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(generateRandomNumber(filteredQuestions.length))
  const [showValidation, setShowValidation] = useState(false)

  function selectNextQuestion() {
    let nextQuestionIndex = generateRandomNumber(filteredQuestions.length);
    while (nextQuestionIndex === activeQuestionIndex) {
      nextQuestionIndex = generateRandomNumber(filteredQuestions.length);
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
        onClick={onBack}
        style={{
          marginBottom: "2rem"
        }}
      >
        Session Beenden
      </Button>
      <QuizCard
        itemData={filteredQuestions[activeQuestionIndex]}
        onNextQuestion={selectNextQuestion}
        showValidation={showValidation}
        setShowValidation={setShowValidation}
      />
    </Box>
  )
}

export default LearningQuiz
