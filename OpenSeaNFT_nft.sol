pragma solidity ^0.8.0;

//Owned by Analía Mastrogiovanni. All rights reserved
//Created in Remix Ethereum
//This smart contract can call functions such as mint, burn of NFT art work created by Analia Mastrogiovanni in OpenSea
//Check account balance and other functions in progress

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract NFTContract is ERC1155, Ownable {

    uint256 public constant ARTWORK_PICTURE1 = 0;
    uint256 public constant ARTWORK_PICTURE2 = 1;
    uint256 public constant ARTWORK_PICTURE3 = 2;

//constructor is what (and where) we will mint the NFTs initialized above
    constructor () ERC1155("https://sbi57hgbkyha.usemoralis.com/{id}.json")    {
        _mint(msg.sender, ARTWORK_PICTURE1, 1, ""); 
        _mint(msg.sender, ARTWORK_PICTURE2, 1, ""); 
        _mint(msg.sender, ARTWORK_PICTURE3, 1, ""); 
    }
//mint more NFTs in the future with the following function and requires only the owners of the token
    function mint(address account, uint256 id, uint256 amount) public onlyOwner {
        _mint(account, id, amount, "");
    }
    function burn(address account, uint256 id, uint256 amount) public {
        require(msg.sender == account);
        _burn(account, id, amount);
    }
}
