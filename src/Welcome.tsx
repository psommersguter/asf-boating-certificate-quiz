import { Box, Button, Typography } from '@mui/material';

interface Props {
  onStartLearnQuizClick: () => void
}

export function Welcome(props: Props) {

  const { onStartLearnQuizClick } = props

  return (
    <Box>
      <Typography variant={"subtitle1"}>
        Willkommen zum interaktiven Vorbereitungs-Quiz für die Befähungsnachweise laut Österreichischem Segelverband
      </Typography>
      <Box sx={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column"
      }}>
        <Button onClick={onStartLearnQuizClick}>
          FB2 - Quiz zum Lernen für Starten
        </Button>
      </Box>
    </Box>
  )

}


export default Welcome
