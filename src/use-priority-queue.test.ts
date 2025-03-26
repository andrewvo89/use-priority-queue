import { describe, expect, test } from 'vitest';

import { act, renderHook } from '@testing-library/react';

import { usePriorityQueue } from './use-priority-queue';

type WeatherCondition = 'windy 🍃' | 'thunderstorm ⛈️' | 'tornado 🌪️' | 'hurricane 🌀' | 'tsunami 🌊';

describe('usePriorityQueue<WeatherCondition>', () => {
  test('should initialize with an empty queue', () => {
    const { result } = renderHook(() => usePriorityQueue<WeatherCondition>());
    expect(result.current.next).toBe(undefined);
  });

  test('should enqueue items correctly', () => {
    const { result } = renderHook(() => usePriorityQueue<WeatherCondition>());
    act(() => {
      result.current.enqueue('tsunami 🌊', 1);
      result.current.enqueue('hurricane 🌀', 2);
    });
    expect(result.current.next).toBe('tsunami 🌊');
  });

  test('should dequeue items correctly', () => {
    const { result } = renderHook(() => usePriorityQueue<WeatherCondition>());
    act(() => {
      result.current.enqueue('tsunami 🌊', 2);
      result.current.enqueue('hurricane 🌀', 1);
    });
    expect(result.current.dequeue()).toBe('hurricane 🌀');
  });

  test('should handle empty queue on dequeue', () => {
    const { result } = renderHook(() => usePriorityQueue<WeatherCondition>());
    expect(result.current.dequeue()).toBe(undefined);
  });

  test('should peek at the next item without removing it', () => {
    const { result } = renderHook(() => usePriorityQueue<WeatherCondition>());
    act(() => {
      result.current.enqueue('tsunami 🌊', 2);
      result.current.enqueue('hurricane 🌀', 1);
    });
    expect(result.current.next).toBe('hurricane 🌀');
    expect(result.current.dequeue()).toBe('hurricane 🌀');
  });

  test('should update next item correctly after dequeue', () => {
    const { result } = renderHook(() => usePriorityQueue<WeatherCondition>());
    act(() => {
      result.current.enqueue('tsunami 🌊', 2);
      result.current.enqueue('hurricane 🌀', 1);
      result.current.enqueue('tornado 🌪️', 3);
    });
    expect(result.current.next).toBe('hurricane 🌀');
    act(() => {
      result.current.dequeue();
    });
    expect(result.current.next).toBe('tsunami 🌊');
  });

  test('should maintain correct size of the queue', () => {
    const { result } = renderHook(() => usePriorityQueue<WeatherCondition>());
    act(() => {
      result.current.enqueue('tsunami 🌊', 2);
      result.current.enqueue('hurricane 🌀', 1);
    });
    expect(result.current.size).toBe(2);
    act(() => {
      result.current.dequeue();
    });
    expect(result.current.size).toBe(1);
  });
});
