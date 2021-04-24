/* eslint-disable */
import { useEffect } from "react";
import { fetchCampaign } from "../../../graphql";
import { useAsync } from "../../../helpers";
import { useCampaign, useCampaignStore } from "./";

export const useCampaignLoader = (id: string) => {
  const campaign = useCampaign(id);
  const { addCampaign } = useCampaignStore();
  const [loadCampaign, result] = useAsync(fetchCampaign, {
    minDelayMillis: 250,
  });
  // const { isIdle, isPending } = result
  const isLoading = false; //campaign === undefined && (isIdle || isPending)
  const notFound = campaign === undefined && !isLoading;

  // useEffect(() => {
  //   const run = async () => {
  //     // const { data, isSuccess } = await loadCampaign(id)

  //     // if (isSuccess && data !== null) {
  //     //   addCampaign(data)
  //     // }
  //   }

  //   if (isIdle && campaign === undefined) {
  //     run()
  //   }
  // }, [addCampaign, campaign, id, isIdle, loadCampaign])

  return {
    campaign,
    isLoading,
    notFound,
  };
};
