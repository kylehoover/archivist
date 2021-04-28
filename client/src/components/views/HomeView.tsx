import { CampaignsPanel } from "../panels";
import { RacesPanel } from "../races";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

export const HomeView = () => {
  return (
    <div className="Home">
      {/* <div className="col sm-12">
        <CampaignsPanel />
      </div> */}

      <Link to="/campaign/new/">Create campaign</Link>

      <Grid container>
        <Grid item xs={12}>
          <RacesPanel />
        </Grid>
      </Grid>
    </div>
  );
};
