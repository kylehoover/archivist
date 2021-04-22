import AddIcon from "@material-ui/icons/Add";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { useRacesLoader } from "../../races";
import { observer } from "mobx-react-lite";

export const RacesPanel = observer(() => {
  const races = useRacesLoader();
  const racesSorted = races.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Paper className="p-1">
      <Typography variant="h4" className="mb-1">
        Races
      </Typography>

      <Grid container spacing={2}>
        {racesSorted.map((race) => (
          <Grid item xs={12} sm={6} md={3} key={race.id}>
            <Button className="h-min-3-5 w-100" variant="outlined">
              {race.name}
            </Button>
          </Grid>
        ))}

        {/* <Grid item xs={12} sm={6} md={3}>
          <Button className="h-min-3-5 w-100" variant="outlined">
            Dwarf
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button className="h-min-3-5 w-100" variant="outlined">
            Elf
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button className="h-min-3-5 w-100" variant="outlined">
            Halfling
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button className="h-min-3-5 w-100" variant="outlined">
            Human
          </Button>
        </Grid> */}
        <Grid item xs={12} sm={6} md={3}>
          <Button className="h-min-3-5 w-100" variant="outlined">
            <AddIcon fontSize="large" />
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
});
