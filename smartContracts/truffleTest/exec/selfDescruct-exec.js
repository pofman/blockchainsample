/**
 * Tests the contract SelfDestruct
 */
 const SelfDestruct = artifacts.require("./SelfDestruct.sol");

 module.exports = function(callback) {
     
     let  selfDestruct;
     //1. Get the deployed contract instance
     return SelfDestruct.deployed().then(function(instance){
         selfDestruct = instance;  
         //2. Set the value
         return selfDestruct.setValue("Some Value");
     }).then((result) => {
        //3. Get the value
        return selfDestruct.someValue.call(); 
     }).then(function(result){
         //4. Print the received value to console
         console.log("Value=", result);
         //5. Call kill
         return selfDestruct.killContract();
     }).then(function(result){
         console.log("Contract Destroyed");
         // This call will throw an excepion as contract is destroyed
         return selfDestruct.setValue("NEW Value");
     });
 }
