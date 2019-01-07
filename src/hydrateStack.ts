import {getFiberFromInstance, isReact16Fiber} from "./fiber";
import {fiber16SParents, fiber16Stack} from "./stacks/React16";

export const getParents = (instance: any): any => {
  const rootNode = getFiberFromInstance(instance);

  // React 16
  if (isReact16Fiber(rootNode)) {
    return fiber16SParents(rootNode);
  }
  return [];
}

export function getReactStack(instance: any) {
  const rootNode = getFiberFromInstance(instance)
  if (isReact16Fiber(rootNode)) {
    return fiber16Stack(rootNode)
  }
  return null;
}