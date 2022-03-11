var ContractFactory = artifacts.require("ContractFactory");

var ChildContract = artifacts.require("ChildContract");

contract('ContractFactory', function(accounts) {
  it("should assert true", function() {
    var contractFactory;
    var childContract;
    return ContractFactory.deployed().then(function(instance){
        contractFactory = instance;
      // lets transfer ownership
      return contractFactory.purchase(web3.utils.fromUtf8("John Wayne"), { value:120, from:accounts[0] });
    }).then((result) => contractFactory.purchase(web3.utils.fromUtf8("Cindy Smith"), { value:130, from:accounts[1] }))
        .then(function(result){
      return printOwners(contractFactory);
    }).then((result) => {
        // get the child contract address for John Wayne i.e., index=0
        return contractFactory.getChildContractAddress.call(0);
    }).then(function(result){
      console.log("John Wayne - Asset Address=", result);
      return ChildContract.at(result);
    }).then((result) => {
        childContract = result;
        return childContract.transferOwnership(accounts[2],web3.utils.fromUtf8("Jake Crown"),{from:accounts[0]});
    }).then(function(result){
      return printOwners(contractFactory);

      // John Wayne tries to sell the asset again
      //return childContract.transferOwnership(accounts[3],"Sue Kenworth",{from:accounts[1]});
    });
  });
});

function  printOwners(contractFactory){
    const promises = [];
    // var ctr = 0;
    for(i=0; i < 5; i++){
        promises.push(contractFactory.getInfo(i).then(function(result){
            var name = web3.utils.toAscii(result[2]);
            name = name.replace(/\0/g, '');
            console.log(result[0].toNumber(), '---', result[1],'----' , name);
            // console.log(name);
        }));
    }

    return Promise.all(promises);
}