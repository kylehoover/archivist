import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { AsyncStatus, HasChildren } from "../types";
import { delay } from "./delay";
import { LoadingPlaceholder } from "../components";

type LoadStatus = "notLoaded" | "loaded";
type ResultError = Error | null;

const loadStatusByKey: { [key: string]: LoadStatus } = {};

export const useAsync = <TArgs extends any[], TReturn>(
  asyncFn: (...args: TArgs) => Promise<TReturn>,
  options?: {
    args?: TArgs;
    key?: string;
    minDelayMillis?: number;
    runImmediately?: boolean;
    onFailure?(error: ResultError): void;
    onSuccess?(data: TReturn | null): void;
  }
) => {
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const key = options?.key ?? "";

  if (key && !loadStatusByKey[key]) {
    loadStatusByKey[key] = "notLoaded";
  }

  const execute = useCallback(
    async (...args: TArgs) => {
      setStatus("pending");
      const start = dayjs();
      let responseData: TReturn | null = null;

      try {
        const response = await asyncFn(...args);
        responseData = response === undefined ? null : response;
      } catch (error) {
        // TODO: show generic toast when generic server error
        setStatus("error");
        options?.onFailure?.(error);
        return;
      }

      if (key) {
        loadStatusByKey[key] = "loaded";
      }

      if (options?.minDelayMillis !== undefined) {
        const delayTimeRemaining = options.minDelayMillis - dayjs().diff(start);

        if (delayTimeRemaining > 0) {
          await delay(delayTimeRemaining);
        }
      }

      setStatus("success");
      options?.onSuccess?.(responseData);
    },
    [asyncFn, key, options]
  );

  if (
    options?.runImmediately &&
    status === "idle" &&
    (!key || loadStatusByKey[key] === "notLoaded")
  ) {
    execute(...((options.args ?? []) as TArgs));
  }

  const Placeholder = useCallback(
    (props: HasChildren) => (
      <LoadingPlaceholder status={status}>{props.children}</LoadingPlaceholder>
    ),
    [status]
  );

  return [execute, status, Placeholder] as const;
};
