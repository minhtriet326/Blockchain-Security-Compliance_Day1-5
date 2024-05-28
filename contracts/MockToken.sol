// SPDX-License-Identifier: UNLICENSED
pragma solidity <= 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract STMan is ERC20("StickMan Token", "STMan"), ERC20Burnable, Ownable {
    using SafeMath for uint256;

    constructor() {
        _mint(msg.sender, 1_000_000_000*10**uint256(18));
        transferOwnership(msg.sender);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        super._beforeTokenTransfer(from, to , amount);
    }
}
