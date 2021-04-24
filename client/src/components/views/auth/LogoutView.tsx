import { useHistory } from "react-router-dom";
import { logoutUser } from "../../../graphql";
import { useAsync } from "../../../helpers";
import { useRootStore } from "../../../stores";
import { CircularProgress, Grid } from "@material-ui/core";

export const LogoutView = () => {
  const history = useHistory();
  const { clearStores } = useRootStore();

  useAsync(logoutUser, {
    minDelayMillis: 500,
    runImmediately: true,
    onSuccess: () => {
      clearStores();
      history.push("/");
    },
  });

  return (
    <Grid
      container
      className="LogoutView mt-4"
      alignItems="center"
      justify="center"
    >
      <CircularProgress />
    </Grid>
  );
};
