/**
 *Submitted for verification at polygonscan.com on 2023-09-07
*/

// Sources flattened with hardhat v2.12.6 https://hardhat.org

// File @openzeppelin/contracts/token/ERC20/IERC20.sol@v4.8.1

// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.17;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}


pragma solidity ^0.8.17;


struct SafeDeposit {
    uint256 amount;
    uint256 commission;
    bool exist;
    bool withdrawn;
}

contract AsiA_safe {

    mapping (address => mapping (uint256 => SafeDeposit)) public deposits;

    address public admin;
    address public commissionReceiver;
    address public controllerOracle;

    uint256 public decimalsComission;

    IERC20 public erc20Token;

    modifier onlyAdmin {
        require(admin == msg.sender, "Access allow only for owner!");
        _;
    }
    
    modifier onlyOracle {
        require(controllerOracle == msg.sender, "Access allow only for oracle!");
        _;
    }


    constructor (address allowedTokenAddress) payable {
        admin = msg.sender;
        erc20Token = IERC20(allowedTokenAddress);
        decimalsComission = 1000;
    }

    // USER FUNCTIONS
    function deposit(uint256 id, uint256 amount, uint256 commission) external {
        require(amount != 0, "Amount must be greater than zero!");
        require(id != 0, "ID must be greater than zero!");
        require(!deposits[msg.sender][id].exist, "You cannot re-deposit!");

        require(erc20Token.transferFrom(msg.sender, address(this), amount), "Transfer not successfully!");

        deposits[msg.sender][id] = SafeDeposit({
            amount: amount, 
            commission: commission, 
            exist: true, 
            withdrawn: false
        });

        emit Safe(address(erc20Token), msg.sender, id, amount, commission);
    }

    // ФУНКЦИЯ BACK - Возвращает обратно отправителю средства из депозита
    function back(address creator, uint256 id, bool withComission) external onlyOracle {
        require(creator != address(0), "Creator cannot be empty!");
        require(id != 0, "ID cannot be empty!");

        SafeDeposit storage insideDeposit = deposits[creator][id];

        require(insideDeposit.exist && !insideDeposit.withdrawn, "This deposit does not exist!");

        uint256 amount = insideDeposit.amount;
        uint256 comissionAmount = 0;

        if (withComission){
            comissionAmount = ((insideDeposit.commission * insideDeposit.amount) / decimalsComission);
            amount = amount - comissionAmount;
            erc20Token.transfer(commissionReceiver, comissionAmount);
        }
        
        require(erc20Token.balanceOf(address(this)) >= amount, "You cannot withdraw all tokens!");

        erc20Token.transfer(creator, amount);

        insideDeposit.withdrawn = true;
        
        emit Back(address(erc20Token), creator, id, insideDeposit.amount, insideDeposit.commission);
    }

    // ФУНКЦИЯ CORRECT - Возвращает одной из двух сторон средства если что-то пошло не так
    function correct(address creator, uint256 id, address receiver, bool withComission) external onlyAdmin {
        require(receiver != address(0), "Receiver cannot be empty!");
        require(creator != address(0), "Creator cannot be empty!");
        require(id != 0, "ID cannot be empty!");

        SafeDeposit storage insideDeposit = deposits[creator][id];

        require(insideDeposit.exist && !insideDeposit.withdrawn, "This deposit does not exist!");

        uint256 amount = insideDeposit.amount;
        uint256 comissionAmount = 0;

        if (withComission){
            comissionAmount = ((insideDeposit.commission * insideDeposit.amount) / decimalsComission);
            amount = amount - comissionAmount;
            erc20Token.transfer(commissionReceiver, comissionAmount);
        }
        
        require(erc20Token.balanceOf(address(this)) >= amount, "You cannot withdraw all tokens!");

        erc20Token.transfer(receiver, amount);
        
        insideDeposit.withdrawn = true;

        emit Correct(address(erc20Token), receiver, creator, id, insideDeposit.amount, insideDeposit.commission);
    }

    // ADMIN FUNCTIONS
    function transferAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "Admin cannot be empty!");
        admin = newAdmin;
    }
    function setComissionReceiver(address newReceiver) external onlyAdmin {
        require(newReceiver != address(0), "Receiver cannot be empty!");
        commissionReceiver = newReceiver;
    }

    function setOracle(address newOracle) external onlyAdmin {
        require(newOracle != address(0), "Oracle cannot be empty!");
        controllerOracle = newOracle;
    }

    function updateAllowedToken(address newContract) external onlyAdmin {
        require(newContract != address(0), "Token ERC20 contract cannot be empty!");
        erc20Token = IERC20(newContract);
    }

    function setComissionDecimals(uint256 newDecimals) external onlyAdmin {
        require(newDecimals != 0, "Decimals must be greater than 0");
        decimalsComission = newDecimals;
    }

    event Safe(
        address ERC20_ADDRESS,
        address indexed creator,
        uint256 indexed id,
        uint256 amount,
        uint256 commission
    );

    event Back(
        address ERC20_ADDRESS,
        address indexed receiver,
        uint256 indexed id,
        uint256 amount,
        uint256 commission
    );

    event Correct(
        address ERC20_ADDRESS,
        address indexed receiver,
        address indexed creator,
        uint256 indexed id,
        uint256 amount,
        uint256 commission
    );
}