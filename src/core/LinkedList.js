import LinkedListNode from "src/core/LinkedListNode";

export default class LinkedList {
  constructor() {
    /** @type {LinkedListNode} */
    this.head = null;

    /** @type {LinkedListNode} */
    this.tail = null;
  }

  /**
   * 往头节点插入内容
   * @param {*} x
   */
  prepend(x) {
    const node = new LinkedListNode(x);

    if (this.head) {
      node.next = this.head;
      this.head = node;
    } else {
      this.head = node;
      this.tail = node;
    }
  }

  /**
   * 删除头节点
   * @return {LinkedListNode}
   */
  deleteHead() {
    if (!this.head) return null;

    const headNode = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return headNode;
  }

  /**
   * 清空链表的数据
   */
  clear() {
    let head = this.head;
    while (head) {
      const next = head.next;

      head.next = null;

      head = next;
    }

    this.head = null;
    this.tail = null;
  }
}
