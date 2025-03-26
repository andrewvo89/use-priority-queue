import { describe, expect, test } from 'vitest';
import { PriorityQueue } from './priority-queue';

type WeatherCondition = 'windy 🍃' | 'thunderstorm ⛈️' | 'tornado 🌪️' | 'hurricane 🌀' | 'tsunami 🌊';

describe('Priority queue', () => {
  test('returns undefined when the heap is empty', () => {
    const queue = new PriorityQueue<WeatherCondition>();
    expect(queue.dequeue()).toBe(undefined);
  });

  test('next is nothing when the heap is empty', () => {
    const queue = new PriorityQueue<WeatherCondition>();
    expect(queue.next).toBe(undefined);
  });

  test('size is 0 when the heap is empty', () => {
    const queue = new PriorityQueue<WeatherCondition>();
    expect(queue.size).toBe(0);
  });

  test('size is 1 when the heap has one item', () => {
    const queue = new PriorityQueue<WeatherCondition>();
    queue.enqueue('tsunami 🌊', 1);
    expect(queue.size).toBe(1);
  });

  test('enqueues a value into an empty heap', () => {
    const queue = new PriorityQueue<WeatherCondition>();
    queue.enqueue('tsunami 🌊', 1);
    expect(queue.next).toEqual('tsunami 🌊');
  });

  test('size is correct after enqueueing and dequeuing', () => {
    const queue = new PriorityQueue<WeatherCondition>();
    queue.enqueue('tsunami 🌊', 1);
    queue.enqueue('windy 🍃', 5);
    queue.enqueue('hurricane 🌀', 4);
    queue.enqueue('hurricane 🌀', 2);
    queue.enqueue('tornado 🌪️', 3);
    expect(queue.size).toBe(5);
    queue.dequeue();
    expect(queue.size).toBe(4);
  });

  test('dequeues the all items with top priority', () => {
    const queue = new PriorityQueue<WeatherCondition>();
    queue.enqueue('hurricane 🌀', 4);
    queue.enqueue('hurricane 🌀', 2);
    queue.enqueue('tsunami 🌊', 1);
    queue.enqueue('windy 🍃', 5);
    queue.enqueue('tornado 🌪️', 3);
    expect(queue.dequeue()).toBe('tsunami 🌊');
    expect(queue.dequeue()).toBe('hurricane 🌀');
    expect(queue.dequeue()).toBe('tornado 🌪️');
    expect(queue.dequeue()).toBe('hurricane 🌀');
    expect(queue.dequeue()).toBe('windy 🍃');
  });

  test('bubbles up the value to the correct position', () => {
    const queue = new PriorityQueue<WeatherCondition>();
    queue.enqueue('windy 🍃', 5);
    queue.enqueue('hurricane 🌀', 4);
    queue.enqueue('hurricane 🌀', 2);
    queue.enqueue('tsunami 🌊', 1);
    queue.enqueue('tornado 🌪️', 3);
    expect(queue.next).toEqual('tsunami 🌊');
  });
});
