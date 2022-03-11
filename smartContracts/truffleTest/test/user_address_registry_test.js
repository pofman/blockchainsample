var UserAddressRegistry = artifacts.require("./UserAddressRegistry.sol");

contract('UserAddressRegistry', function (accounts) {
	it("should assert true", function () {
		var addressRegistry;

		return UserAddressRegistry.deployed().then(function (instance) {
			addressRegistry = instance;
			return addressRegistry.registerName(web3.utils.fromUtf8("Cindy Smith"), { from: accounts[2] });
		}).then(() => {
			return addressRegistry.registerName(web3.utils.fromUtf8("George Clooney"), { from: accounts[1] });
		}).then(() => {
			return addressRegistry.registerName(web3.utils.fromUtf8("Jackie Chen"), { from: accounts[0] });
		}).then(() => {
			return addressRegistry.count.call();
		}).then(function (result) {
			console.log("Count=", result.toNumber());
			return addressRegistry.updateName(accounts[2], web3.utils.fromUtf8("Cindy Only"), { from: accounts[0] })
				.then(() => result);
		}).then((result) => {
			return printNames(addressRegistry, result.toNumber())
		}).then(() => {
			// Lets delete George
			return addressRegistry.registerName(web3.utils.fromUtf8(""), { from: accounts[1] });
		}).then(() => {
			return addressRegistry.count.call();
		}).then(function (result) {
			console.log(result)
			// Should have deleted George Clooney
			return printNames(addressRegistry, result.toNumber());
		}).then(() => {
			// Delete Cindy
			return addressRegistry.deleteName(accounts[2], { from: accounts[0] });
		}).then(() => {
			return addressRegistry.count.call();
		}).then(function (result) {
			// Should print only Jackie Chen
			return printNames(addressRegistry, result.toNumber())
		});
	});
});

function printNames(addressRegistry, count) {
	const promises = [];
	for (i = 0; i < count; i++) {
		promises.push(addressRegistry.getByIndex.call(i).then(function (result) {
			var name = web3.utils.toAscii(result[1]);
			name = name.replace(/\0/g, '');
			console.log(result[0], '----', name, '---', new Date(result[2].toNumber() * 1000));
		}));
	}

	Promise.all(promises);
}