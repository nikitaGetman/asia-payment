// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

struct SafeDeposit {
    address creator;
    uint256 amount;
    uint256 commission;
    bool exist;
    bool withdrawn;
}

contract AsiA_safe {
    using SafeERC20 for IERC20;

    mapping(uint256 => SafeDeposit) public deposits;

    address public admin;
    address public commissionReceiver;
    address public controllerOracle;

    uint256 public decimalsComission;

    IERC20 public erc20Token;

    modifier onlyAdmin() {
        require(admin == msg.sender, "Access allow only for owner!");
        _;
    }

    modifier onlyOracle() {
        require(controllerOracle == msg.sender, "Access allow only for oracle!");
        _;
    }

    constructor(address allowedTokenAddress) payable {
        admin = msg.sender;
        erc20Token = IERC20(allowedTokenAddress);
        decimalsComission = 1000;
    }

    // USER FUNCTIONS
    function deposit(uint256 id, uint256 amount, uint256 commission) external {
        address creator = msg.sender;

        require(amount != 0, "Amount zero!");
        require(id != 0, "ID zero!");
        require(!deposits[id].exist, "Cannot re-deposit!");
        require(creator != address(0), "Creator zero!");

        require(erc20Token.balanceOf(creator) >= amount, "Invalid balance!");
        erc20Token.safeTransferFrom(creator, address(this), amount);

        deposits[id] = SafeDeposit({
            creator: creator,
            amount: amount,
            commission: commission,
            exist: true,
            withdrawn: false
        });

        emit Safe(address(erc20Token), creator, id, amount, commission);
    }

    // ФУНКЦИЯ BACK - Возвращает обратно отправителю средства из депозита
    function back(uint256 id, bool withComission) external onlyOracle {
        require(id != 0, "ID zero!");

        SafeDeposit storage insideDeposit = deposits[id];

        require(insideDeposit.exist && !insideDeposit.withdrawn, "This deposit does not exist!");

        uint256 amount = insideDeposit.amount;
        uint256 comissionAmount = 0;

        if (withComission) {
            comissionAmount =
                (insideDeposit.amount * insideDeposit.commission) /
                (insideDeposit.commission + decimalsComission);
            amount = amount - comissionAmount;
            erc20Token.safeTransfer(commissionReceiver, comissionAmount);
        }

        require(erc20Token.balanceOf(address(this)) >= amount, "Invalid balance!");
        erc20Token.safeTransfer(insideDeposit.creator, amount);

        insideDeposit.withdrawn = true;

        emit Back(
            address(erc20Token),
            insideDeposit.creator,
            id,
            insideDeposit.amount,
            insideDeposit.commission
        );
    }

    // ФУНКЦИЯ CORRECT - Возвращает одной из двух сторон средства если что-то пошло не так
    function correct(uint256 id, address receiver, bool withComission) external onlyAdmin {
        require(receiver != address(0), "Receiver zero!");
        require(id != 0, "ID zero!");

        SafeDeposit storage insideDeposit = deposits[id];

        require(insideDeposit.exist && !insideDeposit.withdrawn, "This deposit does not exist!");

        uint256 amount = insideDeposit.amount;
        uint256 comissionAmount = 0;

        if (withComission) {
            comissionAmount =
                (insideDeposit.amount * insideDeposit.commission) /
                (insideDeposit.commission + decimalsComission);
            amount = amount - comissionAmount;
            erc20Token.safeTransfer(commissionReceiver, comissionAmount);
        }

        require(erc20Token.balanceOf(address(this)) >= amount, "Invalid balance!");
        erc20Token.safeTransfer(receiver, amount);

        insideDeposit.withdrawn = true;

        emit Correct(
            address(erc20Token),
            receiver,
            insideDeposit.creator,
            id,
            insideDeposit.amount,
            insideDeposit.commission
        );
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
