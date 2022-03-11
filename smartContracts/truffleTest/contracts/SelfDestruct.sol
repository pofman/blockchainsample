// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SelfDestruct {

    address         owner;
    string  public  someValue = "NOT-SET-YET";

    modifier  OwnerOnly {
        if(msg.sender != owner){
            revert();
        } else {
            _;
        }
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Sets the storage variable
    function  setValue(string memory value) public {
        someValue = value;
    }

    // This is where the contract is destroyed
    function  killContract() public OwnerOnly {
        selfdestruct(payable(owner));
    }
}
