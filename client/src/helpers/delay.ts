export function delay(delayTimeMillis: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delayTimeMillis);
  });
}
