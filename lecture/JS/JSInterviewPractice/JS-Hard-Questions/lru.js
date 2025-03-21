class LRUCache {
    constructor(capacity) {
        this.capacity = Number(capacity);
        this.length = 0;
        this.head = null;
        this.tail = null; // LRU Node
        this.map = new Map(); // <Key> : <Node Address>
    }

    #removeNode(node) {
        if (!node) return;

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }
        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }
    }

    get(key) {
        if (!this.map.has(key)) return null;
        const node = this.map.has(key);

        this.#removeNode(node);
        node.prev = null;
        node.next = this.head;

        if (this.head !== null) {
            this.head.prev = node;
        }

        this.head = node;

        return node.value;
    }

    put(key, value) {
        // If key is already there
        // Remove the exisitng node
        // Create the new node
        // Add it to the head

        // Check if we have capacity
        if (this.length === this.capacity) {
            if (!this.map.get(key)) {
                this.#removeNode(this.tail);
                this.length -= 1;
            }
        }

        // Case: If the key is already in the cache store

        if (this.map.get(key)) {
            //1. Remove the older node
            this.#removeNode(this.map.get(key));
        }

        const node = {
            next: this.head,
            prev: null,
            key,
            value,
        };

        this.map.set(key, node);

        if (this.head !== null) {
            this.head.prev = node;
        }

        this.head = node;

        if (this.tail === null) {
            this.tail = node;
        }

        this.length += 1;
    }

    debug() {
        let current = this.head;
        const arr = [];

        while (current !== null) {
            arr.push(current);
            current = current.next;
        }

        return arr.reduce(
            (acc = "", current) =>
                acc.concat(`-->[ [${current.key}]: [${current.value}] ]-->`),
            ""
        );
    }
}

const cache = new LRUCache(3);
cache.put(1, 10);
cache.put(2, 20);
console.log(cache.get(1));
cache.put(3, 30);

console.log(cache.debug());
