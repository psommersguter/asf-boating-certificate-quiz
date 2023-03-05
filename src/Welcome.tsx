import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';

interface Props {
  onStartLearnQuizClick: (categoryFilter?: string) => void
}

export function Welcome(props: Props) {
  const { onStartLearnQuizClick } = props

  const [selectedCategory, setSelectedCategory] = useState<string>("Alle")

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
        <Box
          sx={{
            width: "100%",
            flexDirection: "row"
          }}
        >
          <Button onClick={() => {
            console.log("start button clicked", selectedCategory)
            if (selectedCategory === "Alle") {
              onStartLearnQuizClick(undefined)
            } else {
              onStartLearnQuizClick(selectedCategory)
            }
          }}>
            FB2 - Lernquiz Starten
          </Button>
          <FormControl sx={{
            marginLeft: "1rem",
            width: "10rem",
          }}>
            <InputLabel id="category-select-label">Kategorie</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              label="Kategorie"
              onChange={event => {
                setSelectedCategory(event.target.value)
              }}
            >
              <MenuItem value={"Alle"}>Alle</MenuItem>
              <MenuItem value={"Jachtbedienung"}>Jachtbedienung</MenuItem>
              <MenuItem value={"Bootsbau"}>Bootsbau</MenuItem>
              <MenuItem value={"Navigation"}>Navigation</MenuItem>
              <MenuItem value={"Rechtskunde"}>Rechtskunde</MenuItem>
              <MenuItem value={"Wetter"}>Wetter</MenuItem>
              <MenuItem value={"Sicherheit"}>Sicherheit</MenuItem>
              <MenuItem value={"Modul Motor"}>Modul Motor</MenuItem>
              <MenuItem value={"Modul Segeln"}>Modul Segeln</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  )

}

export default Welcome
