import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
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
    <Stack
      spacing={"2rem"}
    >
      <Button
        variant={"outlined"}
        onClick={onBack}
      >
        Session Beenden
      </Button>
      <QuizCard
        itemData={filteredQuestions[activeQuestionIndex]}
        onNextQuestion={selectNextQuestion}
        showValidation={showValidation}
        setShowValidation={setShowValidation}
      />
    </Stack>
  )
}

export default LearningQuiz
