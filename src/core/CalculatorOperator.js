export default class CalculatorOperator {
  /**
   * @param {string} operator
   * @param {number} priority
   */
  constructor(operator, priority) {
    this.operator = operator;
    this.priority = priority;
  }
}
