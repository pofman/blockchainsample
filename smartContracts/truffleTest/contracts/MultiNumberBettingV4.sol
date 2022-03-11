// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MultiNumberBettingV4 {
  struct Winner {
    address winner;
    string name;
    uint guess;
    uint guessedAt;
  }
  
  mapping(address => Winner) public winners;
  uint8[3] initialNums;
  uint public loserCount;
  uint public winnerCount;
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
        winner = msg.sender;
        Winner memory localWinner = Winner({winner: msg.sender, name: name, guess: numToGuess, guessedAt: block.timestamp});
        winners[winner] = localWinner;
        return true;
      }
    }
    loserCount++;
    return false;
  }

  function totalGuess() public view returns(uint) {
    return (winnerCount + loserCount);
  }

  function getLastWinnerInfo() public view returns(address, string memory, uint, uint) {
    return (winners[winner].winner, winners[winner].name, winners[winner].guess, winners[winner].guessedAt);
  }

  function checkWinner(address _winner) public view returns(address, string memory, uint, uint) {
    Winner memory foundWinner = winners[_winner];

    if(foundWinner.winner != address(0x0)) {
      return (foundWinner.winner, foundWinner.name, foundWinner.guess, foundWinner.guessedAt);
    } else {
      return (address(0x0), "", 0, 0);
    }
  }

  function daysSinceLastWinning() public view returns(uint) {
    if(winner == address(0x0)) {
      return 0;
    }

    return (block.timestamp - winners[winner].guessedAt*1 days);
  }

  function hoursSinceLastWinning() public view returns(uint) {
    if(winner == address(0x0)) {
      return 0;
    }

    return (block.timestamp - winners[winner].guessedAt*1 hours);
  }

  function minutesSinceLastWinning() public view returns(uint) {
    if(winner == address(0x0)) {
      return 0;
    }

    return (block.timestamp - winners[winner].guessedAt*1 minutes);
  }
}
