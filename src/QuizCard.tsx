import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Typography
} from '@mui/material';
import { AnswerData, QuizItemData } from './model';
import { useState } from 'react';

interface Props {

  itemData: QuizItemData,

  onNextQuestion: () => void,

  showValidation: boolean

  setShowValidation: (value: (((prevState: boolean) => boolean) | boolean)) => void,
}


function ValidationText({ everythingCorrect }: { everythingCorrect: boolean | null }) {
  if (everythingCorrect === null) {
    return null;
  }

  const text = everythingCorrect ? "Die Frage wurde richtig beantwortet!" : "Leider falsch.";

  return (
    <Typography sx={{ marginTop: "2rem", fontWeight: "bold" }} variant={"h6"}>{text}</Typography>
  )
}

interface AnswerThingyProps {
  data: AnswerData,

  userChecked: boolean,

  setUserChecked: (value: (((prevState: boolean) => boolean) | boolean)) => void,
  showValidation: boolean
}

function AnswerThingy(props: AnswerThingyProps) {

  const { data, userChecked, setUserChecked, showValidation } = props
  const { text, correct } = data

  function determineValidationColor(): string | undefined {
    if (!showValidation) {
      return undefined
    }

    if (correct) {
      return "green"
    } else {
      return "red"
    }
  }

  return (
    <>
      <Checkbox checked={userChecked} onChange={event => setUserChecked(event.target.checked)} />
      <Typography sx={{
        textAlign: "left",
        color: determineValidationColor()
      }}>
        {text}
      </Typography>
    </>
  )

}

function QuizCard(props: Props) {
  const { itemData, onNextQuestion, showValidation, setShowValidation } = props
  const { question, answer1, answer2, answer3, answer4, metadata } = itemData

  const [answer1Check, setAnswer1Check] = useState<boolean>(false)
  const [answer2Check, setAnswer2Check] = useState<boolean>(false)
  const [answer3Check, setAnswer3Check] = useState<boolean>(false)
  const [answer4Check, setAnswer4Check] = useState<boolean>(false)

  const subheaderText = metadata === undefined ? undefined : `${metadata.category} - ${metadata.number} (${metadata.code})`

  const allCheckboxesCorrect = answer1.correct === answer1Check
    && answer2.correct === answer2Check
    && answer3.correct === answer3Check
    && answer4.correct === answer4Check

  return (
    <Card raised>
      <CardHeader
        title={question}
        subheader={subheaderText}
      >
      </CardHeader>
      {
        itemData.pictureBase64 === undefined ? null :
          <Box sx={{
            padding: "1rem"
          }}>
            <CardMedia
              component="img"
              image={itemData.pictureBase64}
              sx={{
                width: { md: "auto" },
                height: { md: "20rem" },
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            />
          </Box>
      }
      <CardContent>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: " max-content 1fr",
          alignItems: "center",
          gridRowGap: "1rem"
        }}>
          <AnswerThingy
            data={answer1}
            userChecked={answer1Check}
            setUserChecked={setAnswer1Check}
            showValidation={showValidation}
          />
          <AnswerThingy
            data={answer2}
            userChecked={answer2Check}
            setUserChecked={setAnswer2Check}
            showValidation={showValidation}
          />
          <AnswerThingy
            data={answer3}
            userChecked={answer3Check}
            setUserChecked={setAnswer3Check}
            showValidation={showValidation}
          />
          <AnswerThingy
            data={answer4}
            userChecked={answer4Check}
            setUserChecked={setAnswer4Check}
            showValidation={showValidation}
          />
        </Box>
        <ValidationText everythingCorrect={showValidation ? allCheckboxesCorrect : null} />
      </CardContent>
      <CardActions>
        <Box sx={{
          width: "100%",
          textAlign: "right"
        }}
        >
          {!showValidation ?
            <Button size="small" onClick={() => setShowValidation(!showValidation)}>Überprüfen</Button>
            :
            <Button size="small" onClick={() => {
              setAnswer1Check(false)
              setAnswer2Check(false)
              setAnswer3Check(false)
              setAnswer4Check(false)
              onNextQuestion()
            }}>
              Nächste Frage
            </Button>
          }
        </Box>
      </CardActions>
    </Card>
  )

}

export default QuizCard
