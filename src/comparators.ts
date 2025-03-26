import type { Node } from './node';

export type Comparator<T> = (a: Node<T>, b: Node<T>) => number;

export function minHeapComparator<T>(a: Node<T>, b: Node<T>): number {
  return a.priority - b.priority;
}

export function maxHeapComparator<T>(a: Node<T>, b: Node<T>): number {
  return b.priority - a.priority;
}
