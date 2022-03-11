const WithdrawalContract = artifacts.require("WithdrawalContract");

contract('WithdrawalContract', function (accounts) {
	const owner = accounts[0];
	const payer_1 = accounts[1];
	const payer_2 = accounts[2];

	it("should assert true", function () {
		let withdrawalContract;

		return WithdrawalContract.deployed().then(function (instance) {
			withdrawalContract = instance;

			return Promise.all([
				withdrawalContract.pay({ from: payer_1, value: web3.utils.toWei("1", 'Ether') }),
				withdrawalContract.pay({ from: payer_2, value: web3.utils.toWei("1", 'Ether') })
			]).then(() => withdrawalContract.getBalance.call());
		}).then(function (result) {
			// Expecte to be 2 ETH
			var balance = web3.utils.fromWei(result, "Ether");
			console.log('Balance#1 =', balance, " Ethers")

			// Payer 1 withdraws
			return withdrawalContract.withdraw({ from: payer_1 })
				.then(() => withdrawalContract.getBalance.call());
		}).then(function (result) {
			// Expecte to be 1 ETH
			var balance = web3.utils.fromWei(result, "Ether");
			console.log('Balance#2=', balance, " Ethers")

			// Payer 2 withdraws
			return withdrawalContract.withdraw({ from: payer_2 })
				.then(() => withdrawalContract.getBalance.call());
		}).then(function (result) {
			// Expect 0 Ether
			var balance = web3.utils.fromWei(result, "Ether");
			console.log('Balance#3=', balance, " Ethers")
		});
	});
});