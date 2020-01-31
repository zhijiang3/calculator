import { hasOwn } from "src/utils/utils";

const KEYBOARD_CALCULATOR_KEY_MAP = {
  "(": "LeftParentheses",
  ")": "RightParentheses",
  "/": "Div",
  "*": "Mul",
  "-": "Sub",
  "+": "Add",
  "=": "Equal",
  Enter: "Equal",
  Backspace: "Backspace",
  ".": "Dot",
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9"
};
const CALCULATOR_KEY_MAP = {
  LeftParentheses: "(",
  RightParentheses: ")",
  Div: "/",
  Mul: "*",
  Sub: "-",
  Add: "+",
  Equal: "=",
  Dot: "."
};

/**
 * @param {string} key
 * @return {boolean}
 */
export function isValidCalculatorKey(key = "") {
  return hasOwn(KEYBOARD_CALCULATOR_KEY_MAP, key);
}

/**
 * @param {string} key
 * @return {string}
 */
export function parseCalculatorKey(key = "") {
  return KEYBOARD_CALCULATOR_KEY_MAP[key] || key;
}

/**
 * @param {string[]} expression
 * @return {string}
 */
export function parseCalculatorExpression(expression = []) {
  let result = "";

  for (let word of expression) {
    result += CALCULATOR_KEY_MAP[word] || word;
  }

  return result;
}

/**
 * @param {string} key
 * @return {boolean}
 */
export function isCalculatorAdd(key = "") {
  return key === "Add";
}

/**
 * @param {string} key
 * @return {boolean}
 */
export function isCalculatorSub(key = "") {
  return key === "Sub";
}

/**
 * @param {string} key
 * @return {boolean}
 */
export function isCalculatorDiv(key = "") {
  return key === "Div";
}

/**
 * @param {string} key
 * @return {boolean}
 */
export function isCalculatorMul(key = "") {
  return key === "Mul";
}

/**
 * @param {string} key
 * @return {boolean}
 */
export function isCalculatorOperator(key = "") {
  return isCalculatorAdd(key) || isCalculatorSub(key) || isCalculatorDiv(key) || isCalculatorMul(key);
}

/**
 * @param {string} key
 * @return {boolean}
 */
export function isCalculatorLeftParentheses(key = "") {
  return key === "LeftParentheses";
}

/**
 * @param {string} key
 * @return {boolean}
 */
export function isCalculatorRightParentheses(key = "") {
  return key === "RightParentheses";
}

/**
 * @param {string} key
 * @return {boolean}
 */
export function isCalculatorDot(key = "") {
  return key === "Dot";
}

/**
 * @param {string} key
 * @return {boolean}
 */
export function isCalculatorClear(key = "") {
  return key === "Clear";
}

/**
 * @param {string} key
 * @return {boolean}
 */
export function isCalculatorEqual(key = "") {
  return key === "Equal";
}

/**
 * @param {string} key
 * @return {boolean}
 */
export function isCalculatorBackspace(key = "") {
  return key === "Backspace";
}

/**
 * @param {string} key
 * @return {boolean}
 */
export function isCalculatorParentheses(key = "") {
  return this.isCalculatorLeftParentheses(key) || this.isCalculatorRightParentheses(key);
}
