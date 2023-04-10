import { ethers } from "hardhat"
import { expect, assert } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", function () {
    let simpleStorage: SimpleStorage,
        simpleStorageFactory: SimpleStorage__factory

    beforeEach(async function () {
        simpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        //assert
        //expect

        assert.equal(currentValue.toString(), expectedValue)
        //or
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should a add person when call addPerson", async function () {
        const person = "Ritik"
        const expectedValue = "8"
        const transactionResponse = await simpleStorage.addPerson(
            person,
            expectedValue
        )
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.getPersonFavNo(person)
        assert.equal(currentValue.toString(), expectedValue)
    })
})
