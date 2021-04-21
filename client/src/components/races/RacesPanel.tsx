import { Button, Grid, Paper } from "@material-ui/core";

export function RacesPanel() {
  return (
    <Paper className="m-3">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button>Dwarf</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
