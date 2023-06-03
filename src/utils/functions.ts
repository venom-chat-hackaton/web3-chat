import { Address } from "everscale-inpage-provider";

export const isEmptyAddress = (address: Address) =>
  address.toString() ===
  "0:0000000000000000000000000000000000000000000000000000000000000000";

export type Nullabe<T> = T | null;
