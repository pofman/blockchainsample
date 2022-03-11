const MultiNumberBettingV2 = artifacts.require("MultiNumberBettingV2");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MultiNumberBettingV2", function (/* accounts */) {
  it("should assert true", async function () {
    const multiBetting = await MultiNumberBettingV2.deployed();
    
    let guesses = await multiBetting.totalGuess.call();
    assert.equal(guesses.valueOf(), 0, "Total guess should be 0");

    await multiBetting.guess(5, "Roberto");

    guesses = await multiBetting.totalGuess.call();
    assert.equal(guesses.valueOf(), 1, "Total guess should be 1");

    guesses = await multiBetting.getLastWinner.call();
    assert.equal(guesses.valueOf(), "Rob", "Last winner different from Rob");
  });
});
