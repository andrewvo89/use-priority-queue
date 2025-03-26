<div align="center">

[![Status](https://img.shields.io/badge/status-active-blue)](https://github.com/andrewvo89/use-priority-queue)
[![GitHub Issues](https://img.shields.io/github/issues/andrewvo89/use-priority-queue?color=blue)](https://github.com/andrewvo89/use-priority-queue/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/andrewvo89/use-priority-queue?color=blue)](https://github.com/andrewvo89/use-priority-queue/pulls)
[![License](https://img.shields.io/github/license/andrewvo89/use-priority-queue?color=blue)](/LICENSE)

</div>

# Use Priority Queue

## Table of contents

- [About](#about)
- [Complexity](#complexity)
- [Installation](#installation)
- [Basic usage](#basic-usage)
- [Comparators](#comparators)
- [PriorityQueue class](#priorityqueue-class)
- [License](#license)

## About

Use Priority Queue is a React hook that provides a simple and efficient way to manage a priority queue in your React applications. It uses a binary heap under the hood with values stored inside a JavaScript array.

## Complexity

| Operation   | Space Complexity | Time Complexity |
| ----------- | ---------------- | --------------- |
| Enqueue     | O(log n)         | O(n)            |
| Deqeue      | O(log n)         | O(n)            |
| Next (Peek) | O(1)             | O(1)            |
| Size        | O(1)             | O(1)            |

## Installation

Install the package as a dependency on your own project by running:

```bash
npm install use-priority-queue
```

```bash
yarn add use-priority-queue
```

```bash
pnpm add use-priority-queue
```

## Basic usage

```tsx
import { usePriorityQueue } from 'use-priority-queue';

type WeatherCondition = 'windy' | 'thunderstorm' | 'tornado' | 'hurricane' | 'tsunami';

type Priority = number;

const weatherConditions: [WeatherCondition, Priority][] = [
  ['tsunami', 1],
  ['thunderstorm', 4],
  ['hurricane', 2],
  ['windy', 5],
  ['tornado', 3],
];

export function WeatherQueue() {
  const { next, enqueue, dequeue } = usePriorityQueue<WeatherCondition>();

  const onAddWeatherCondition = () => {
    const nextWeather = weatherConditions.pop();
    if (!nextWeather) {
      return;
    }
    const [condition, priority] = nextWeather;
    enqueue(condition, priority);
  };

  const onRemoveWeatherCondition = () => {
    const removedWeather = dequeue();
    if (!removedWeather) {
      return;
    }
    console.log(`Removed weather condition: ${removedWeather}`);
  };

  return (
    <div>
      <h1>Weather queue</h1>
      <button onClick={onAddWeatherCondition}>Add weather condition</button>
      <div>Next most severe: {next}</div>
      <button onClick={onRemoveWeatherCondition}>Remove most severe</button>
    </div>
  );
}
```

## Comparators

By default `usePriorityQueue()` uses a min binary heap (lower priority numbers are prioritized first) to determine the priority of its nodes. The `usePriorityQueue()` hook can accept a custom comparator of the following signature:

```ts
type Comparator<T> = (a: Node<T>, b: Node<T>) => number;
```

| Comparator(a, b) return value | Sort order                                     |
| ----------------------------- | ---------------------------------------------- |
| > 0                           | `b` as higher priority than `a`, e.g. `[b, a]` |
| < 0                           | `a` as higher priority than `b`, e.g. `[a, b]` |
| === 0                         | `a` and `b` are equal priority                 |

By default, the comparator is set to `minHeapComparator()`.

```ts
import { minHeapComparator, usePriorityQueue } from 'use-priority-queue';

// minHeapComparator by default
const { next, enqueue, dequeue } = usePriorityQueue();

// minHeapComparator explicitely
const { next, enqueue, dequeue } = usePriorityQueue(minHeapComparator);
```

`maxHeapComparator()` is a utility provided for max binary heaps (higher priority numbers are prioritized first):

```ts
import { maxHeapComparator, usePriorityQueue } from 'use-priority-queue';
// maxHeapComparator
const { next, enqueue, dequeue } = usePriorityQueue(maxHeapComparator);
```

You are welcome to supply your own custom comparator to the `usePriorityQueue()` hook. A custom comparator can completely ignore `a.priority` and `b.priority` and use `a.value` and `b.value` instead. For example, if you want to sort blog posts by timestamp, you can do the following:

```ts
import { usePriorityQueue } from 'use-priority-queue';

type BlogPost = {
  title: string;
  timestamp: Date;
};

const { next, enqueue, dequeue } = usePriorityQueue<BlogPost>((a, b) => {
  if (a.value.timestamp > b.value.timestamp) {
    return 1;
  }
  if (a.value.timestamp < b.value.timestamp) {
    return -1;
  }
  return 0;
});
```

## PriorityQueue class

The `usePriorityQueue()` hook is a wrapper around the `PriorityQueue` class. You can use the `PriorityQueue` class directly if you want to manage the queue outside of a React component. The `PriorityQueue` class has the same API as the `usePriorityQueue()` hook, but it does not have the React-specific features like reactivity everytime a node is added or removed.

```ts
import { PriorityQueue } from 'use-priority-queue';

type WeatherCondition = 'windy' | 'thunderstorm' | 'tornado' | 'hurricane' | 'tsunami';

const queue = new PriorityQueue<WeatherCondition>();
queue.enqueue('windy', 5);
queue.enqueue('thunderstorm', 4);
queue.enqueue('tornado', 3);
queue.enqueue('hurricane', 2);
queue.enqueue('tsunami', 1);
const nextWeather = queue.next;
console.log(`Next weather condition: ${nextWeather}`);
// Next weather condition: tsunami
const removedWeather = queue.dequeue();
console.log(`Removed weather condition: ${removedWeather}`);
// Removed weather condition: tsunami
const queueSize = queue.size;
console.log(`Queue size: ${queueSize}`);
// Queue size: 4
```

## License

Use Priority Queue is distributed under MIT license, Copyright (c) 2025 Andrew Vo-Nguyen. See [LICENSE](LICENSE) for more information.
