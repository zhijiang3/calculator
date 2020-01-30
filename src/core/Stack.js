import LinkedList from "src/core/LinkedList";

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  /**
   * 出栈
   * @return {*}
   */
  pop() {
    const deleteHead = this.linkedList.deleteHead();

    return deleteHead ? deleteHead.val : null;
  }

  /**
   * 入栈
   * @param {*} x
   */
  push(x) {
    this.linkedList.prepend(x);
  }

  /**
   * 查看栈顶元素
   * @return {*}
   */
  peek() {
    return this.linkedList.head ? this.linkedList.head.val : null;
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.linkedList.head;
  }

  /**
   * 清空栈的数据
   */
  clear() {
    this.linkedList.clear();
  }
}
