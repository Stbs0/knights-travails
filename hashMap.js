class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
class LinkedList {
  constructor(HEAD = null) {
    this.HEAD = HEAD;
  }
  append(value) {
    let node = this.HEAD;
    if (!node) {
      this.HEAD = new Node(value);
    } else {
      while (node.nextNode) {
        node = node.nextNode;
      }
      node.nextNode = new Node(value);
    }
  }
  prepend(value) {
    const node = this.HEAD;
    this.HEAD = new Node(value, node);
  }
  size() {
    let count = 0;
    let node = this.HEAD;
    while (node) {
      count++;
      node = node.nextNode;
    }
    return count;
  }
  head() {
    return this.HEAD;
  }
  tail() {
    let node = this.HEAD;
    while (node.nextNode) {
      node = node.nextNode;
    }
    return node;
  }

  at(index) {
    let node = this.HEAD;
    let count = 0;
    while (count < index && node) {
      node = node.nextNode;
      count++;
    }
    return node;
  }
  pop() {
    let node = this.HEAD;
    while (node.nextNode.nextNode) {
      node = node.nextNode;
    }
    node.nextNode = null;
  }
  contains(value) {
    let node = this.HEAD;
    while (node) {
      if (node.value === value) {
        return true;
      }
      node = node.nextNode;
    }
    return false;
  }
  find(value) {
    let node = this.HEAD;
    let index = 0;
    while (node) {
      node = node.nextNode;
      if (node.value === value) {
        return index;
      }
      index++;
    }
  }
  toString() {
    let node = this.HEAD;
    while (node) {
      process.stdout.write(`${node.value} -> `);
      node = node.nextNode;
    }
    console.log(node);
  }
  insertAt(value, index) {
    let node = this.at(index - 1);
    node.nextNode = new Node(value, node.nextNode);
  }
  removeAt(index) {
    let node = this.at(index - 1);
    node.nextNode = node.nextNode.nextNode;
  }
}
export default class HashMap {
  constructor(capacity = 64, loadFactor = 0.75) {
    this.buckets = new Array(capacity);
    this.capacity = capacity;
    this.loadFactor = loadFactor;
  }
  hash(key, capacity = this.capacity) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }
  set(key, value) {
    const index = this.hash(key);
    console.log(index);
    if (this.loadFactor <= this.keys().length / this.buckets.length) {
      console.log(this.keys().length / this.buckets.length);

      this.buckets = this.buckets.concat(new Array(this.capacity));

      this.capacity = this.buckets.length;
    }
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    } else if (this.buckets[index] === undefined) {
      this.buckets[index] = new LinkedList(new Node(value));
    } else {
      this.buckets[index].append(value);
    }
  }
  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    if (this.buckets[index] === undefined) {
      return null;
    }
    if (this.buckets[index]) {
      return this.buckets[index].HEAD.value;
    } else {
      return null;
    }
  }
  has(key) {
    const index = this.hash(key);
    return this.buckets[index] ? true : false;
  }
  remove(key) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      this.buckets[index] = undefined;
      return true;
    } else {
      return false;
    }
  }
  length() {
    return this.buckets.reduce((count, bucket) => count + (bucket ? 1 : 0), 0);
  }
  clear() {
    this.buckets.fill(undefined);
  }
  keys() {
    return this.buckets.filter((bucket) => bucket);
  }
  values() {
    return this.buckets
      .filter((bucket) => bucket)
      .map((bucket) => bucket.HEAD.value);
  }
  entries() {
    const entries = [];
    this.buckets.forEach(({ HEAD }, index) => {
      if (HEAD) {
        entries.push([index, HEAD.value]);
        while (HEAD.nextNode) {
          HEAD = HEAD.nextNode;
          entries.push([index, HEAD.value]);
        }
      }
    });
    return entries;
  }
}
