import Calculator from "src/core/Calculator";

describe("运算", () => {
  const calc = new Calculator();

  test("最小表达式", () => {
    calc.clear();

    expect(calc.run("9")).toBe(9);
  });

  test("无括号运算", () => {
    calc.clear();

    expect(calc.run("3+2*4+5")).toBe(16);
  });

  test("带括号的运算", () => {
    calc.clear();

    expect(calc.run("3*(2+8/(5-1)*4/(2+2))")).toBe(12);

    calc.clear();

    expect(calc.run("9*(9/(3+6))")).toBe(9);
  });

  test("除数为 0 抛出错误", () => {
    calc.clear();

    expect(() => calc.run("9*3/0")).toThrowError();
  });

  test("只有单个运算符和数字的表达式", () => {
    calc.clear();

    expect(calc.run("+9")).toBe(9);

    calc.clear();

    expect(calc.run("9+")).toBe(9);

    calc.clear();

    expect(calc.run("9*")).toBe(0);

    calc.clear();

    expect(calc.run("*9")).toBe(0);

    calc.clear();

    expect(calc.run("+-9")).toBe(-9);
    expect(calc.run("-9")).toBe(-18);
    expect(calc.run("")).toBe(-18);
  });

  test("表达式结尾带空格", () => {
    calc.clear();

    expect(calc.run("3+4*5   ")).toBe(23);
  });

  test("表达式开头带空格", () => {
    calc.clear();

    expect(calc.run("   3+4*5")).toBe(23);
  });

  test("运算符间带空格", () => {
    calc.clear();

    expect(calc.run("3 + 4 *   5")).toBe(23);
  });

  test("超过个位的数计算", () => {
    calc.clear();

    expect(calc.run("13 + 4 *   5")).toBe(33);
  });

  test("小数计算", () => {
    calc.clear();

    expect(calc.run("1.3 + 4 *   5")).toBeGreaterThanOrEqual(21.3);
  });

  test("不正常的表达式", () => {
    calc.clear();

    expect(() => calc.run(" 3 2 + 33")).toThrowError();

    calc.clear();

    expect(() => calc.run(" 2 + 32.43 -  22 ) 32")).toThrowError();
  });
});
