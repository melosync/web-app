import { InferableComponentEnhancerWithProps } from "react-redux";

export type TypeOfConnect<T> = T extends InferableComponentEnhancerWithProps<
  infer Props,
  infer _
>
  ? Props
  : never;
