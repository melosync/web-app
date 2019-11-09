import { InferableComponentEnhancerWithProps } from "react-redux";

type TypeOfConnect<T> = T extends InferableComponentEnhancerWithProps<
  infer Props,
  infer _
>
  ? Props
  : never;

export default TypeOfConnect;
