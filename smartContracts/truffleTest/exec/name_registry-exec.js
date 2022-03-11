/**
 * Tests the name registry contract
 */
const NameRegistry = artifacts.require("NameRegistry");

module.exports = function (callback) {
	let nameRegistry;
	return NameRegistry.deployed().then(function (instance) {
		nameRegistry = instance;
		//1. Add version 1 of contracts
		nameRegistry.registerName(web3.utils.fromUtf8("CheckingAccountFactory"), generateRandomAddress(), 1);
	}).then((result) => {
		return nameRegistry.registerName(web3.utils.fromUtf8("SavingAccountFactory"), generateRandomAddress(), 1);
	}).then((result) => {
		//2. Print the names & information on console
		return printRegistry(nameRegistry);
	}).then((result) => {
		//3. Update to version 2 - update the address for the contract
		return nameRegistry.registerName(web3.utils.fromUtf8("CheckingAccountFactory"), generateRandomAddress(), 2);
	}).then(function (result) {
		//4. Print the names & information on console
		return printRegistry(nameRegistry);
	}).then((result) => {
		callback(true);
	});
}

function printRegistry(nameRegistry) {
	return nameRegistry.getContractInfo(web3.utils.fromUtf8("CheckingAccountFactory")).then(function (result) {
		console.log("CheckingAccountFactory", result[0], ' version=', result[1].toNumber());
		return nameRegistry.getContractInfo(web3.utils.fromUtf8("SavingAccountFactory"))
	}).then(function (result) {
		// console.log(result)
		console.log("SavingAccountFactory", result[0], ' version=', result[1].toNumber());
		console.log('------------------------------------------');
	});
}

// For testing this function generates random 20 byte strings
function generateRandomAddress() {
	var text = "";
	var possible = "0123456789abcde0123456789abcde0123456789abcde0123456789abcde";

	for (var i = 0; i < 40; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return '0x' + text;
}