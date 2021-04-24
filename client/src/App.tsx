import { CircularProgress, Grid } from "@material-ui/core";
import { NavBarFlat, Routes } from "./components";
import { useOnAppLoad } from "./helpers";

export const App = () => {
  const { isLoading } = useOnAppLoad();

  if (isLoading) {
    return (
      <Grid container className="h-full" alignItems="center" justify="center">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <div className="App">
      <NavBarFlat />
      <main>
        <Routes />
      </main>
    </div>
  );
};
