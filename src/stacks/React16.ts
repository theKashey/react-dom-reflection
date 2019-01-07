import {FiberNode, FiberTag} from '../types';

const tagToType = (type: number): FiberTag => {
  switch (type) {
    case 3:
      return 'root';
    case 4:
      return 'portal';
    case 0:
    case 1:
    case 2:
      return 'component';
    case 5:
      return 'node';
    case 6:
      return 'text';
    case 13:
      return 'suspense';
    default:
      return 'unknown'
  }
}

const cast = (fiber: any): FiberNode => ({
  stateNode: fiber.stateNode,
  type: fiber.type,
  tag: tagToType(fiber.tag),
  elementType: fiber.elementType || fiber.type,
  props: fiber.memoizedProps,
  children: []
});

export const fiber16Stack = (node: any): FiberNode => {
  const stack = cast(node);
  if (node.child) {
    let {child} = node;
    do {
      stack.children.push(fiber16Stack(child));
      child = child.sibling;
    } while (child);
  }
  return stack;
};

export const fiber16SParents = (fiber: any): Array<FiberNode> => {
  const result = [];
  while (fiber = fiber.return) {
    console.log(fiber);
    result.push(cast(fiber));
  }
  return result;
};

export const getFiberFromNode = (node: HTMLElement): FiberNode | null => {
  for (const key of Object.keys(node)) {
    if (key.indexOf('__reactInternalInstance$') === 0) {
      return cast((node as any)[key]);
    }
  }
  return null;
}