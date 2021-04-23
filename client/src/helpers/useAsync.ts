import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { useDelay } from "./useDelay";

type AsyncStatus = "error" | "idle" | "pending" | "success";
type LoadStatus = "notLoaded" | "loaded";
type ResultError = Error | null;

interface Options<ResponseData> {
  args?: any[];
  key?: string;
  loadStatus?: LoadStatus;
  minDelayMillis?: number;
  runImmediately?: boolean;
  onSuccess?(data: ResponseData): void;
  updateLoadStatus?(status: LoadStatus): void;
}

const loadStatusByKey: { [key: string]: LoadStatus } = {};

export class Result<T> {
  constructor(
    public readonly data: T | null,
    public readonly error: ResultError,
    public readonly status: AsyncStatus
  ) {}

  public get isError(): boolean {
    return this.status === "error";
  }

  public get isIdle(): boolean {
    return this.status === "idle";
  }

  public get isPending(): boolean {
    return this.status === "pending";
  }

  public get isSuccess(): boolean {
    return this.status === "success";
  }
}

export const useAsync = <Args extends any[], ResponseData>(
  asyncFn: (...args: Args) => Promise<ResponseData>,
  options?: Options<ResponseData | null>
  // ...args: Args
) => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<ResultError>(null);
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const result = useMemo(() => new Result(data, error, status), [
    data,
    error,
    status,
  ]);
  const delay = useDelay();
  const key = options?.key ?? "";

  if (key && !loadStatusByKey[key]) {
    loadStatusByKey[key] = "notLoaded";
  }

  const execute = useCallback(
    async (...args: Args) => {
      const start = dayjs();
      let localData: ResponseData | null = null;
      let localError: ResultError = null;
      let localStatus: AsyncStatus = "pending";
      setData(localData);
      setError(localError);
      setStatus(localStatus);

      try {
        const response = await asyncFn(...args);
        localData = response === undefined ? null : response;
        localStatus = "success";
      } catch (error) {
        // TODO: show generic toast when generic server error
        localError = error;
        localStatus = "error";
        console.log(error);
      }

      if (options?.minDelayMillis !== undefined) {
        const delayTimeRemaining = options.minDelayMillis - dayjs().diff(start);

        if (delayTimeRemaining > 0) {
          await delay(delayTimeRemaining);
        }
      }

      if (localStatus === "success") {
        options?.updateLoadStatus?.("loaded");
        options?.onSuccess?.(localData);

        if (key) {
          loadStatusByKey[key] = "loaded";
        }
      }

      setData(localData);
      setError(localError);
      setStatus(localStatus);

      return new Result(localData, localError, localStatus);
    },
    [asyncFn, delay, options]
  );

  if (
    options?.runImmediately &&
    status === "idle" &&
    (!key || loadStatusByKey[key] === "notLoaded")
  ) {
    (execute as any)();
    // execute(...args);
  }

  return [execute, result] as const;
};
