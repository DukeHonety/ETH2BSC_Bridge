// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface IBurnable {
    function burn(uint amount) external;
    function burnFrom(address account, uint amount) external;
}

contract BscBridge is AccessControl {

    using SafeERC20 for IERC20;

    event SwappedFromBsc(address indexed token, address indexed from, uint256 amount);
    event AcceptedSwapFromBsc(address indexed token, address indexed from, uint256 amount);

    constructor(address _admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, _admin);
    }

    function swapFromBsc(address _token, uint256 _amount) external {
        require(msg.sender != address(0), "ZERO_ADDRESS");
        require(_token != address(0), "ZERO_ADDRESS");
        require(_amount > 0, "ZERO_AMOUNT");
        IBurnable(_token).burnFrom(msg.sender, _amount);
        emit SwappedFromBsc(_token, msg.sender, _amount);
    }

}