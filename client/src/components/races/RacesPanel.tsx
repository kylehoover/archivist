import AddIcon from "@material-ui/icons/Add";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useRacesPreviewLoader } from "../../races/useRacesPreviewLoader";

export const RacesPanel = observer(() => {
  const [races, LoadingPlaceHolder] = useRacesPreviewLoader();
  const racesSorted = races
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Paper className="p-1">
      <Typography variant="h4" className="mb-1">
        Races
      </Typography>

      <LoadingPlaceHolder>
        <Grid container spacing={2}>
          {racesSorted.map((race) => (
            <Grid item xs={12} sm={6} md={3} key={race.id}>
              <Button className="h-min-3-5 w-100" variant="outlined">
                {race.name}
              </Button>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={3}>
            <Button className="h-min-3-5 w-100" variant="outlined">
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
      </LoadingPlaceHolder>
    </Paper>
  );
});
