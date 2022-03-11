// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MultiNumberBeetingV1 {
  uint8[3] initialNums;
  uint loserCount;
  uint winnerCount;

  constructor(uint8 num1, uint8 num2, uint8 num3) {
    initialNums[0] = num1;
    initialNums[1] = num2;
    initialNums[2] = num3;
  }

  function guess(uint8 numToGuess) public returns(bool) {
    for (uint8 i = 0; i < initialNums.length; i++) {
      if(numToGuess == initialNums[i]) {
        winnerCount++;
        return true;
      }
    }
    loserCount++;
    return false;
  }

  function totalGuess() public view returns(uint) {
    return (winnerCount + loserCount);
  }
}
