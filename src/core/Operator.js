// 系统默认的操作符优先级的映射
const OPERATOR_PRIORITY_MAP = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "(": 1000,
  ")": -1000
};

export default class Operator {
  /**
   * @param {string} operator
   * @param {number?} priority
   */
  constructor(operator, priority = 0) {
    this.operator = operator;
    this.priority = priority;
  }

  /**
   * 优先使用系统默认的
   * @return {number}
   */
  getPriority() {
    return OPERATOR_PRIORITY_MAP[this.operator] || this.priority;
  }
}
