// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface iSalamun {
    function ownerOf(uint256 tokenId) external view returns(address);
}

contract SalamunZombie is ERC721Enumerable,Ownable {
    uint256 public constant MAX_SUPPLY = 20;

    iSalamun public salamun;

    constructor(address salamun_) ERC721("Salamun","SAL"){
        salamun = iSalamun(salamun_);
    }

    function mint(uint256 salamunId) external payable {
        require(salamun.ownerOf(salamunId) == msg.sender,"Bukan merupakan owner");

        _safeMint(msg.sender,salamunId);
    }
}