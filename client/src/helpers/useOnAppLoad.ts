import { useHistory } from "react-router-dom";
import { useAsync } from ".";
import { useStores } from "../stores";

export const useOnAppLoad = () => {
  const history = useHistory();
  const { userStore } = useStores();

  const [, status] = useAsync(userStore.loadCurrentUser, {
    key: "currentUser",
    runImmediately: true,
    onFailure: () => history.replace("/"),
    onSuccess: () => {
      if (window.location.pathname === "/") {
        history.replace("/home/");
      }
    },
  });

  return {
    isLoading: status === "idle" || status === "pending",
  };
};
