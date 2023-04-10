//imports
import { ethers, run, network } from "hardhat"
import "dotenv/config"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
//async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    //whats the private key ?
    //whats the rpc url?
    console.log(`Deployed contract to: ${simpleStorage.address}`)
    //what happens when we deploy to our hardhat network
    // console.log(network.config)
    //verifying contract
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for verification... ")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    //get current value
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    //update current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)
}

async function verify(contractAddress: string, args: any[]) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified!!")
        } else {
            console.log(e)
        }
    }
}
//calling main
main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
