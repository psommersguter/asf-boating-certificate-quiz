import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

interface WelcomeProps {
  onStartLearnQuizClick: (categoryFilter?: string) => void
}

export function Welcome(props: WelcomeProps) {
  const { onStartLearnQuizClick } = props;

  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");

  return (
    <Stack>
      <Typography variant={"subtitle1"}>
        Willkommen zum interaktiven Vorbereitungs-Quiz für die Befähungsnachweise laut Österreichischem Segelverband
      </Typography>
      <Stack
        marginTop={"2rem"}
        justifyContent={"center"}
        direction={"row"}
        spacing={4}
      >
        <Button
          variant={"contained"}
          onClick={() => {
            if (selectedCategory === "Alle") {
              onStartLearnQuizClick(undefined)
            } else {
              onStartLearnQuizClick(selectedCategory)
            }
          }}>
          FB2 - Lernquiz Starten
        </Button>
        <CategorySelect
          selectedCategory={selectedCategory}
          onSelectedCategoryChange={event => {
            setSelectedCategory(event.target.value)
          }}
        />
      </Stack>
    </Stack>
  );

}

interface CategorySelectProps {
  selectedCategory: string | undefined
  onSelectedCategoryChange?: SelectInputProps<string>['onChange']
}

function CategorySelect(props: CategorySelectProps) {
  const { selectedCategory, onSelectedCategoryChange } = props;

  const categorySelectLabel = "Lernquiz Kategorie";

  return (
    <FormControl sx={{
      marginLeft: "1rem",
      width: "12rem",
    }}>
      <InputLabel id="category-select-label">{categorySelectLabel}</InputLabel>
      <Select
        labelId="category-select-label"
        value={selectedCategory}
        label={categorySelectLabel}
        onChange={onSelectedCategoryChange}
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
  );
}

export default Welcome
