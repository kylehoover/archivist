import AddIcon from "@material-ui/icons/Add";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { useRacesLoader } from "../../stores";

export function RacesPanel() {
  useRacesLoader();

  return (
    <Paper className="p-1">
      <Typography variant="h4" className="mb-1">
        Races
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
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
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button className="h-min-3-5 w-100" variant="outlined">
            <AddIcon fontSize="large" />
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
