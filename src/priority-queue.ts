import { minHeapComparator, type Comparator } from './comparators';

export class Node<T> {
  priority: number;
  value: T;

  constructor(value: T, priority: number) {
    this.value = value;
    this.priority = priority;
  }
}

export class PriorityQueue<T> {
  private comparator: Comparator<T>;
  private values: Node<T>[];
  next: T | null;
  size: number;

  constructor(comparator: Comparator<T> = minHeapComparator) {
    this.values = [];
    this.next = null;
    this.size = 0;
    this.comparator = comparator;
  }

  private swap(indexA: number, indexB: number) {
    [this.values[indexA], this.values[indexB]] = [this.values[indexB], this.values[indexA]];
  }

  private getParent(childIndex: number): [number, Node<T>] | null {
    const parentIndex = Math.floor((childIndex - 1) / 2);
    if (parentIndex < 0) {
      return null;
    }
    const parentNode = this.values[parentIndex];
    return [parentIndex, parentNode];
  }

  private getSmallestChild(parentIndex: number): [number, Node<T>] | null {
    const leftIndex = 2 * parentIndex + 1;
    const rightIndex = leftIndex + 1;

    const leftNode = this.values.at(leftIndex);

    // Index out of bounds error
    if (leftNode === undefined) {
      return null;
    }

    // Return the largest of the 2 children
    const rightNode = this.values.at(rightIndex);

    if (rightNode === undefined || this.comparator(leftNode, rightNode) < 0) {
      return [leftIndex, leftNode];
    }

    return [rightIndex, rightNode];
  }

  private bubbleUp(childIndex: number) {
    const childNode = this.values[childIndex];

    let parent = this.getParent(childIndex);
    // No parent means we are at the root
    if (!parent) {
      return;
    }
    const [, parentNode] = parent;

    let shouldSwap = this.comparator(childNode, parentNode) < 0;

    while (parent !== null && shouldSwap) {
      const [parentIndex] = parent;
      this.swap(childIndex, parentIndex);

      // Move up the tree
      childIndex = parentIndex;
      parent = this.getParent(childIndex);

      // No parent means we are at the root
      if (!parent) {
        break;
      }

      const [, parentNode] = parent;
      shouldSwap = this.comparator(childNode, parentNode) < 0;
    }
  }

  private bubbleDown(parentIndex: number) {
    const parentNode = this.values.at(parentIndex);
    if (!parentNode) {
      return;
    }

    let child = this.getSmallestChild(parentIndex);
    // No children means we are at a leaf
    if (!child) {
      return;
    }

    const [, childNode] = child;
    let shouldSwap = this.comparator(childNode, parentNode) < 0;

    while (child !== null && shouldSwap) {
      const [childIndex] = child;
      this.swap(parentIndex, childIndex);

      // Move down the tree
      parentIndex = childIndex;
      child = this.getSmallestChild(parentIndex);

      // No children means we are at a leaf
      if (!child) {
        break;
      }

      const [, childNode] = child;
      shouldSwap = this.comparator(childNode, parentNode) < 0;
    }
  }

  enqueue(value: T, priority: number): void {
    const node = new Node(value, priority);
    this.values.push(node);
    this.bubbleUp(this.values.length - 1);
    this.next = this.values[0].value;
    this.size = this.values.length;
  }

  dequeue(): T | null {
    if (this.values.length === 0) {
      return null;
    }

    // Swap next priority value (root) with last element
    this.swap(0, this.values.length - 1);

    // Take next priority value from end of array
    const last = this.values.pop()!;

    // Perform bubble down on new first element (which was the last element)
    this.bubbleDown(0);

    this.next = this.values.at(0)?.value ?? null;
    this.size = this.values.length;

    return last.value;
  }
}
