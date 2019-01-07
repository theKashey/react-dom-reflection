import {Component} from "react";
import {getFiberFromNode as react16GetFiberFromNode} from "./stacks/React16";
import {FiberNode} from "./types";
import {getReactStack} from "./hydrateStack";

export const getFiberFromNode = (node: HTMLElement) => (
  react16GetFiberFromNode(node)
);

export const childNodesWithin = (instance: Component<any>): Array<HTMLElement> => {
  const nodes: Array<HTMLElement> = [];

  const traverse = (node: FiberNode) => {
    if (node.tag === 'node') {
      nodes.push(node.stateNode as any);
    } else {
      node.children.forEach(traverse);
    }
  };

  const stack = getReactStack(instance);

  if (stack) {
    traverse(stack);
  }

  return nodes;
};