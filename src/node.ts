export class Node<T> {
  priority: number;
  value: T;

  constructor(value: T, priority: number) {
    this.value = value;
    this.priority = priority;
  }
}
