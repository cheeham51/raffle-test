const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const path = require('path')

const contract = require(path.join(__dirname, '..', 'artifacts/contracts/Raffle.sol/Raffle.json'))

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const raffleContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const player = await raffleContract.owner();
    console.log(`Hi ${player}! Welcome to the raffle!`); 

    console.log("Picking the winnder ...");
    await raffleContract.pickWinner();

    const winner = await raffleContract.winner();
    console.log("Congratulations! The winner is: " + winner); 

}

main();