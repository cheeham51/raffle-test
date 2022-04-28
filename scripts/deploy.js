const { ethers } = require("hardhat")

const main = async function () {
    const Raffle = await ethers.getContractFactory("Raffle");
    const raffle_contract = await Raffle.deploy();
    console.log("Contract deployed to address: ", raffle_contract.address)
}

main()
    .then(() => {process.exit(0)})
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })