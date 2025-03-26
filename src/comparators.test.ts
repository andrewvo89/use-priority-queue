import { describe, expect, test } from 'vitest';

import { maxHeapComparator, minHeapComparator } from './comparators';
import { Node } from './node';

describe('Comparators', () => {
  const nodeA = new Node(1, 1);
  const nodeB = new Node(2, 2);
  test('Min heap comparator', () => {
    expect(minHeapComparator(nodeA, nodeB)).toBe(-1);
    expect(minHeapComparator(nodeB, nodeA)).toBe(1);
    expect(minHeapComparator(nodeA, nodeA)).toBe(0);
  });

  test('Max heap comparator', () => {
    expect(maxHeapComparator(nodeA, nodeB)).toBe(1);
    expect(maxHeapComparator(nodeB, nodeA)).toBe(-1);
    expect(maxHeapComparator(nodeA, nodeA)).toBe(0);
  });
});
