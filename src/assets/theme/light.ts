import { AliasToken } from "antd/es/theme/internal";
import { overrides } from "./overrides";

export const light: Partial<AliasToken | any> = {
  ...overrides,
  colorBgContainer: "rgba(0,0,0,.02)",
  colorBgBase: "rgb(248, 248, 248)",
  colorTextBase: "#171717",
  colorBorder: "rgba(0,0,0,.07)",
  colorPrimary: "#11a97d",
  colorPrimaryHover: "#15cc97",
  colorMessageBg: "rgba(0,0,0,.07)",
  colorMessageText: "#171717",
  colorTextBaseFilter:
    "invert(4%) sepia(11%) saturate(0%) hue-rotate(352deg) brightness(104%) contrast(90%)",
};
