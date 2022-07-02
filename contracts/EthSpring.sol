// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EthSpring is ERC20('Spring Token', 'SPRING') {

    function mint(address _to, uint256 _amount) public {
        _mint(_to, _amount);
    }

}
