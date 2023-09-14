// Connect to MetaMask's provider
const web3 = new Web3(window.ethereum);
let account;

window.ethereum.enable().then((accounts) => {
    account = accounts[0];
});


const treasuryContractAddress = "0x3a9104cf804039ead55e987556f3e647875fbe15";
const treasuryAbi =
    [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "bytes32", "name": "operation", "type": "bytes32" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "allowance", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "InsufficientAllowance", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "InsufficientBalance", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "requestedElevator", "type": "address" }], "name": "NotAdmin", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "previousAdmin", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newAdmin", "type": "address" }], "name": "AdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "approver", "type": "address" }, { "indexed": false, "internalType": "bytes32", "name": "operation", "type": "bytes32" }, { "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "AllowanceApproved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "revoker", "type": "address" }, { "indexed": false, "internalType": "bytes32", "name": "operation", "type": "bytes32" }, { "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "spender", "type": "address" }], "name": "AllowanceRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "beacon", "type": "address" }], "name": "BeaconUpgraded", "type": "event" }, { "anonymous": false, "inputs": [], "name": "DefaultAdminDelayChangeCanceled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint48", "name": "newDelay", "type": "uint48" }, { "indexed": false, "internalType": "uint48", "name": "effectSchedule", "type": "uint48" }], "name": "DefaultAdminDelayChangeScheduled", "type": "event" }, { "anonymous": false, "inputs": [], "name": "DefaultAdminTransferCanceled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "newAdmin", "type": "address" }, { "indexed": false, "internalType": "uint48", "name": "acceptSchedule", "type": "uint48" }], "name": "DefaultAdminTransferScheduled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint8", "name": "version", "type": "uint8" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }], "name": "Upgraded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": false, "internalType": "bytes32", "name": "operation", "type": "bytes32" }, { "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdrawal", "type": "event" }, { "inputs": [], "name": "ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MANAGER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "OPERATOR_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "OP_BONDS", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PAUSER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "UPGRADER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "acceptDefaultAdminTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "ix", "type": "uint256" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "operation", "type": "bytes32" }, { "internalType": "address", "name": "token", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "operation", "type": "bytes32" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "allowances", "outputs": [{ "components": [{ "internalType": "bytes32", "name": "operation", "type": "bytes32" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct Treasury.Allowance[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "operation", "type": "bytes32" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newAdmin", "type": "address" }], "name": "beginDefaultAdminTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "cancelDefaultAdminTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint48", "name": "newDelay", "type": "uint48" }], "name": "changeDefaultAdminDelay", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "defaultAdmin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "defaultAdminDelay", "outputs": [{ "internalType": "uint48", "name": "", "type": "uint48" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "defaultAdminDelayIncreaseWait", "outputs": [{ "internalType": "uint48", "name": "", "type": "uint48" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "defaultElevationDuration", "outputs": [{ "internalType": "uint48", "name": "", "type": "uint48" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "elevatedAddress", "type": "address" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "elevate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "elevatedAddress", "type": "address" }], "name": "elevate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getRoleMember", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleMemberCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "housekeeping", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "admin", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pendingDefaultAdmin", "outputs": [{ "internalType": "address", "name": "newAdmin", "type": "address" }, { "internalType": "uint48", "name": "schedule", "type": "uint48" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pendingDefaultAdminDelay", "outputs": [{ "internalType": "uint48", "name": "newDelay", "type": "uint48" }, { "internalType": "uint48", "name": "schedule", "type": "uint48" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "proxiableUUID", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "admin", "type": "address" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "requestElevation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "admin", "type": "address" }], "name": "requestElevation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "operation", "type": "bytes32" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "revoke", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "rollbackDefaultAdminDelay", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint48", "name": "duration", "type": "uint48" }], "name": "setDefaultElevationDuration", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newImplementation", "type": "address" }], "name": "upgradeTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newImplementation", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "upgradeToAndCall", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "operation", "type": "bytes32" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];

const contractAddress = "0x15740f6057b5427c2155fda85ed5e9aaab3bf3e7";
const abi =
    [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "uint256", "name": "market", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "quoteAmount", "type": "uint256" }], "name": "BondBuyTransferFailed", "type": "error" }, { "inputs": [], "name": "BondIndexCorrupted", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "name": "BondMarketClosingInsufficientBalance", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "BondMarketClosingRefundTransferFailed", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "volume", "type": "uint256" }], "name": "BondMarketFundingTransferFailed", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "volume", "type": "uint256" }], "name": "BondMarketInsufficientVolume", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "BondMarketNotActive", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "BondNotActive", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "BondNotMatured", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "BondNotOwnedByCaller", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "BondPayoutTransferFailed", "type": "error" }, { "inputs": [], "name": "BondSaleActive", "type": "error" }, { "inputs": [], "name": "BondSaleNotActive", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "requestedElevator", "type": "address" }], "name": "NotAdmin", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "previousAdmin", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newAdmin", "type": "address" }], "name": "AdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "beacon", "type": "address" }], "name": "BeaconUpgraded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "marketId", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "maturation", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "quoteToken", "type": "address" }, { "internalType": "uint256", "name": "term", "type": "uint256" }], "indexed": false, "internalType": "struct Bondage.Bond", "name": "bond", "type": "tuple" }], "name": "BondClaimed", "type": "event" }, { "anonymous": false, "inputs": [{ "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "quoteToken", "type": "address" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "volume", "type": "uint256" }, { "internalType": "uint256", "name": "sold", "type": "uint256" }], "indexed": false, "internalType": "struct Bondage.BondMarket", "name": "market", "type": "tuple" }], "name": "BondMarketClosed", "type": "event" }, { "anonymous": false, "inputs": [{ "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "quoteToken", "type": "address" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "volume", "type": "uint256" }, { "internalType": "uint256", "name": "sold", "type": "uint256" }], "indexed": false, "internalType": "struct Bondage.BondMarket", "name": "market", "type": "tuple" }], "name": "BondMarketCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "quoteToken", "type": "address" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "volume", "type": "uint256" }, { "internalType": "uint256", "name": "sold", "type": "uint256" }], "indexed": false, "internalType": "struct Bondage.BondMarket", "name": "market", "type": "tuple" }], "name": "BondMarketDeleted", "type": "event" }, { "anonymous": false, "inputs": [{ "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "quoteToken", "type": "address" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "volume", "type": "uint256" }, { "internalType": "uint256", "name": "sold", "type": "uint256" }], "indexed": false, "internalType": "struct Bondage.BondMarket", "name": "market", "type": "tuple" }], "name": "BondMarketOpened", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "marketId", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "maturation", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "quoteToken", "type": "address" }, { "internalType": "uint256", "name": "term", "type": "uint256" }], "indexed": false, "internalType": "struct Bondage.Bond", "name": "bond", "type": "tuple" }], "name": "BondSold", "type": "event" }, { "anonymous": false, "inputs": [], "name": "DefaultAdminDelayChangeCanceled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint48", "name": "newDelay", "type": "uint48" }, { "indexed": false, "internalType": "uint48", "name": "effectSchedule", "type": "uint48" }], "name": "DefaultAdminDelayChangeScheduled", "type": "event" }, { "anonymous": false, "inputs": [], "name": "DefaultAdminTransferCanceled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "newAdmin", "type": "address" }, { "indexed": false, "internalType": "uint48", "name": "acceptSchedule", "type": "uint48" }], "name": "DefaultAdminTransferScheduled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint8", "name": "version", "type": "uint8" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }], "name": "Upgraded", "type": "event" }, { "inputs": [], "name": "ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MANAGER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "OPERATOR_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PAUSER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "UPGRADER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "acceptDefaultAdminTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "activeMarkets", "outputs": [{ "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "quoteToken", "type": "address" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "volume", "type": "uint256" }, { "internalType": "uint256", "name": "sold", "type": "uint256" }], "internalType": "struct Bondage.BondMarket[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "allMaturingBonds", "outputs": [{ "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "marketId", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "maturation", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "quoteToken", "type": "address" }, { "internalType": "uint256", "name": "term", "type": "uint256" }], "internalType": "struct Bondage.Bond[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newAdmin", "type": "address" }], "name": "beginDefaultAdminTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "bondMarketClose", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "quoteToken", "type": "address" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "volume", "type": "uint256" }], "name": "bondSaleAdd", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "bondSaleClose", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "bondSaleNew", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "bondSaleStart", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "bondSaleStartDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "bondSaleViewStaging", "outputs": [{ "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "quoteToken", "type": "address" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "volume", "type": "uint256" }, { "internalType": "uint256", "name": "sold", "type": "uint256" }], "internalType": "struct Bondage.BondMarket[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "marketId", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "buyBond", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "cancelDefaultAdminTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint48", "name": "newDelay", "type": "uint48" }], "name": "changeDefaultAdminDelay", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "bondId", "type": "uint256" }], "name": "claimBond", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "bondIds", "type": "uint256[]" }], "name": "claimBonds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "claimableBonds", "outputs": [{ "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "marketId", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "maturation", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "quoteToken", "type": "address" }, { "internalType": "uint256", "name": "term", "type": "uint256" }], "internalType": "struct Bondage.Bond[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "defaultAdmin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "defaultAdminDelay", "outputs": [{ "internalType": "uint48", "name": "", "type": "uint48" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "defaultAdminDelayIncreaseWait", "outputs": [{ "internalType": "uint48", "name": "", "type": "uint48" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "defaultElevationDuration", "outputs": [{ "internalType": "uint48", "name": "", "type": "uint48" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "elevatedAddress", "type": "address" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "elevate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "elevatedAddress", "type": "address" }], "name": "elevate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getRoleMember", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleMemberCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "housekeeping", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "admin", "type": "address" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "treasury", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "maturingBonds", "outputs": [{ "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "marketId", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "maturation", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "quoteToken", "type": "address" }, { "internalType": "uint256", "name": "term", "type": "uint256" }], "internalType": "struct Bondage.Bond[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pendingDefaultAdmin", "outputs": [{ "internalType": "address", "name": "newAdmin", "type": "address" }, { "internalType": "uint48", "name": "schedule", "type": "uint48" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pendingDefaultAdminDelay", "outputs": [{ "internalType": "uint48", "name": "newDelay", "type": "uint48" }, { "internalType": "uint48", "name": "schedule", "type": "uint48" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "proxiableUUID", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "admin", "type": "address" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "requestElevation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "admin", "type": "address" }], "name": "requestElevation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "rollbackDefaultAdminDelay", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint48", "name": "duration", "type": "uint48" }], "name": "setDefaultElevationDuration", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newImplementation", "type": "address" }], "name": "upgradeTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newImplementation", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "upgradeToAndCall", "outputs": [], "stateMutability": "payable", "type": "function" }]
    ;

const contract = new web3.eth.Contract(abi, contractAddress);
const treasuryContract = new web3.eth.Contract(treasuryAbi, treasuryContractAddress);

const tokenAddresses = {
    'DAI': '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    'USDC': '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    'USDT': '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    'ARB': '0x912CE59144191C1204E64559FE8253a0e49E6548',
    'WETH': '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    'HDN': '0x3404149e9EE6f17Fb41DB1Ce593ee48FBDcD9506',
    'HDN Bonds Contract': '0x15740F6057b5427C2155FdA85ed5E9AaAb3bF3e7'
};

const tokenDecimals = {
    'DAI': 18,
    'USDT': 6,
    'USDC': 6,
    'ARB': 18,
    'WETH': 18,
    'HDN': 18
};

function fromWei(value, decimals = 18) {
    return value / (10 ** decimals);
}

const tokenDropdown = document.getElementById('token');
for (let token in tokenDecimals) {
    const option = document.createElement('option');
    option.value = tokenDecimals[token];
    option.textContent = `${token} (${tokenDecimals[token]} decimals)`;
    tokenDropdown.appendChild(option);
}

function openModal() {
    document.getElementById('converterModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('converterModal').style.display = 'none';
}

function convert() {
    const decimals = parseInt(document.getElementById('token').value);
    const amount = parseFloat(document.getElementById('amount').value);
    const direction = document.getElementById('direction').value;

    let result = 0;
    if (direction === "toWei") {
        result = amount * (10 ** decimals);
    } else {
        result = amount / (10 ** decimals);
    }

    document.getElementById('result').value = result;
}
function secondsToDays(seconds) {
    return seconds / (24 * 60 * 60);
}

function renderAllowances(allowances) {
    console.log('allowances:', allowances);
    const tbody = document.getElementById('allowancesTableBody');
    allowances.forEach(allowance => {

        const tr = document.createElement('tr');
        let token = "";
        let decimals = 18;
        allowance.forEach((item, index) => {


            const td = document.createElement('td');
            if (index === 0) {
                if (item === '0xd27be921b4749f7d0ef861212f6cf2ac3b06e4bddb6713f392a851cb8c9cf93a') {
                    td.textContent = "withdraw"
                }
                else {
                    td.textContent = item
                }
            } else if (index === 1) {
                token = Object.keys(tokenAddresses).find(key => tokenAddresses[key] === item);
                decimals = tokenDecimals[token];
                token = token || item;

                const a = document.createElement('a');
                a.href = `https://arbiscan.io/address/${item}`;
                a.target = "_blank";
                a.textContent = token || item; // Show the token name if found, otherwise show the address
                td.appendChild(a);
            } else if (index === 2) {
                const tokenName = Object.keys(tokenAddresses).find(key => tokenAddresses[key] === item);

                const a = document.createElement('a');
                a.href = `https://arbiscan.io/address/${item}`;
                a.target = "_blank";
                a.textContent = tokenName || item; // Show the token name if found, otherwise show the address
                td.appendChild(a);
            }
            else {
                console.log('item:', item);

                td.textContent = fromWei(item, decimals);
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}



function renderActiveBonds(bonds) {
    const tbody = document.getElementById('activeBondsTableBody');

    bonds.forEach(bond => {
        const tr = document.createElement('tr');

        // Assuming the structure [Bond ID, Contract Address, Price, Duration, Volume, Sold]
        bond.forEach((item, index) => {
            const td = document.createElement('td');
            if (index === 0) {
                td.textContent = String(item)
            }
            // For Contract Address (index 1)
            else if (index === 1 && typeof item === 'string' && item.startsWith('0x')) {
                const tokenName = Object.keys(tokenAddresses).find(key => tokenAddresses[key] === item);
                const a = document.createElement('a');
                a.href = `https://arbiscan.io/address/${item}`;
                a.target = "_blank";
                a.textContent = tokenName || item; // Show the token name if found, otherwise show the address
                td.appendChild(a);
            }
            // For Price (index 2)
            else if (index === 2) {
                const tokenName = Object.keys(tokenAddresses).find(key => tokenAddresses[key] === bond[1]); // Find the associated token for this bond
                const decimals = tokenDecimals[tokenName];
                td.textContent = fromWei(item, decimals);
            }
            // For Duration (index 3)
            else if (index === 3) {

                td.textContent = `${secondsToDays(item)} days`;
            }
            // For Volume (index 4)
            else if (index === 4) {
                td.textContent = fromWei(item); // Default to 18 decimals if not provided
            }
            // For all other items
            else {
                td.textContent = fromWei(item);
            }

            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

function renderInactiveBonds(bonds) {
    const tbody = document.getElementById('stagingBondsTableBody');

    bonds.forEach(bond => {
        const tr = document.createElement('tr');

        // Assuming the structure [Bond ID, Contract Address, Price, Duration, Volume, Sold]
        bond.forEach((item, index) => {
            const td = document.createElement('td');

            if (index === 0) {
                td.textContent = String(item)
            }
            // For Contract Address (index 1)
            else if (index === 1 && typeof item === 'string' && item.startsWith('0x')) {
                const tokenName = Object.keys(tokenAddresses).find(key => tokenAddresses[key] === item);
                const a = document.createElement('a');
                a.href = `https://arbiscan.io/address/${item}`;
                a.target = "_blank";
                a.textContent = tokenName || item; // Show the token name if found, otherwise show the address
                td.appendChild(a);
            }
            // For Price (index 2)
            else if (index === 2) {
                const tokenName = Object.keys(tokenAddresses).find(key => tokenAddresses[key] === bond[1]); // Find the associated token for this bond
                const decimals = tokenDecimals[tokenName];
                td.textContent = fromWei(item, decimals);
            }
            // For Duration (index 3)
            else if (index === 3) {
                td.textContent = `${secondsToDays(item)} days`;
            }
            // For Volume (index 4)
            else if (index === 4) {
                td.textContent = fromWei(item); // Default to 18 decimals if not provided
            }
            // For all other items
            else {
                td.textContent = fromWei(item);
            }

            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

function renderMaturingBonds(bonds) {
    const tbody = document.getElementById('maturingBondsTableBody');

    bonds.forEach(bond => {
        const tr = document.createElement('tr');

        // Find the associated token for this bond
        const tokenName = Object.keys(tokenAddresses).find(key => tokenAddresses[key] === bond[6]);
        const decimals = tokenDecimals[tokenName];

        // Loop through each item in the bond
        bond.forEach((item, index) => {
            const td = document.createElement('td');
            switch (index) {
                case 0: // id
                case 1: // marketId
                    td.textContent = String(item);
                    break;

                case 2: // owner
                    if (typeof item === 'string' && item.startsWith('0x')) {
                        const a = document.createElement('a');
                        a.href = `https://arbiscan.io/address/${item}`;
                        a.target = "_blank";
                        a.textContent = item;
                        td.appendChild(a);
                    }
                    break;

                case 3: // maturation (epoch timestamp of when the bond was created)

                    td.textContent = new Date((Number(item) + Number(bond[7])) * 1000);
                    break;

                case 4: // amount
                    td.textContent = fromWei(item, 18);
                    break;

                case 5: // price
                    td.textContent = fromWei(item, decimals);
                    break;

                case 6: // quoteToken
                    if (typeof item === 'string' && item.startsWith('0x')) {
                        const a = document.createElement('a');
                        a.href = `https://arbiscan.io/address/${item}`;
                        a.target = "_blank";
                        a.textContent = tokenName || item;
                        td.appendChild(a);
                    }
                    break;

                case 7: // term
                    td.textContent = `${secondsToDays(item)} days`;
                    break;
            }

            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

function secondsToDays(seconds) {
    return seconds / (24 * 60 * 60);
}

async function fetchAllowances() {
    try {

        const allowances = await treasuryContract.methods.allowances().call();
        return allowances;

    } catch (error) {
        console.error("Error fetching allowances:", error);
        return [];

    }
}

async function fetchActiveBonds() {
    try {
        const bonds = await contract.methods.activeMarkets().call();
        return bonds;
    } catch (error) {
        console.error("Error fetching bonds:", error);
        return [];
    }
}


async function fetchInactiveBonds() {
    try {
        const bonds = await contract.methods.bondSaleViewStaging().call();
        return bonds;
    } catch (error) {
        console.error("Error fetching staging bonds:", error);
        return [];
    }
}

async function fetchMaturingBonds() {
    try {
        const bonds = await contract.methods.allMaturingBonds().call();
        return bonds;
    } catch (error) {
        console.error("Error fetching maturing bonds:", error);
        return [];
    }
}


async function fetchAndRenderBonds() {
    const activeBonds = await fetchActiveBonds();
    renderActiveBonds(activeBonds);
    const inactiveBonds = await fetchInactiveBonds();
    renderInactiveBonds(inactiveBonds);
    const maturingBonds = await fetchMaturingBonds();
    renderMaturingBonds(maturingBonds);
}

function bondSaleAdd() {
    try {
        const selectedAsset = document.getElementById('assetDropdown').value;
        const quoteTokenAddress = tokenAddresses[selectedAsset];
        document.getElementById('quoteToken').value = quoteTokenAddress;

        let volume = document.getElementById('volume').value;
        volume = web3.utils.toWei(volume, 'ether');  // Convert volume to 18 decimals


        let price = document.getElementById('price').value;
        price = web3.utils.toWei(price, 'ether');
        price = new web3.utils.BN(price).div(new web3.utils.BN(Math.pow(10, 18 - tokenDecimals[selectedAsset]))).toString();


        let durationDays = document.getElementById('durationDays').value;
        durationDays = durationDays * 24 * 60 * 60;
        if (durationDays === '') {
            durationDays = 0;
        }

        let durationSeconds = document.getElementById('durationSeconds').value;
        if (durationSeconds === '') {
            durationSeconds = 0;
        }

        let duration = Number(durationDays) + Number(durationSeconds);

        if (duration === 0) {
            throw new Error('Duration must be greater than 0');
        }

        console.log('quoteTokenAddress:', quoteTokenAddress);
        console.log('volume:', volume);
        console.log('price:', price);
        console.log('duration:', duration);



        contract.methods.bondSaleAdd(quoteTokenAddress, price, duration, volume).send({ from: account })
            .on('transactionHash', function (hash) {
                console.log('Transaction Hash:', hash);
                document.getElementById('txLink-add').textContent = hash;
                document.getElementById('txLink-add').href = 'https://arbiscan.io/tx/' + hash;
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                console.log('Confirmation Number:', confirmationNumber);
                document.getElementById('confirmation-add').textContent = `Transaction confirmed with confirmation number: ${confirmationNumber}`;
                fetchAndRenderBonds().then(() => { });

            })
            .on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                console.log('Error:', error.message);
                document.getElementById('error-add').textContent = `Transaction failed! Error: ${error}`;
            })
    } catch (error) {
        document.getElementById('error-add').textContent = `Transaction failed! Error: ${error}`;
    }


}


function bondSaleNew() {
    try {



        contract.methods.bondSaleNew().send({ from: account })
            .on('transactionHash', function (hash) {
                console.log('Transaction Hash:', hash);
                document.getElementById('txLink-new').textContent = hash;
                document.getElementById('txLink-new').href = 'https://arbiscan.io/tx/' + hash;
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                console.log('Confirmation Number:', confirmationNumber);
                document.getElementById('confirmation-new').textContent = `Transaction confirmed with confirmation number: ${confirmationNumber}`;
                fetchAndRenderBonds().then(() => { });
            })
            .on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                console.log('Error:', error.message);
                document.getElementById('error-new').textContent = `Transaction failed! Error: ${error}`;
            })
    } catch (error) {
        document.getElementById('error-new').textContent = `Transaction failed! Error: ${error}`;
    }


}

function bondSaleStart() {
    try {



        contract.methods.bondSaleStart().send({ from: account })
            .on('transactionHash', function (hash) {
                console.log('Transaction Hash:', hash);
                document.getElementById('txLink-start').textContent = hash;
                document.getElementById('txLink-start').href = 'https://arbiscan.io/tx/' + hash;
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                console.log('Confirmation Number:', confirmationNumber);
                document.getElementById('confirmation-start').textContent = `Transaction confirmed with confirmation number: ${confirmationNumber}`;
                fetchAndRenderBonds().then(() => { });
            })
            .on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                console.log('Error:', error.message);
                document.getElementById('error-start').textContent = `Transaction failed! Error: ${error}`;
            })
    } catch (error) {
        document.getElementById('error-start').textContent = `Transaction failed! Error: ${error}`;
    }


}

function bondSaleClose() {
    try {



        contract.methods.bondSaleClose().send({ from: account })
            .on('transactionHash', function (hash) {
                console.log('Transaction Hash:', hash);
                document.getElementById('txLink-close').textContent = hash;
                document.getElementById('txLink-close').href = 'https://arbiscan.io/tx/' + hash;
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                console.log('Confirmation Number:', confirmationNumber);
                document.getElementById('confirmation-close').textContent = `Transaction confirmed with confirmation number: ${confirmationNumber}`;
                fetchAndRenderBonds().then(() => { });
            })
            .on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                console.log('Error:', error.message);
                document.getElementById('error-close').textContent = `Transaction failed! Error: ${error}`;
            })
    } catch (error) {
        document.getElementById('error-close').textContent = `Transaction failed! Error: ${error}`;
    }


}



document.addEventListener("DOMContentLoaded", async function () {
    const allowances = await fetchAllowances();
    console.log('allowances:', allowances);
    renderAllowances(allowances);
    await fetchAndRenderBonds();
});

