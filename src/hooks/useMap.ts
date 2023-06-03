import { useState } from "react";

export const useMap = (
  initialMap = new Map()
): [Map<any, any>, (key: any, value: any) => void, (key: any) => void] => {
  const [data, setData] = useState(initialMap);

  const add = (key: any, value: any) => {
    setData((current) => new Map(current.set(key, value)));
  };
  const remove = (key: any) => {
    data.delete(key);
    setData(data);
  };

  return [data, add, remove];
};
