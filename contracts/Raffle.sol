// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

contract Raffle {
    address public winner;
    address public owner;
    address [] public players;
    uint public quantity;

    event AnnouceWinner(address winnerAddress);

    constructor() {
        owner = msg.sender;
        quantity = 1;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address [] memory) {
        return players;
    }

    function enter() public {
        require(quantity > 0, 'Out of stock');

        // Adding address of player entering raffle
        players.push(msg.sender);
    }

    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function pickWinner() public onlyOwner {
        uint index = getRandomNumber() % players.length;

        // Adjust quantity 
        quantity = quantity - 1;

        // set winner
        winner = players[index];

    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

}