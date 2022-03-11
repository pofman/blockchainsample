// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MultiNumberBettingV3 {
  uint8[3] initialNums;
  uint public loserCount;
  uint public winnerCount;
  string lastWinnerName;
  uint public lastWinnerAt;
  address winner;

  constructor(uint8 num1, uint8 num2, uint8 num3) {
    require(num1 > 0 && num1 <= 10);
    require(num2 > 0 && num2 <= 10);
    require(num3 > 0 && num3 <= 10);
    initialNums[0] = num1;
    initialNums[1] = num2;
    initialNums[2] = num3;
  }

  function guess(uint8 numToGuess, string memory name) public returns(bool) {
    require(numToGuess <= 10);

    for (uint8 i = 0; i < initialNums.length; i++) {
      if(numToGuess == initialNums[i]) {
        winnerCount++;
        lastWinnerName = name;
        lastWinnerAt = block.timestamp;
        winner = msg.sender;
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

  function daysSinceLastWinning() public view returns(uint) {
    if(bytes(lastWinnerName).length == 0) {
      return 0;
    }

    return (block.timestamp - lastWinnerAt)*1 days;
  }

  function hoursSinceLastWinning() public view returns(uint) {
    if(bytes(lastWinnerName).length == 0) {
      return 0;
    }

    return (block.timestamp - lastWinnerAt)*1 hours;
  }

  function minutesSinceLastWinning() public view returns(uint) {
    if(bytes(lastWinnerName).length == 0) {
      return 0;
    }

    return (block.timestamp - lastWinnerAt)*1 minutes;
  }
}
