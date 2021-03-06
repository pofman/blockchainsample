// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * Creates a registry for contracts
 **/
contract NameRegistry {

    // Manages info about the contract instance
    struct ContractInfo {
        address   owner;
        address   contractInst;
        // The first version added to registry MUST be >= 1
        // Otherwise the name will NOT be added
        uint16    version;
    }

    // Manages the name to address mapping
    mapping(bytes32 => ContractInfo)  nameInfo;

    // Adds the version of the contract to be used by apps
    function  registerName (bytes32 name, address conAddress, uint16  ver) public returns(bool){

        // Version MUST start with number 1
        if(ver < 1) revert();

        if(nameInfo[name].contractInst == address(0)){
            nameInfo[name].owner = msg.sender;
            nameInfo[name].contractInst = conAddress;
            nameInfo[name].version = ver;
        } else {
            if(nameInfo[name].owner != msg.sender)  return false;
            nameInfo[name].contractInst = conAddress;
            nameInfo[name].version = ver;
        }
        return true;
    }

    // Contracts having a dependency on this contract will invoke this function
    function  getContractInfo(bytes32 name) public view returns(address,uint16){
        return (nameInfo[name].contractInst, nameInfo[name].version);
    }

    function  removeContract() public pure returns(bool){
        // Code this on your own
        return false;
    }

}