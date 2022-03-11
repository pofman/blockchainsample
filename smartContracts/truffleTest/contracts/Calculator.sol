// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Calculator {
  uint result;

  constructor(uint initial) public {
    result = initial;
  }

  function getResult() public view returns (uint) {
    return result;
  }

  function addToNumber(uint num) public {
    result = result + num;
  }

  function subtractFromNumber(uint num) public {
    result = result - num;
  }

  function multiplyWithNumber(uint num) public {
    result = result * num;
  }

  function divideByNumber(uint num) public {
    result = result / num;
  }

  function double() public {
    result = result * 2;
  }

  function half() public {
    result = result / 2;
  }
}
