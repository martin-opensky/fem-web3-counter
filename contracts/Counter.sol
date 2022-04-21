// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Counter {
    uint private counter;

    function count() public {
        counter++;
        console.log("counter", counter);
    }

    function getCount() public view returns (uint32) {
        return uint32(counter);
    }


}