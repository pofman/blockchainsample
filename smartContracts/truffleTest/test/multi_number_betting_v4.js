const MultiNumberBettingV4 = artifacts.require("MultiNumberBettingV4");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MultiNumberBettingV4", function (accounts) {
  it("should assert true", async function () {
    const acc1 = accounts[0];
    const acc2 = accounts[1];
  
    const multiBetting = await MultiNumberBettingV4.deployed();
    
    let guesses = await multiBetting.totalGuess.call();
    assert.equal(guesses.valueOf(), 0, "Total guess should be 0");

    await multiBetting.guess(5, "Roberto", {from: acc1});

    guesses = await multiBetting.totalGuess.call();
    assert.equal(guesses.valueOf(), 1, "Total guess should be 1");

    guesses = await multiBetting.getLastWinnerInfo.call();
    console.log(guesses)
    assert.equal(guesses[0].valueOf(), acc1, "Last winner different from Rob address");
    assert.equal(guesses[1].valueOf(), "Roberto", "Last winner different from Rob");
    assert.equal(guesses[2].valueOf(), 5, "Last winner different from Rob guess num");

    guesses = await multiBetting.checkWinner.call(acc2, {from: acc2});
    console.log(guesses);

    guesses = await multiBetting.checkWinner.call(acc1, {from: acc1});
    console.log(guesses);
    assert.equal(guesses[0].valueOf(), acc1, "address not matching");
  });
});
