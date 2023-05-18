import { useAliases } from "./useAliases";

export const useParticipant = (props: any) => {
  const { address } = props;

  const { getAlias } = useAliases();
  const alias = getAlias(address);

  return {
    ...props,
    alias,
  };
};
