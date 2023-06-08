import { Address } from "everscale-inpage-provider";

export const isEmptyAddress = (address: Address) =>
  address.toString() ===
  "0:0000000000000000000000000000000000000000000000000000000000000000";

export type Nullabe<T> = T | null;

export const bufToHex = (buffer: any) => {
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
};

export const fromHexString = (hexString: string): Uint8Array =>
  // @ts-ignore
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

