// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * A Contract can create other contracts.
 * Represents an asset such as car, diamond, land-deed ....
 **/

contract  ChildContract {
    // Represents the identifier for some kind of asset

    uint8     public  identity;
    address   public  owner;
    bytes32   public  name;

    modifier  OwnerOnly {if(msg.sender != owner)  revert(); else _;}
    event     ChildOwnerTransfered(uint8 identity, bytes32 from, bytes32 to);

    // Constructor
    constructor(uint8 id, address own, bytes32 nm) {
      identity = id;
      owner = own;
      name = nm;
    }

    // transfer the ownership
    function  transferOwnership (address newOwner, bytes32 nm) public OwnerOnly {
        bytes32  former = name; 
        owner = newOwner;
        name = nm;
        emit ChildOwnerTransfered(identity, former, name);
    }
    // checks if caller is the owner
    function  isOwner(address addr) public view returns(bool) {
        return (addr == owner);
    }

    function getName() public view returns(bytes32) {
        return name;
    }
}

/**
 * This contract creates multiple child contracts.
 **/
contract ContractFactory {
    // Maintains all the child contracts
    ChildContract[] children;
    // Price of the asset
    uint8    public   initialPrice;

    // Constructor
    // Creates the child contracts
    constructor(uint8  numParts, uint8   price) {
        for(uint8 i = 0; i < numParts; i++){
            children.push(new ChildContract(i, address(this), "***"));
        }
        initialPrice = price;
    }

    // Anyone can pay the price and purchase the asset

    function  purchase(bytes32 name) payable public {

        if(msg.value < initialPrice) revert();

        // Look for available asset i.e., one that is not sold yet
        for(uint8 i = 0; i < children.length; i++){
            // Check if contract factoy is the owner
            if(children[i].isOwner(address(this))){
                children[i].transferOwnership(msg.sender, name);
                return;
            }
        }
        // No more assets available - so throw an exception
        revert();
    }



    // Returns the information about the child contract at specified index
    function  getInfo(uint8 childIndex) public view returns(uint8, address, bytes32){
        // Simply return the values
        return (children[childIndex].identity(),children[childIndex].owner(),children[childIndex].name());
    }

    // Returns the child contract address
    function  getChildContractAddress(uint8 childIndex) public view returns (address){
        return address(children[childIndex]);
    }

    // Returns name of the owner based on the child index
    function  getOwnerName(uint8 childIndex) public view returns(bytes32){
        bytes32  namer = children[childIndex].name();
        return namer;
    }
    // Returns the count of the children
    function  getChildrenCount() public view returns (uint){
        return children.length;
    }
  
}