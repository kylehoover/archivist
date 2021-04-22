import { CampaignsPanel } from "../panels";
import { RacesPanel } from "../races";
import { Grid } from "@material-ui/core";

export const HomeView = () => {
  return (
    <div className="Home">
      {/* <div className="col sm-12">
        <CampaignsPanel />
      </div> */}

      <Grid container>
        <Grid item xs={12}>
          <RacesPanel />
        </Grid>
      </Grid>
    </div>
  );
};
