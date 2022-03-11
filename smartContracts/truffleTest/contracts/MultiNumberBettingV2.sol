// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MultiNumberBettingV2 {
  uint8[3] initialNums;
  uint loserCount;
  uint winnerCount;
  string lastWinnerName;

  constructor(uint8 num1, uint8 num2, uint8 num3) {
    require(num1 > 0 && num1 <= 10);
    require(num2 > 0 && num2 <= 10);
    require(num3 > 0 && num3 <= 10);
    initialNums[0] = num1;
    initialNums[1] = num2;
    initialNums[2] = num3;
  }

  function guess(uint8 numToGuess, string memory name) public returns(bool) {
    for (uint8 i = 0; i < initialNums.length; i++) {
      if(numToGuess == initialNums[i]) {
        winnerCount++;
        lastWinnerName = name;
        return true;
      }
    }
    loserCount++;
    return false;
  }

  function totalGuess() public view returns(uint) {
    return (winnerCount + loserCount);
  }

  function getLastWinner() public view returns (string memory) {
    bytes memory bytedString = bytes(lastWinnerName);

    if(bytedString.length == 0) {
      return "***";
    }

    string memory retString = new string(3);
    bytes memory result = bytes(retString);

    for(uint i = 0;  (i < 3) && (i < bytedString.length); i++) {
      result[i] = bytedString[i];
    }

    return string(result);
  }
}
