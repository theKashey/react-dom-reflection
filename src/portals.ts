import {Component} from 'react';
import {getReactStack} from "./hydrateStack";
import {FiberNode} from './types';

/**
 * Finds all portals within provided Fiber
 * @param stack
 */
export const portalsInFiber = (stack: FiberNode | null): Array<HTMLElement> => {
  const portals: Array<HTMLElement> = [];

  const traverse = (node: FiberNode, expectedParent: HTMLElement | null) => {
    if (node.tag === 'portal') {
      // portal resets parent
      expectedParent = {} as any;
    }
    // portal is where parent dom node changes unexpectedly
    if (expectedParent && (!node.type || node.tag === 'node')) {
      const stateNode: any = node.stateNode;
      if (stateNode.parentNode && stateNode.parentNode !== expectedParent) {
        portals.push(stateNode.parentNode);
        expectedParent = node.stateNode as any;
      }
    }
    if (typeof node.type === 'string') {
      expectedParent = node.stateNode as any;
    }
    node.children.forEach(child => traverse(child, expectedParent));
  };

  if (stack) {
    traverse(stack, null);
  }

  return portals;
};

/**
 * Finds all portals within provided Component Instance.
 * @param instance
 */
export const portalsWithin = (instance: Component<any>): Array<HTMLElement> => (
  portalsInFiber(getReactStack(instance))
);