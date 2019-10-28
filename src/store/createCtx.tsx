import React from "react";

type Context<A> = readonly [
  React.Context<{
    state: A;
    update: React.Dispatch<React.SetStateAction<A>>;
  }>,
  (props: { children?: React.ReactNode }) => JSX.Element
];

type Provider = any & {
  children?: React.ReactNode;
};

export default function createCtx<A>(defaultValue: A): Context<A> {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    state: defaultValue,
    update: defaultUpdate,
  });
  function Provider(props: React.PropsWithChildren<{}>): Provider {
    const [state, update] = React.useState(defaultValue);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <ctx.Provider value={{ state, update }} {...props} />;
  }
  return [ctx, Provider] as const;
}
