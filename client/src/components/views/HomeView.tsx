import React from "react";
import { CampaignsPanel } from "../panels";
import { useRacesLoader } from "../../stores";
import { RacesPanel } from "../races";

export const HomeView = () => {
  useRacesLoader();

  return (
    <div className="Home row center">
      <div className="col sm-12">
        <CampaignsPanel />
      </div>

      <RacesPanel />
    </div>
  );
};
