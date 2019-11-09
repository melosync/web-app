import { InferableComponentEnhancerWithProps } from "react-redux";

type TypeOfConnect<T> = T extends InferableComponentEnhancerWithProps<
  infer Props,
  infer _
>
  ? Props
  : never;

// eslint-disable-next-line no-undef
export default TypeOfConnect;
