import {Component} from "react";
import {portalsInFiber, portalsWithin} from "./portals";
import {childNodesWithin, getFiberFromNode} from "./node";

export const instanceContainsNode = (instance: Component<any>, node: HTMLElement) => (
  portalsWithin(instance).some(portal => portal.contains(node)) ||
  childNodesWithin(instance).some(child => child.contains(node))
);

export const nodeContainsNode = (hostNode: HTMLElement, node: HTMLElement) => (
  node === hostNode ||
  hostNode.contains(node) ||
  portalsInFiber(getFiberFromNode(hostNode)).some(portal => portal.contains(node))
)