export class TreeMap<K, V> {
  private map: Array<K> = [];
  private storage = new Map<K, V>();

  remove(key: K): boolean {
    this.remap(key, 1);
    return this.storage.delete(key);
  }

  get(key: K): V | undefined {
    return this.storage.get(key);
  }

  store(key: K, value: V) {
    this.storage.set(key, value);
  }

  set(key: K, value: V, at?: K) {
    at ? this.remap(at, 0, [key]) : this.map.push(key);
    this.store(key, value);
  }

  remap(at: K, remove: number, add: Array<K> = []) {
    const atIndex = this.map.indexOf(at);

    this.map.splice(atIndex + 1, remove, ...add);
  }

  clear() {
    this.storage.clear();
  }

  get size() {
    return this.map.length || 0;
  }

  range(start: number, end: number) {
    return this.map.slice(start, end).map((key) => this.get(key));
  }
}
