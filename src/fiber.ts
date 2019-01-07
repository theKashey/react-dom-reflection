import {Component} from "react";

export const getFiberFromInstance = (instance: Component<any>): any => (
  // @ts-ignore
  instance._reactInternalFiber || // React 16
  // @ts-ignore
  instance._reactInternalInstance || // React 15
  null
);

export const isReact16Fiber = (rootNode: any): boolean => (
  rootNode && typeof rootNode.tag === 'number'
);