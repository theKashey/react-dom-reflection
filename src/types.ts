import {ReactInstance, ReactNode} from 'React';

export type FiberTag = 'portal' | 'component' | 'node' | 'text' | 'unknown' | 'root' | 'suspense';

export interface FiberNode {
  stateNode: HTMLElement | ReactInstance,
  type: ReactNode,
  tag: FiberTag,
  elementType: ReactNode,
  props: Record<string, any>,

  children: Array<FiberNode>,
};
