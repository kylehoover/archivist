/* eslint-disable */
import { useEffect, useState } from "react";
import { fetchCampaigns } from "../../../graphql";
import { useAsync } from "../../../helpers";
import { useCampaignStore } from "./useCampaignStore";

export const useCampaignsLoader = () => {
  const store = useCampaignStore();
  const { addCampaigns, handleDidLoadData, needsToLoadData } = store;
  // const [loadCampaigns, { isError }] = useAsync(fetchCampaigns, { minDelayMillis: 250 })
  const [isPending, setPending] = useState(false);

  // useEffect(() => {
  //   const run = async () => {
  //     setPending(true)
  //     const { data, isSuccess } = await loadCampaigns()

  //     if (isSuccess && data !== null) {
  //       addCampaigns(data)
  //       handleDidLoadData()
  //     }
  //     setPending(false)
  //   }

  //   if (needsToLoadData && !isPending && !isError) {
  //     run()
  //   }
  // }, [addCampaigns, handleDidLoadData, isError, isPending, loadCampaigns, needsToLoadData])
};
