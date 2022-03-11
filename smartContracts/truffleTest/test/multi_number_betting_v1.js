const MultiNumberBettingV1 = artifacts.require("MultiNumberBeetingV1");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MultiNumberBettingV1", function (/* accounts */) {
  it("should assert true", async function () {
    const multiBetting = await MultiNumberBettingV1.deployed();
    
    let guesses = await multiBetting.totalGuess.call();
    assert.equal(guesses.valueOf(), 0, "Total guess should be 0");

    await multiBetting.guess(4);

    guesses = await multiBetting.totalGuess.call();
    assert.equal(guesses.valueOf(), 1, "Total guess should be 1");
  });
});
