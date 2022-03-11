// #1 Get an instance of the contract to be deployed/migrated
var Calculator = artifacts.require("./Calculator.sol");
var MultiNumberBeetingV1 = artifacts.require("./MultiNumberBeetingV1.sol");
var MultiNumberBettingV2 = artifacts.require("./MultiNumberBettingV2.sol");
var MultiNumberBettingV3 = artifacts.require("./MultiNumberBettingV3.sol");
var MultiNumberBettingV4 = artifacts.require("./MultiNumberBettingV4.sol");
var MultiNumberBettingV5 = artifacts.require("./MultiNumberBettingV5.sol");
var MultiNumberBettingV6 = artifacts.require("./MultiNumberBettingV6.sol");
var SelfDestruct = artifacts.require("./SelfDestruct.sol");
var ContractFactory = artifacts.require("./ContractFactory.sol");
var NameRegistry = artifacts.require("./NameRegistry.sol");
var UserAddressRegistry = artifacts.require("./UserAddressRegistry.sol");
// var CalculatorV2 = artifacts.require("./CalculatorV2.sol");

module.exports = function(deployer) {
  // #2 Deploy the instance of the contract
  deployer.deploy(Calculator, 10);//, 10);
  deployer.deploy(MultiNumberBeetingV1, 2, 5, 7);
  deployer.deploy(MultiNumberBettingV2, 2, 5, 7);
  deployer.deploy(MultiNumberBettingV3, 2, 5, 7);
  deployer.deploy(MultiNumberBettingV4, 2, 5, 7);
  deployer.deploy(MultiNumberBettingV5, 2, 5, 7);
  deployer.deploy(MultiNumberBettingV6, 2, 5, 7);
  deployer.deploy(SelfDestruct);
  deployer.deploy(ContractFactory, 5, 110);
  deployer.deploy(NameRegistry);
  deployer.deploy(UserAddressRegistry);
//   deployer.deploy(CalculatorV2, 10);
};