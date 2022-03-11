const MultiNumberBettingV3 = artifacts.require("MultiNumberBettingV3");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MultiNumberBettingV3", function (accounts) {
  it("should assert true", async function () {
    const acc1 = accounts[0];
    const acc2 = accounts[1];
  
    const multiBetting = await MultiNumberBettingV3.deployed();
    
    let guesses = await multiBetting.totalGuess.call();
    assert.equal(guesses.valueOf(), 0, "Total guess should be 0");

    await multiBetting.guess(5, "Roberto");

    guesses = await multiBetting.totalGuess.call();
    assert.equal(guesses.valueOf(), 1, "Total guess should be 1");
    guesses = await multiBetting.getLastWinner.call();
    assert.equal(guesses.valueOf(), "Rob", "Last winner different from Rob");

    guesses = await multiBetting.lastWinnerAt.call();
    guesses = await multiBetting.minutesSinceLastWinning.call();

    assert.isTrue(guesses.valueOf() < 1, "Too much time passed");
  });
});
