import { useCallback, useMemo, useRef, useState } from 'react';

import { Comparator, minHeapComparator } from './comparators';
import { PriorityQueue } from './priority-queue';

export function usePriorityQueue<T>(comparator: Comparator<T> = minHeapComparator) {
  const queue = useRef<PriorityQueue<T>>(new PriorityQueue(comparator));
  const [next, setNext] = useState<T | undefined>(queue.current.next);
  const [size, setSize] = useState(queue.current.size);

  const enqueue = useCallback((value: T, priority: number) => {
    queue.current.enqueue(value, priority);
    setNext(queue.current.next);
    setSize(queue.current.size);
  }, []);

  const dequeue = useCallback(() => {
    const dequeued = queue.current.dequeue();
    setNext(queue.current.next);
    setSize(queue.current.size);
    return dequeued;
  }, []);

  return useMemo(() => ({ enqueue, dequeue, next, size }), [enqueue, dequeue, next, size]);
}
