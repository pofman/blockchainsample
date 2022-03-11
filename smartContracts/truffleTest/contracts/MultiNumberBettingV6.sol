// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

abstract contract MultiNumberBettingAbstractV2 {
  uint public constant MAX_BET = 5 ether;
  uint public constant MIN_BET = 1 ether;

  constructor() {}
  function guess(uint8 numToGuess, string memory name) public virtual payable returns(bool);
  function ownerWithdraw(uint amount) public virtual;
  function totalGuess() public virtual view returns(uint);
  function getLastWinnerInfo() public virtual view returns(address, string memory, uint, uint, uint);
  function checkWinner(address _winner) public virtual view returns(address, string memory, uint, uint);
  function daysSinceLastWinning() public virtual view returns(uint);
  function hoursSinceLastWinning() public virtual view returns(uint);
  function minutesSinceLastWinning() public virtual view returns(uint);
}

contract MultiNumberBettingV6 is MultiNumberBettingAbstractV2 {
  modifier OwnerOnly {
    if (msg.sender != owner) revert();
    _;
  }
  struct Winner {
    address winner;
    string name;
    uint guess;
    uint guessedAt;
    uint ethReceived;
  }
  
  address owner;
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

    owner = msg.sender;
  }

  function ownerWithdraw(uint amount) public override OwnerOnly {
    require(amount > 0);
    require(address(this).balance - amount > 3 * MAX_BET);

    payable(msg.sender).transfer(amount);
  }

  function guess(uint8 numToGuess, string memory name) public override payable returns(bool) {
    require(numToGuess <= 10);
    require(msg.value >= MIN_BET || msg.value <= MAX_BET);
    require(address(this).balance > 3 * MAX_BET);

    for (uint8 i = 0; i < initialNums.length; i++) {
      if(numToGuess == initialNums[i]) {
        winnerCount++;
        winner = msg.sender;
        Winner memory localWinner = Winner({winner: msg.sender, name: name, guess: numToGuess, guessedAt: block.timestamp, ethReceived: msg.value});
        winners[winner] = localWinner;

        uint sendBack = 2 * msg.value;
        payable(msg.sender).transfer(sendBack);

        return true;
      }
    }
    loserCount++;
    return false;
  }

  function totalGuess() public override view returns(uint) {
    return (winnerCount + loserCount);
  }

  function getLastWinnerInfo() public override view returns(address, string memory, uint, uint, uint) {
    return (winners[winner].winner, winners[winner].name, winners[winner].guess, winners[winner].guessedAt, winners[winner].ethReceived);
  }

  function checkWinner(address _winner) public override view returns(address, string memory, uint, uint) {
    Winner memory foundWinner = winners[_winner];

    if(foundWinner.winner != address(0x0)) {
      return (foundWinner.winner, foundWinner.name, foundWinner.guess, foundWinner.guessedAt);
    } else {
      return (address(0x0), "", 0, 0);
    }
  }

  function daysSinceLastWinning() public override view returns(uint) {
    if(winner == address(0x0)) {
      return 0;
    }

    return (block.timestamp - winners[winner].guessedAt*1 days);
  }

  function hoursSinceLastWinning() public override view returns(uint) {
    if(winner == address(0x0)) {
      return 0;
    }

    return (block.timestamp - winners[winner].guessedAt*1 hours);
  }

  function minutesSinceLastWinning() public override view returns(uint) {
    if(winner == address(0x0)) {
      return 0;
    }

    return (block.timestamp - winners[winner].guessedAt*1 minutes);
  }

  fallback() external payable {
  }

  receive() external payable {
  }
}
