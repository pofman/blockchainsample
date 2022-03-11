const Calculator = artifacts.require("Calculator");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Calculator", function (accounts) {
  it("should assert true", async function () {
    let calculator;
    calculator = await Calculator.deployed();

    let result = await calculator.getResult.call();
    assert.equal(result.valueOf(), 10, "Contract initialized with value NOT equal to 10");

    await calculator.addToNumber(10);
    await calculator.subtractFromNumber(5);
    result = await calculator.getResult.call();
    assert.equal(result.valueOf(), 15, "Contract initialized with value NOT equal to 15");

    await calculator.multiplyWithNumber(10);
    await calculator.divideByNumber(5);
    result = await calculator.getResult.call();
    assert.equal(result.valueOf(), 30, "Contract initialized with value NOT equal to 30");

    await calculator.double();
    await calculator.half();
    result = await calculator.getResult.call();
    assert.equal(result.valueOf(), 30, "Contract initialized with value NOT equal to 30");
  });
});
