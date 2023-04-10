import "@nomicfoundation/hardhat-toolbox"
import "dotenv/config"
import "./tasks/block-number"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@nomiclabs/hardhat-ethers"
// import "@nomiclabs/hardhat-waffles"
import "@typechain/hardhat"

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "hehe"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "hehe"
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY || "hehe"
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    solidity: "0.8.7",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKET_API_KEY,
        token: "MATIC",
    },
}
