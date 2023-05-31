import { AliasToken } from "antd/es/theme/internal";
import { overrides } from "./overrides";

export const dark: Partial<AliasToken | any> = {
  ...overrides,
  colorBgContainer: "rgba(255,255,255,.04)",
  colorBgBase: "#252525",
  colorTextBase: "#EEEEEE",
  colorBorder: "rgba(255,255,255,.2)",
  colorPrimary: "#11a97d",
  colorPrimaryHover: "#15cc97",
  colorMessageText: "#171717",
  colorMessageBg: "white",
  colorTextBaseFilter:
    "invert(99%) sepia(1%) saturate(1567%) hue-rotate(135deg) brightness(113%) contrast(87%)",
};
