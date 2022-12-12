export const isPromise = (potentialPromise: any) =>
  potentialPromise !== null &&
  typeof potentialPromise === "object" &&
  typeof potentialPromise.then === "function";
