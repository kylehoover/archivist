import { Alert } from "@material-ui/lab";
import { CircularProgress, Grid } from "@material-ui/core";
import { AsyncStatus, HasChildren } from "../../../types";
import "./LoadingPlaceholder.scss";

interface Props extends HasChildren {
  status: AsyncStatus;
}

export function LoadingPlaceholder(props: Props) {
  const { children, status } = props;

  return (
    <div className="LoadingPlaceholder">
      {(status === "idle" || status === "pending") && (
        <Grid container className="p-1" justify="center">
          <CircularProgress />
        </Grid>
      )}

      {status === "error" && <Alert severity="error">Error loading data</Alert>}

      {status === "success" && children}
    </div>
  );
}
