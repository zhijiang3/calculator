import Stack from "src/core/Stack";
import Operator from "src/core/Operator";

export default class Calculator {
  constructor() {
    this.operands = new Stack();
    this.operators = new Stack();

    // 遇到括号时增加的系数
    this.effect = 0;
  }

  /**
   * 获取栈顶的两个元素
   * @return {{ a: number, b: number }}
   */
  getTwoOperands() {
    const a = this.operands.pop();
    const b = this.operands.pop();

    return {
      a: a == null ? 0 : a,
      b: b == null ? 0 : b
    };
  }

  /**
   * 计算栈顶的两个值并出栈
   * @return {number}
   */
  compute() {
    const { a, b } = this.getTwoOperands();

    /** @type {Operator} */
    const operatorInstance = this.operators.pop();

    switch (operatorInstance.operator) {
      case "+":
        return b + a;
      case "-":
        return b - a;
      case "*":
        return b * a;
      case "/":
        if (a === 0) throw new Error("除数不能为 0");

        return b / a;
      default:
        throw new Error(`未知运算符：${operatorInstance.operator}`);
    }
  }

  /**
   * 清理计算器
   */
  clear() {
    this.operands.clear();
    this.operators.clear();
    this.effect = 0;
  }

  /**
   * 计算低于传入的优先级的操作符
   * @param {number} priority
   */
  calcByPriority(priority = 0) {
    /** @type {Operator} */
    let operatorInstance = this.operators.peek();
    while (operatorInstance && priority <= operatorInstance.priority) {
      const result = this.compute();
      this.operands.push(result);
      operatorInstance = this.operators.peek();
    }
  }

  /**
   * 执行表达式
   * @param {string} expression
   * @return {number}
   */
  run(expression = "") {
    // 使用 current 指针记录当前遍历的位置
    let current = 0;

    // 利用 white 循环而不是 for 循环，因为可能要在内部进行循环
    while (current < expression.length) {
      let word = expression[current];

      // 遇到括号调整运算符的优先级
      if (word === "(" || word === ")") {
        this.effect += new Operator(word).getPriority();

        if (this.effect < 0) {
          throw new Error("括号不匹配");
        }

        current++;

        continue;
      }

      // 检查空白符
      const WHITESPACE = /\s/;
      if (WHITESPACE.test(word)) {
        current++;

        continue;
      }

      // 检查操作符
      const OPERATOR = /(\+|-|\*|\/)/;
      if (OPERATOR.test(word)) {
        // 把之前优先级高的操作符进行计算
        const priority = new Operator(word).getPriority() + this.effect;
        this.calcByPriority(priority);

        // 操作符进栈
        this.operators.push(new Operator(word, priority));

        current++;

        continue;
      }

      // 如果是数字
      const NUMBERS = /[0-9\.]/;
      if (NUMBERS.test(word)) {
        let value = "";

        while (NUMBERS.test(word)) {
          value += word;
          word = expression[++current];
        }

        // 如果数字接着的是空白符，检查下个操作是否合法
        if (WHITESPACE.test(word)) {
          while (WHITESPACE.test(word)) {
            word = expression[++current];
          }
          // 一段空白之后，跟着的只能是 操作符 或 括号 或者 表达式结束
          if (word !== "(" && word !== ")" && !OPERATOR.test(word) && current < expression.length) {
            throw new Error("无效的数字");
          }
        }

        if (Number.isNaN(Number(value))) {
          throw new Error("无效的数字");
        }

        this.operands.push(Number(value));

        continue;
      }

      throw new Error(`未知的字符：${word}`);
    }

    // 计算完成后，系数如果不是 0，那么说明括号对不上
    if (this.effect !== 0) {
      throw new Error("括号不匹配");
    }

    // 计算剩余的操作
    this.calcByPriority(-1);

    // 返回最终计算的结果
    return this.operands.peek();
  }
}
