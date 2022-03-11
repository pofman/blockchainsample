//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.12;
contract sample {

  uint   num;
                
  event NumberSetEvent(address indexed caller, bytes32 indexed oldNum, bytes32 indexed newNum);

   function getNum() view public returns (uint n) {
     return num;
  }
               
   function setNum(uint n) public {
      uint old = num;
      num=n;
      emit NumberSetEvent(msg.sender,bytes32(old),bytes32(num));
   }
               
   function sampleProc(uint x)  public {
      num=x;
   }
}
